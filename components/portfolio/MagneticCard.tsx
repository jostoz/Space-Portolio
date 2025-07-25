"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { animated } from "@react-spring/web";
import { gsap } from "gsap";
import { useMagnetic } from "./hooks/useMagnetic";

interface MagneticCardProps {
  project: any;
  index: number;
  isActive?: boolean;
  onOpenModal?: (project: any) => void;
  style?: any;
}

const MagneticCard = ({ project, index, isActive = false, onOpenModal, style }: MagneticCardProps) => {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const { elementRef, springProps } = useMagnetic({
    strength: 0.3,
    range: 150,
    scale: 1.05,
    rotation: 12
  });

  // Advanced particle system
  useEffect(() => {
    if (isHovering && particlesRef.current) {
      const particles = Array.from({ length: 20 }, (_, i) => {
        const particle = document.createElement('div');
        particle.className = 'absolute w-1 h-1 bg-gradient-to-r from-purple-400 to-cyan-400 rounded-full pointer-events-none';
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particlesRef.current!.appendChild(particle);

        // GSAP animation for each particle
        gsap.fromTo(particle, 
          {
            scale: 0,
            opacity: 0,
            rotation: 0
          },
          {
            scale: Math.random() * 2 + 0.5,
            opacity: 1,
            rotation: 360,
            duration: 2 + Math.random() * 2,
            ease: "power2.out",
            repeat: -1,
            yoyo: true,
            delay: i * 0.05
          }
        );

        return particle;
      });

      return () => {
        particles.forEach(particle => particle.remove());
      };
    }
  }, [isHovering]);

  // Video management
  useEffect(() => {
    if (isHovering && videoRef.current) {
      videoRef.current.play();
    } else if (videoRef.current) {
      videoRef.current.pause();
    }
  }, [isHovering]);

  // Glow effect
  useEffect(() => {
    if (glowRef.current) {
      gsap.to(glowRef.current, {
        opacity: isHovering ? 1 : 0,
        scale: isHovering ? 1.2 : 1,
        duration: 0.6,
        ease: "power2.out"
      });
    }
  }, [isHovering]);

  // Advanced mouse tracking for internal elements
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!elementRef.current) return;

    const rect = elementRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;

    // Parallax effect for content layers
    const content = elementRef.current.querySelector('.card-content') as HTMLElement;
    if (content) {
      gsap.to(content, {
        x: x * 10,
        y: y * 10,
        duration: 0.3,
        ease: "power2.out"
      });
    }

    // Background parallax
    const background = elementRef.current.querySelector('.card-background') as HTMLElement;
    if (background) {
      gsap.to(background, {
        x: x * 5,
        y: y * 5,
        duration: 0.4,
        ease: "power2.out"
      });
    }
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    
    // Reset internal parallax
    if (elementRef.current) {
      const content = elementRef.current.querySelector('.card-content') as HTMLElement;
      const background = elementRef.current.querySelector('.card-background') as HTMLElement;
      
      if (content) {
        gsap.to(content, { x: 0, y: 0, duration: 0.5, ease: "power2.out" });
      }
      if (background) {
        gsap.to(background, { x: 0, y: 0, duration: 0.6, ease: "power2.out" });
      }
    }
  };

  return (
    <animated.div style={{ ...style, ...springProps }} className="w-full">
      <motion.div
        ref={elementRef as any}
        className="relative h-[450px] w-full bg-gradient-to-br from-[#0a0a0a] via-[#1a1a2e] to-[#16213e] border border-[#2A0E61] rounded-2xl overflow-hidden cursor-pointer group"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={handleMouseLeave}
        onClick={() => onOpenModal?.(project)}
        style={{
          transformStyle: "preserve-3d",
        }}
        whileHover={{
          boxShadow: "0 25px 50px -12px rgba(124, 58, 237, 0.4)",
        }}
      >
        {/* Glow effect */}
        <div
          ref={glowRef}
          className="absolute -inset-2 bg-gradient-to-r from-purple-600/20 via-cyan-600/20 to-pink-600/20 rounded-2xl blur-xl opacity-0 -z-10"
        />

        {/* Background layer with parallax */}
        <div className="card-background absolute inset-0">
          {/* Animated gradient background */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-br from-purple-600/0 via-cyan-600/0 to-pink-600/0"
            animate={{
              background: isHovering 
                ? "linear-gradient(135deg, rgba(147, 51, 234, 0.3) 0%, rgba(6, 182, 212, 0.3) 50%, rgba(236, 72, 153, 0.3) 100%)"
                : "linear-gradient(135deg, rgba(147, 51, 234, 0.1) 0%, rgba(6, 182, 212, 0.1) 50%, rgba(236, 72, 153, 0.1) 100%)"
            }}
          />

          {/* Video Background */}
          {project.video && (
            <div className="absolute inset-0 overflow-hidden">
              <video
                ref={videoRef}
                className={`w-full h-full object-cover transition-opacity duration-500 ${isHovering ? 'opacity-40' : 'opacity-0'}`}
                muted
                loop
                playsInline
                onLoadedData={() => setVideoLoaded(true)}
              >
                <source src={project.video} type="video/mp4" />
              </video>
            </div>
          )}

          {/* Mesh gradient overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(124,58,237,0.1),transparent_50%)]" />
        </div>

        {/* Particle system */}
        <div ref={particlesRef} className="absolute inset-0 pointer-events-none z-10" />

        {/* Content layer with parallax */}
        <div className="card-content relative z-20 p-6 h-full flex flex-col">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <motion.h3 
                className="text-xl font-bold text-white mb-2 line-clamp-2"
                animate={{ 
                  color: isHovering ? "#a78bfa" : "#ffffff",
                  textShadow: isHovering ? "0 0 20px rgba(167, 139, 250, 0.5)" : "none"
                }}
              >
                {project.title}
              </motion.h3>
              
              <motion.div
                className="flex items-center gap-2 mb-3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <span className={`px-2 py-1 text-xs rounded-full border ${
                  project.category === 'AI/ML' ? 'border-purple-500 text-purple-300 bg-purple-500/20' :
                  project.category === 'Full-Stack' ? 'border-cyan-500 text-cyan-300 bg-cyan-500/20' :
                  project.category === 'Mobile' ? 'border-green-500 text-green-300 bg-green-500/20' :
                  'border-orange-500 text-orange-300 bg-orange-500/20'
                }`}>
                  {project.category || 'Enterprise'}
                </span>
                
                {project.featured && (
                  <motion.span 
                    className="text-yellow-400 text-xs"
                    animate={{ 
                      rotate: isHovering ? [0, 10, -10, 0] : 0,
                      scale: isHovering ? [1, 1.1, 1] : 1
                    }}
                    transition={{ duration: 2, repeat: isHovering ? Infinity : 0 }}
                  >
                    ⭐ Featured
                  </motion.span>
                )}
              </motion.div>
            </div>

            {/* Floating action buttons */}
            <motion.div 
              className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              animate={{
                scale: isHovering ? 1 : 0.8,
                y: isHovering ? 0 : 10
              }}
            >
              {project.github && (
                <motion.a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-gray-800/50 backdrop-blur-sm rounded-lg hover:bg-gray-700/50 transition-colors"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </motion.a>
              )}
              
              {project.demo && (
                <motion.a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-purple-600/50 backdrop-blur-sm rounded-lg hover:bg-purple-500/50 transition-colors"
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </motion.a>
              )}
            </motion.div>
          </div>

          {/* Description with morphing effect */}
          <motion.p 
            className="text-gray-400 text-sm mb-4 line-clamp-3 flex-1"
            animate={{
              color: isHovering ? "#d1d5db" : "#9ca3af"
            }}
          >
            {project.description}
          </motion.p>

          {/* Tech stack with liquid animations */}
          <div className="mb-4">
            <h4 className="text-purple-400 text-xs font-semibold mb-2">Tech Stack:</h4>
            <div className="flex flex-wrap gap-2">
              {project.tech.slice(0, 4).map((tech: string, techIndex: number) => (
                <motion.span
                  key={techIndex}
                  className="text-xs bg-[#2A0E61]/50 text-gray-300 px-2 py-1 rounded border border-purple-500/20 backdrop-blur-sm"
                  whileHover={{ 
                    backgroundColor: "#7c3aed",
                    scale: 1.05,
                    borderColor: "#a78bfa",
                    y: -2
                  }}
                  animate={{
                    y: isHovering ? Math.sin(Date.now() * 0.001 + techIndex) * 2 : 0
                  }}
                  transition={{ duration: 0.2 }}
                >
                  {tech}
                </motion.span>
              ))}
              {project.tech.length > 4 && (
                <span className="text-xs text-gray-500">+{project.tech.length - 4}</span>
              )}
            </div>
          </div>

          {/* Metrics with pulsing indicators */}
          <div className="mt-auto">
            <h4 className="text-cyan-400 text-xs font-semibold mb-2">Key Results:</h4>
            <div className="space-y-1">
              {project.metrics.slice(0, 2).map((metric: string, metricIndex: number) => (
                <motion.div
                  key={metricIndex}
                  className="flex items-center gap-2 text-xs text-gray-400"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 + metricIndex * 0.1 }}
                >
                  <motion.span
                    className="text-cyan-400 text-lg leading-none"
                    animate={{ 
                      rotate: isHovering ? [0, 180, 360] : 0,
                      scale: isHovering ? [1, 1.2, 1] : 1,
                      textShadow: isHovering ? "0 0 10px rgba(6, 182, 212, 0.8)" : "none"
                    }}
                    transition={{ duration: 2, ease: "easeInOut", repeat: isHovering ? Infinity : 0 }}
                  >
                    •
                  </motion.span>
                  {metric}
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Interactive border glow */}
        <motion.div
          className="absolute inset-0 rounded-2xl border-2 border-transparent"
          animate={{
            borderImage: isHovering 
              ? "linear-gradient(45deg, rgba(124, 58, 237, 0.8), rgba(6, 182, 212, 0.8), rgba(236, 72, 153, 0.8)) 1"
              : "none"
          }}
        />

        {/* Loading overlay for video */}
        {project.video && !videoLoaded && (
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center backdrop-blur-sm">
            <motion.div
              className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
          </div>
        )}
      </motion.div>
    </animated.div>
  );
};

export default MagneticCard;