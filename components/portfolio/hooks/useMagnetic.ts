import { useRef, useCallback, useEffect } from 'react';
import { useSpring } from '@react-spring/web';
import { gsap } from 'gsap';

interface MagneticConfig {
  strength: number;
  range: number;
  restoreSpeed: number;
  scale: number;
  rotation: number;
}

export const useMagnetic = (config: Partial<MagneticConfig> = {}) => {
  const {
    strength = 0.2,
    range = 200,
    restoreSpeed = 0.15,
    scale = 1.1,
    rotation = 15
  } = config;

  const elementRef = useRef<HTMLElement>(null);
  const isHovered = useRef(false);
  const mousePos = useRef({ x: 0, y: 0 });
  const rafId = useRef<number>();

  const [springProps, springApi] = useSpring(() => ({
    x: 0,
    y: 0,
    rotateX: 0,
    rotateY: 0,
    scale: 1,
    config: {
      tension: 200,
      friction: 40,
      mass: 1
    }
  }));

  const calculateMagneticEffect = useCallback(() => {
    if (!elementRef.current) return;

    const rect = elementRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = mousePos.current.x - centerX;
    const deltaY = mousePos.current.y - centerY;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    if (distance < range && isHovered.current) {
      // Calculate magnetic attraction
      const force = Math.max(0, 1 - distance / range);
      const magneticX = deltaX * force * strength;
      const magneticY = deltaY * force * strength;

      // Calculate 3D rotation based on mouse position
      const rotateXValue = ((deltaY / rect.height) * rotation) * force;
      const rotateYValue = ((deltaX / rect.width) * rotation) * force;

      // Scale based on proximity
      const scaleValue = 1 + (force * (scale - 1));

      springApi.start({
        x: magneticX,
        y: magneticY,
        rotateX: -rotateXValue,
        rotateY: rotateYValue,
        scale: scaleValue
      });
    } else if (!isHovered.current) {
      // Restore to original position
      springApi.start({
        x: 0,
        y: 0,
        rotateX: 0,
        rotateY: 0,
        scale: 1
      });
    }

    if (isHovered.current) {
      rafId.current = requestAnimationFrame(calculateMagneticEffect);
    }
  }, [strength, range, scale, rotation, springApi]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    mousePos.current = { x: e.clientX, y: e.clientY };
    
    if (!rafId.current && isHovered.current) {
      rafId.current = requestAnimationFrame(calculateMagneticEffect);
    }
  }, [calculateMagneticEffect]);

  const handleMouseEnter = useCallback(() => {
    isHovered.current = true;
    rafId.current = requestAnimationFrame(calculateMagneticEffect);
  }, [calculateMagneticEffect]);

  const handleMouseLeave = useCallback(() => {
    isHovered.current = false;
    if (rafId.current) {
      cancelAnimationFrame(rafId.current);
      rafId.current = undefined;
    }
    
    // Smooth return to original position
    springApi.start({
      x: 0,
      y: 0,
      rotateX: 0,
      rotateY: 0,
      scale: 1
    });
  }, [springApi]);

  // Advanced magnetic ripple effect
  const createRipple = useCallback((e: MouseEvent) => {
    if (!elementRef.current) return;

    const rect = elementRef.current.getBoundingClientRect();
    const ripple = document.createElement('div');
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.cssText = `
      position: absolute;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(124, 58, 237, 0.3) 0%, transparent 70%);
      transform: scale(0);
      left: ${x}px;
      top: ${y}px;
      width: ${size}px;
      height: ${size}px;
      pointer-events: none;
      z-index: 0;
    `;

    elementRef.current.appendChild(ripple);

    gsap.to(ripple, {
      scale: 2,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out",
      onComplete: () => {
        ripple.remove();
      }
    });
  }, []);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);
    element.addEventListener('click', createRipple);
    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
      element.removeEventListener('click', createRipple);
      document.removeEventListener('mousemove', handleMouseMove);
      
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [handleMouseEnter, handleMouseLeave, handleMouseMove, createRipple]);

  return {
    elementRef,
    springProps,
    isHovered: isHovered.current
  };
};