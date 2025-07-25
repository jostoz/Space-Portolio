"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text, Box, Float } from "@react-three/drei";
import * as THREE from "three";

interface HologramProps {
  title: string;
  isHovered: boolean;
}

const Hologram = ({ title, isHovered }: HologramProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const textRef = useRef<any>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime) * 0.1;
      
      // Glitch effect on hover
      if (isHovered && Math.random() > 0.95) {
        meshRef.current.position.x = (Math.random() - 0.5) * 0.02;
      } else {
        meshRef.current.position.x = 0;
      }
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.3}>
      <group>
        {/* Holographic frame */}
        <Box ref={meshRef} args={[2, 1.2, 0.1]}>
          <meshStandardMaterial
            color="#00ffff"
            emissive="#00ffff"
            emissiveIntensity={isHovered ? 0.8 : 0.4}
            transparent
            opacity={0.3}
            roughness={0.1}
            metalness={0.9}
          />
        </Box>
        
        {/* Holographic grid */}
        <mesh position={[0, 0, 0.06]}>
          <planeGeometry args={[1.8, 1, 20, 20]} />
          <meshBasicMaterial
            color="#00ffff"
            transparent
            opacity={0.2}
            wireframe
          />
        </mesh>
        
        {/* Title text */}
        <Text
          ref={textRef}
          position={[0, 0, 0.1]}
          fontSize={0.15}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          maxWidth={1.5}
        >
          {title}
        </Text>
      </group>
    </Float>
  );
};

interface HolographicCardProps {
  project: {
    title: string;
    description: string;
    tech: string[];
    metrics: string[];
  };
  index: number;
}

const HolographicCard: React.FC<HolographicCardProps> = ({ project, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="relative h-[400px] cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 3D Hologram */}
      <div className="absolute inset-0 z-10">
        <Canvas camera={{ position: [0, 0, 3], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={0.5} />
          <Hologram title={project.title} isHovered={isHovered} />
        </Canvas>
      </div>
      
      {/* Content overlay */}
      <div className={`absolute inset-0 p-6 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
        <div className="h-full bg-black/80 backdrop-blur-sm border border-cyan-500/50 rounded-lg p-4 overflow-hidden">
          <h3 className="text-lg font-bold text-cyan-400 mb-2">{project.title}</h3>
          <p className="text-gray-300 text-sm mb-3 line-clamp-3">{project.description}</p>
          
          <div className="mb-3">
            <h4 className="text-purple-400 text-xs font-semibold mb-1">Technologies:</h4>
            <div className="flex flex-wrap gap-1">
              {project.tech.slice(0, 3).map((tech, i) => (
                <span key={i} className="text-xs bg-cyan-900/50 text-cyan-300 px-2 py-0.5 rounded">
                  {tech}
                </span>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-green-400 text-xs font-semibold mb-1">Metrics:</h4>
            <div className="text-xs text-gray-400">
              {project.metrics.slice(0, 2).map((metric, i) => (
                <div key={i}>• {metric}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Holographic glow effect */}
      <div className={`absolute inset-0 pointer-events-none transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-50'}`}>
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-transparent to-purple-500/20 animate-pulse" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/10 to-transparent" />
      </div>
    </motion.div>
  );
};

export default HolographicCard;