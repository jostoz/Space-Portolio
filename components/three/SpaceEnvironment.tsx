"use client";

import React, { useState, useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Points, PointMaterial, Float } from "@react-three/drei";
import * as THREE from "three";
// @ts-ignore
import * as random from "maath/random/dist/maath-random.esm";

interface StarLayerProps {
  count: number;
  size: number;
  radius: number;
  speed: number;
  opacity?: number;
  color?: string;
}

const StarLayer = ({ count, size, radius, speed, opacity = 1, color = "#ffffff" }: StarLayerProps) => {
  const ref = useRef<THREE.Points>(null);
  const [sphere] = useState(() =>
    random.inSphere(new Float32Array(count * 3), { radius })
  );

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta * speed * 0.1;
      ref.current.rotation.y -= delta * speed * 0.15;
    }
  });

  return (
    <Points
      ref={ref}
      positions={sphere}
      stride={3}
      frustumCulled
    >
      <PointMaterial
        transparent
        color={color}
        size={size}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={opacity}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
};

const ShootingStars = () => {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const particleCount = 30;
  
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < particleCount; i++) {
      temp.push({
        position: new THREE.Vector3(
          (Math.random() - 0.5) * 20,
          Math.random() * 10 + 5,
          (Math.random() - 0.5) * 10
        ),
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 2,
          -Math.random() * 2 - 1,
          0
        ),
        scale: Math.random() * 0.5 + 0.5,
        opacity: Math.random() * 0.5 + 0.5,
      });
    }
    return temp;
  }, []);

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    particles.forEach((particle, i) => {
      particle.position.add(particle.velocity.clone().multiplyScalar(delta));
      
      // Fade out as they fall
      particle.opacity = Math.max(0, particle.opacity - delta * 0.5);
      
      // Reset position when out of bounds or faded
      if (particle.position.y < -10 || particle.opacity <= 0) {
        particle.position.set(
          (Math.random() - 0.5) * 20,
          Math.random() * 5 + 10,
          (Math.random() - 0.5) * 10
        );
        particle.opacity = Math.random() * 0.5 + 0.5;
      }

      const matrix = new THREE.Matrix4();
      matrix.setPosition(particle.position);
      matrix.scale(new THREE.Vector3(particle.scale * 0.1, particle.scale * 2, particle.scale));
      meshRef.current!.setMatrixAt(i, matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, particleCount]}>
      <planeGeometry args={[0.05, 1]} />
      <meshBasicMaterial 
        color="#ffffff" 
        transparent 
        opacity={0.8} 
        blending={THREE.AdditiveBlending}
      />
    </instancedMesh>
  );
};

const GalaxyDust = () => {
  const mesh = useRef<THREE.Mesh>(null);
  const { viewport } = useThree();

  useFrame((state) => {
    if (mesh.current && mesh.current.material) {
      (mesh.current.material as any).uniforms.time.value = state.clock.elapsedTime * 0.05;
    }
  });

  const galaxyShader = useMemo(() => ({
    uniforms: {
      time: { value: 0 },
      resolution: { value: new THREE.Vector2(viewport.width, viewport.height) }
    },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float time;
      uniform vec2 resolution;
      varying vec2 vUv;
      
      float noise(vec2 p) {
        return sin(p.x * 10.0) * sin(p.y * 10.0);
      }
      
      void main() {
        vec2 uv = vUv;
        
        // Create swirling galaxy effect
        float angle = time * 0.1;
        vec2 center = vec2(0.5, 0.5);
        vec2 pos = uv - center;
        float dist = length(pos);
        
        float spiral = sin(dist * 20.0 - angle * 5.0 + atan(pos.y, pos.x) * 3.0);
        spiral = spiral * 0.5 + 0.5;
        
        // Color gradient
        vec3 color1 = vec3(0.5, 0.0, 1.0); // Purple
        vec3 color2 = vec3(0.0, 0.8, 1.0); // Cyan
        vec3 color3 = vec3(1.0, 0.2, 0.8); // Pink
        
        vec3 finalColor = mix(color1, color2, spiral);
        finalColor = mix(finalColor, color3, dist);
        
        float alpha = (1.0 - dist) * spiral * 0.15;
        alpha *= smoothstep(0.0, 0.5, dist);
        
        gl_FragColor = vec4(finalColor, alpha);
      }
    `
  }), [viewport]);

  return (
    <mesh 
      ref={mesh} 
      scale={[viewport.width * 3, viewport.height * 3, 1]} 
      position={[0, 0, -10]}
      rotation={[0, 0, Math.PI * 0.1]}
    >
      <planeGeometry args={[1, 1, 64, 64]} />
      <shaderMaterial
        {...galaxyShader}
        transparent
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  );
};

const SpaceEnvironment = () => {
  return (
    <group>
      {/* Galaxy dust and nebula */}
      <GalaxyDust />
      
      {/* Multiple star layers for depth */}
      <StarLayer count={2000} size={0.0008} radius={2} speed={0.5} opacity={0.3} />
      <StarLayer count={1500} size={0.001} radius={1.5} speed={0.7} opacity={0.4} />
      <StarLayer count={1000} size={0.0015} radius={1.2} speed={0.9} opacity={0.6} />
      <StarLayer count={800} size={0.002} radius={1} speed={1.1} opacity={0.8} color="#b49bff" />
      <StarLayer count={500} size={0.003} radius={0.8} speed={1.3} opacity={1} color="#00ffff" />
      
      {/* Bright stars */}
      <StarLayer count={50} size={0.008} radius={1.5} speed={0.3} opacity={1} color="#ffffff" />
      
      {/* Shooting stars */}
      <ShootingStars />
      
      {/* Ambient lighting */}
      <ambientLight intensity={0.05} />
      <pointLight position={[10, 10, 10]} intensity={0.3} color="#b49bff" />
      <pointLight position={[-10, -10, -5]} intensity={0.2} color="#00ffff" />
    </group>
  );
};

export default SpaceEnvironment;