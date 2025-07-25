"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Sphere, Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

interface PlanetProps {
  position: [number, number, number];
  size: number;
  color: string;
  emissive?: string;
  orbitRadius: number;
  orbitSpeed: number;
  rotationSpeed: number;
  distortionScale?: number;
}

const Planet = ({ 
  position, 
  size, 
  color, 
  emissive = "#000000",
  orbitRadius, 
  orbitSpeed, 
  rotationSpeed,
  distortionScale = 0.3
}: PlanetProps) => {
  const ref = useRef<THREE.Group>(null);
  const planetRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
      const time = state.clock.elapsedTime;
      ref.current.position.x = Math.cos(time * orbitSpeed) * orbitRadius + position[0];
      ref.current.position.z = Math.sin(time * orbitSpeed) * orbitRadius + position[2];
    }
    
    if (planetRef.current) {
      planetRef.current.rotation.y += rotationSpeed;
    }
  });

  return (
    <group ref={ref} position={position}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <Sphere ref={planetRef} args={[size, 32, 32]}>
          <MeshDistortMaterial
            color={color}
            emissive={emissive}
            emissiveIntensity={0.5}
            roughness={0.4}
            metalness={0.8}
            distort={distortionScale}
            speed={2}
          />
        </Sphere>
        
        {/* Planet glow */}
        <Sphere args={[size * 1.2, 32, 32]}>
          <meshBasicMaterial
            color={color}
            transparent
            opacity={0.1}
            blending={THREE.AdditiveBlending}
          />
        </Sphere>
      </Float>
    </group>
  );
};

const RingPlanet = ({ position, size, color, orbitRadius, orbitSpeed }: Omit<PlanetProps, 'rotationSpeed' | 'distortionScale'>) => {
  const ref = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
      const time = state.clock.elapsedTime;
      ref.current.position.x = Math.cos(time * orbitSpeed) * orbitRadius + position[0];
      ref.current.position.z = Math.sin(time * orbitSpeed) * orbitRadius + position[2];
      ref.current.rotation.y += 0.005;
    }
    
    if (ringRef.current) {
      ringRef.current.rotation.z += 0.01;
    }
  });

  const ringGeometry = useMemo(() => {
    const geometry = new THREE.RingGeometry(size * 1.5, size * 2.5, 64);
    const pos = geometry.attributes.position;
    const v3 = new THREE.Vector3();
    
    for (let i = 0; i < pos.count; i++) {
      v3.fromBufferAttribute(pos, i);
      geometry.attributes.uv.setXY(i, v3.length() < size * 2 ? 0 : 1, 1);
    }
    
    return geometry;
  }, [size]);

  return (
    <group ref={ref} position={position}>
      <Float speed={1} rotationIntensity={0.2} floatIntensity={0.3}>
        {/* Planet */}
        <Sphere args={[size, 32, 32]}>
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.2}
            roughness={0.6}
            metalness={0.4}
          />
        </Sphere>
        
        {/* Ring */}
        <mesh ref={ringRef} geometry={ringGeometry} rotation={[Math.PI * 0.4, 0, 0]}>
          <meshStandardMaterial
            color={color}
            transparent
            opacity={0.6}
            roughness={0.8}
            metalness={0.2}
            side={THREE.DoubleSide}
          />
        </mesh>
      </Float>
    </group>
  );
};

const PlanetSystem = () => {
  return (
    <group position={[0, 0, -5]}>
      {/* Central sun/star */}
      <Float speed={0.5} rotationIntensity={0.1} floatIntensity={0.2}>
        <Sphere args={[0.5, 32, 32]} position={[0, 0, 0]}>
          <meshBasicMaterial color="#ffaa00" />
        </Sphere>
        <pointLight position={[0, 0, 0]} intensity={2} color="#ffaa00" distance={20} />
      </Float>
      
      {/* Planets */}
      <Planet
        position={[0, 0, 0]}
        size={0.15}
        color="#4169e1"
        emissive="#0000ff"
        orbitRadius={2}
        orbitSpeed={0.5}
        rotationSpeed={0.01}
      />
      
      <Planet
        position={[0, 0.5, 0]}
        size={0.2}
        color="#ff6347"
        emissive="#ff0000"
        orbitRadius={3}
        orbitSpeed={0.3}
        rotationSpeed={0.008}
        distortionScale={0.5}
      />
      
      <RingPlanet
        position={[0, -0.5, 0]}
        size={0.25}
        color="#daa520"
        orbitRadius={4.5}
        orbitSpeed={0.2}
      />
      
      <Planet
        position={[0, 0.3, 0]}
        size={0.1}
        color="#8a2be2"
        emissive="#4b0082"
        orbitRadius={1.5}
        orbitSpeed={0.8}
        rotationSpeed={0.02}
      />
      
      <Planet
        position={[0, -0.3, 0]}
        size={0.12}
        color="#00ced1"
        emissive="#008b8b"
        orbitRadius={5.5}
        orbitSpeed={0.15}
        rotationSpeed={0.015}
      />
    </group>
  );
};

export default PlanetSystem;