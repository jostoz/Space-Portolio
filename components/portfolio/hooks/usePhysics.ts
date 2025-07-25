import { useRef, useEffect, useCallback } from 'react';
import { useSpring, animated } from '@react-spring/web';
import { gsap } from 'gsap';

interface PhysicsConfig {
  friction: number;
  tension: number;
  mass: number;
  velocity: number;
  damping: number;
}

export const usePhysics = (config: Partial<PhysicsConfig> = {}) => {
  const {
    friction = 0.92,
    tension = 200,
    mass = 1,
    velocity = 0,
    damping = 0.7
  } = config;

  const isDragging = useRef(false);
  const startX = useRef(0);
  const currentX = useRef(0);
  const velocityX = useRef(velocity);
  const rafId = useRef<number>();
  const lastTime = useRef(Date.now());

  const [springProps, springApi] = useSpring(() => ({
    x: 0,
    config: {
      tension,
      friction: friction * 100,
      mass
    }
  }));

  const updatePhysics = useCallback(() => {
    if (!isDragging.current) {
      const now = Date.now();
      const deltaTime = (now - lastTime.current) / 1000;
      lastTime.current = now;

      // Apply friction
      velocityX.current *= Math.pow(friction, deltaTime * 60);

      // Update position based on velocity
      currentX.current += velocityX.current * deltaTime * 60;

      // Apply bounds with elastic effect
      const maxScroll = window.innerWidth * 0.5;
      if (Math.abs(currentX.current) > maxScroll) {
        currentX.current = maxScroll * Math.sign(currentX.current);
        velocityX.current *= -damping;
      }

      // Stop animation when velocity is very low
      if (Math.abs(velocityX.current) < 0.1) {
        velocityX.current = 0;
        cancelAnimationFrame(rafId.current!);
        return;
      }

      springApi.start({ x: currentX.current });
      rafId.current = requestAnimationFrame(updatePhysics);
    }
  }, [friction, damping, springApi]);

  const startDrag = useCallback((e: MouseEvent | TouchEvent) => {
    isDragging.current = true;
    startX.current = 'touches' in e ? e.touches[0].clientX : e.clientX;
    velocityX.current = 0;
    cancelAnimationFrame(rafId.current!);
  }, []);

  const updateDrag = useCallback((e: MouseEvent | TouchEvent) => {
    if (!isDragging.current) return;

    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const deltaX = clientX - startX.current;
    
    // Calculate velocity
    const now = Date.now();
    const deltaTime = (now - lastTime.current) / 1000;
    if (deltaTime > 0) {
      velocityX.current = (deltaX - currentX.current) / deltaTime / 60;
    }
    lastTime.current = now;

    currentX.current = deltaX;
    springApi.start({ x: currentX.current, immediate: true });
  }, [springApi]);

  const endDrag = useCallback(() => {
    if (!isDragging.current) return;
    isDragging.current = false;
    
    // Apply momentum
    rafId.current = requestAnimationFrame(updatePhysics);
  }, [updatePhysics]);

  // Mouse wheel support
  const handleWheel = useCallback((e: WheelEvent) => {
    e.preventDefault();
    velocityX.current += e.deltaY * 0.5;
    if (!isDragging.current && !rafId.current) {
      rafId.current = requestAnimationFrame(updatePhysics);
    }
  }, [updatePhysics]);

  useEffect(() => {
    return () => {
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, []);

  return {
    springProps,
    startDrag,
    updateDrag,
    endDrag,
    handleWheel,
    currentX,
    velocityX
  };
};