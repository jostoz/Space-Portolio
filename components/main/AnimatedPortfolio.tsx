"use client";
import React, { useState, useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { projects } from "@/constants";

const ProjectCard = ({ project, index }: { project: any, index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;
    
    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
  };

  const handleMouseLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    }
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="relative bg-gradient-to-br from-[#0F0F0F] to-[#1a1a2e] border border-[#2A0E61] rounded-xl p-6 hover:border-[#7042f88b] transition-all duration-300 transform-gpu"
      style={{
        transformStyle: "preserve-3d",
        transition: "transform 0.1s ease-out",
      }}
    >
      {/* Animated background gradient */}
      <div 
        className={`absolute inset-0 bg-gradient-to-br from-purple-600/20 via-transparent to-cyan-600/20 opacity-0 transition-opacity duration-300 rounded-xl ${isHovered ? 'opacity-100' : ''}`}
      />
      
      {/* Glowing border effect */}
      <div className={`absolute inset-0 rounded-xl transition-all duration-300 ${isHovered ? 'shadow-[0_0_30px_rgba(124,58,237,0.5)]' : ''}`} />
      
      {/* Content */}
      <div className="relative z-10">
        <motion.h3 
          className="text-xl font-bold text-white mb-3"
          animate={{ 
            scale: isHovered ? 1.05 : 1,
            color: isHovered ? "#a78bfa" : "#ffffff"
          }}
          transition={{ duration: 0.2 }}
        >
          {project.title}
        </motion.h3>
        
        <p className="text-gray-400 text-sm mb-4 line-clamp-3">
          {project.description}
        </p>
        
        {/* Tech stack with hover animation */}
        <div className="mb-4">
          <h4 className="text-purple-500 text-sm font-semibold mb-2">Technologies:</h4>
          <div className="flex flex-wrap gap-2">
            {project.tech.map((tech: string, techIndex: number) => (
              <motion.span
                key={techIndex}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 + techIndex * 0.05 }}
                whileHover={{ scale: 1.1, backgroundColor: "#7c3aed" }}
                className="text-xs bg-[#2A0E61] text-gray-300 px-2 py-1 rounded cursor-pointer transition-all"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </div>
        
        {/* Metrics with animated counters */}
        <div>
          <h4 className="text-cyan-500 text-sm font-semibold mb-2">Key Metrics:</h4>
          <div className="space-y-1">
            {project.metrics.map((metric: string, metricIndex: number) => (
              <motion.div
                key={metricIndex}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 + metricIndex * 0.1 }}
                className="text-xs text-gray-400 flex items-center gap-2"
              >
                <motion.span
                  animate={{ rotate: isHovered ? 360 : 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-cyan-400"
                >
                  •
                </motion.span>
                {metric}
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Animated hover indicator */}
        <motion.div
          className="absolute bottom-2 right-2 text-purple-400"
          animate={{ 
            opacity: isHovered ? 1 : 0,
            scale: isHovered ? 1 : 0.5
          }}
          transition={{ duration: 0.2 }}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </motion.div>
      </div>
    </motion.div>
  );
};

const AnimatedPortfolio = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section ref={containerRef} id="portfolio" className="py-20 bg-[#030014] relative overflow-hidden">
      {/* Animated background elements */}
      <motion.div
        className="absolute top-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"
        animate={{
          x: [0, -100, 0],
          y: [0, 50, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          style={{ opacity }}
          className="flex flex-col items-center justify-center mb-16"
        >
          <motion.h1 
            className="text-[40px] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 py-10"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Featured Projects
          </motion.h1>
          <motion.p 
            className="text-gray-400 text-center max-w-3xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Innovative solutions combining AI, full-stack development, and scalable architectures
          </motion.p>
        </motion.div>

        {/* Carousel container */}
        <motion.div 
          style={{ y }}
          className="relative"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <ProjectCard key={index} project={project} index={index} />
            ))}
          </div>
        </motion.div>

        {/* Navigation dots */}
        <motion.div 
          className="flex justify-center gap-2 mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          {[0, 1, 2, 3, 4].map((dot) => (
            <motion.div
              key={dot}
              className="w-2 h-2 bg-purple-500 rounded-full cursor-pointer"
              whileHover={{ scale: 1.5 }}
              animate={{
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: dot * 0.2
              }}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AnimatedPortfolio;