"use client";

import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Preload, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";
import SpaceEnvironment from "./SpaceEnvironment";
import PlanetSystem from "./PlanetSystem";
import AuroraEffect from "./AuroraEffect";
import FloatingAstronaut from "./FloatingAstronaut";

const SpaceScene = () => {
  return (
    <div className="w-full h-screen fixed inset-0 z-[1]">
      <Canvas
        gl={{ 
          antialias: true, 
          alpha: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.2
        }}
        shadows
      >
        <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={75} />
        
        <Suspense fallback={null}>
          {/* Main space environment with stars and nebula */}
          <SpaceEnvironment />
          
          {/* Aurora borealis effect */}
          <AuroraEffect />
          
          {/* Planet system */}
          <PlanetSystem />
          
          {/* Floating astronaut */}
          <FloatingAstronaut />
          
          
          <Preload all />
        </Suspense>
        
        {/* Optional controls for development */}
        {/* <OrbitControls enableZoom={false} enablePan={false} /> */}
      </Canvas>
    </div>
  );
};

export default SpaceScene;