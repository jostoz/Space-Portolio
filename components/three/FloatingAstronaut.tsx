"use client";

import React, { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

const FloatingAstronaut = () => {
  const groupRef = useRef<THREE.Group>(null);
  const { pointer, viewport } = useThree();

  useFrame((state) => {
    if (groupRef.current) {
      // Mouse follow effect
      const x = (pointer.x * viewport.width) / 10;
      const y = (pointer.y * viewport.height) / 10;
      
      groupRef.current.position.x = THREE.MathUtils.lerp(
        groupRef.current.position.x,
        x,
        0.05
      );
      groupRef.current.position.y = THREE.MathUtils.lerp(
        groupRef.current.position.y,
        y,
        0.05
      );
      
      // Gentle rotation
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
      groupRef.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return (
    <group ref={groupRef} position={[3, 0, -2]}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        {/* Astronaut body */}
        <group>
          {/* Helmet */}
          <mesh position={[0, 0.8, 0]}>
            <sphereGeometry args={[0.3, 32, 32]} />
            <meshStandardMaterial
              color="#ffffff"
              roughness={0.1}
              metalness={0.8}
              envMapIntensity={1}
            />
          </mesh>
          
          {/* Visor */}
          <mesh position={[0, 0.8, 0.15]}>
            <sphereGeometry args={[0.25, 32, 32, 0, Math.PI]} />
            <meshPhysicalMaterial
              color="#4169e1"
              transparent
              opacity={0.3}
              roughness={0}
              metalness={1}
              thickness={0.5}
              transmission={0.9}
            />
          </mesh>
          
          {/* Body */}
          <mesh position={[0, 0, 0]}>
            <cylinderGeometry args={[0.25, 0.3, 1, 32]} />
            <meshStandardMaterial
              color="#f0f0f0"
              roughness={0.5}
              metalness={0.3}
            />
          </mesh>
          
          {/* Arms */}
          <mesh position={[-0.4, 0.2, 0]} rotation={[0, 0, -0.5]}>
            <cylinderGeometry args={[0.08, 0.08, 0.6, 16]} />
            <meshStandardMaterial color="#f0f0f0" />
          </mesh>
          <mesh position={[0.4, 0.2, 0]} rotation={[0, 0, 0.5]}>
            <cylinderGeometry args={[0.08, 0.08, 0.6, 16]} />
            <meshStandardMaterial color="#f0f0f0" />
          </mesh>
          
          {/* Legs */}
          <mesh position={[-0.15, -0.8, 0]}>
            <cylinderGeometry args={[0.1, 0.1, 0.8, 16]} />
            <meshStandardMaterial color="#f0f0f0" />
          </mesh>
          <mesh position={[0.15, -0.8, 0]}>
            <cylinderGeometry args={[0.1, 0.1, 0.8, 16]} />
            <meshStandardMaterial color="#f0f0f0" />
          </mesh>
          
          {/* Backpack */}
          <mesh position={[0, 0, -0.3]}>
            <boxGeometry args={[0.3, 0.4, 0.2]} />
            <meshStandardMaterial color="#ff6347" />
          </mesh>
          
          {/* Light from helmet */}
          <pointLight
            position={[0, 0.8, 0.3]}
            intensity={0.5}
            color="#ffffff"
            distance={2}
          />
        </group>
      </Float>
    </group>
  );
};

export default FloatingAstronaut;