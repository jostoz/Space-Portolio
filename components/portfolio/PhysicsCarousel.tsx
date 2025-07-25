"use client";

import React, { useRef, useEffect, useState, useMemo } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { animated } from "@react-spring/web";
import { gsap } from "gsap";
import { projects } from "@/constants";
import { usePhysics } from "./hooks/usePhysics";
import MagneticCard from "./MagneticCard";
import ProjectFilters from "./ProjectFilters";
import ProjectModal from "./ProjectModal";

const PhysicsCarousel = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  // Filter projects based on active category
  const filteredProjects = useMemo(() => {
    if (activeCategory === 'All') return projects;
    return projects.filter(project => project.category === activeCategory);
  }, [activeCategory]);

  // Get all unique categories
  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(projects.map(p => p.category || 'Enterprise'))];
    return ['All', ...uniqueCategories];
  }, []);

  // Count projects per category
  const projectCounts = useMemo(() => {
    const counts: Record<string, number> = { 'All': projects.length };
    projects.forEach(project => {
      const category = project.category || 'Enterprise';
      counts[category] = (counts[category] || 0) + 1;
    });
    return counts;
  }, []);

  // Physics system
  const { springProps, startDrag, updateDrag, endDrag, handleWheel, currentX, velocityX } = usePhysics({
    friction: 0.88,
    tension: 180,
    damping: 0.75
  });

  // Scroll-based effects
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  // Modal handlers
  const handleOpenModal = (project: any) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProject(null), 300);
  };

  // Drag handlers with enhanced interaction
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    startDrag(e.nativeEvent);
    document.body.style.cursor = 'grabbing';
    
    // Visual feedback
    if (carouselRef.current) {
      gsap.to(carouselRef.current, {
        scale: 0.98,
        duration: 0.2,
        ease: "power2.out"
      });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      updateDrag(e.nativeEvent);
    }
  };

  const handleMouseUp = () => {
    if (isDragging) {
      setIsDragging(false);
      endDrag();
      document.body.style.cursor = 'default';
      
      // Visual feedback
      if (carouselRef.current) {
        gsap.to(carouselRef.current, {
          scale: 1,
          duration: 0.3,
          ease: "back.out(1.7)"
        });
      }
    }
  };

  // Touch support
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    startDrag(e.nativeEvent);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDragging) {
      updateDrag(e.nativeEvent);
    }
  };

  const handleTouchEnd = () => {
    if (isDragging) {
      setIsDragging(false);
      endDrag();
    }
  };

  // Keyboard navigation
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      snapToPrevious();
    } else if (e.key === 'ArrowRight') {
      snapToNext();
    }
  };

  // Navigation helpers
  const snapToNext = () => {
    const nextIndex = Math.min(currentIndex + 1, filteredProjects.length - 1);
    snapToIndex(nextIndex);
  };

  const snapToPrevious = () => {
    const prevIndex = Math.max(currentIndex - 1, 0);
    snapToIndex(prevIndex);
  };

  const snapToIndex = (index: number) => {
    setCurrentIndex(index);
    const cardWidth = 350; // Approximate card width
    const targetX = -index * cardWidth;
    
    gsap.to(currentX, {
      current: targetX,
      duration: 0.8,
      ease: "power3.out"
    });
  };

  // Particle system for background
  useEffect(() => {
    const particles: HTMLDivElement[] = [];
    
    if (containerRef.current) {
      // Create floating particles
      for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'absolute w-1 h-1 bg-purple-500/30 rounded-full pointer-events-none';
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        containerRef.current.appendChild(particle);
        particles.push(particle);

        // GSAP animation
        gsap.to(particle, {
          y: -Math.random() * 100 - 50,
          x: (Math.random() - 0.5) * 100,
          opacity: 0,
          duration: Math.random() * 3 + 2,
          repeat: -1,
          ease: "power1.out"
        });
      }
    }

    return () => {
      particles.forEach(particle => particle.remove());
    };
  }, []);

  // Event listeners
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener('wheel', handleWheel, { passive: false });
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      container.removeEventListener('wheel', handleWheel);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleWheel, currentIndex, filteredProjects.length]);

  // Reset on category change
  useEffect(() => {
    setCurrentIndex(0);
  }, [activeCategory]);

  return (
    <section ref={containerRef} className="py-20 bg-[#030014] relative overflow-hidden">
      {/* Animated background */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ y: backgroundY }}
      >
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-purple-500/3 to-cyan-500/3 rounded-full blur-3xl" />
      </motion.div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          style={{ opacity }}
          className="text-center mb-16"
        >
          <motion.h1 
            className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 mb-6"
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Dynamic Projects
          </motion.h1>
          <motion.p 
            className="text-gray-400 text-lg max-w-3xl mx-auto mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Experience an ultra-responsive, physics-based portfolio with magnetic interactions
          </motion.p>
          
          {/* Dynamic stats */}
          <motion.div 
            className="flex justify-center gap-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <div className="text-center">
              <motion.div 
                className="text-2xl font-bold text-purple-400"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {filteredProjects.length}
              </motion.div>
              <div className="text-sm text-gray-500">Projects</div>
            </div>
            <div className="text-center">
              <motion.div 
                className="text-2xl font-bold text-cyan-400"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              >
                10+
              </motion.div>
              <div className="text-sm text-gray-500">Years</div>
            </div>
            <div className="text-center">
              <motion.div 
                className="text-2xl font-bold text-pink-400"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              >
                1M+
              </motion.div>
              <div className="text-sm text-gray-500">Users</div>
            </div>
          </motion.div>
        </motion.div>

        {/* Project Filters */}
        <ProjectFilters
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          projectCounts={projectCounts}
        />

        {/* Physics Carousel */}
        <motion.div 
          className="relative"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <animated.div
            ref={carouselRef}
            style={springProps}
            className="flex gap-8 cursor-grab active:cursor-grabbing select-none"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <AnimatePresence mode="wait">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={`${activeCategory}-${index}`}
                  className="flex-shrink-0 w-[350px]"
                  initial={{ opacity: 0, scale: 0.8, rotateY: 90 }}
                  animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                  exit={{ opacity: 0, scale: 0.8, rotateY: -90 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 100
                  }}
                >
                  <MagneticCard
                    project={project}
                    index={index}
                    isActive={index === currentIndex}
                    onOpenModal={handleOpenModal}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </animated.div>

          {/* Navigation indicators */}
          <motion.div 
            className="flex justify-center gap-2 mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            {filteredProjects.map((_, index) => (
              <motion.button
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-purple-500 scale-125 shadow-lg shadow-purple-500/50' 
                    : 'bg-gray-600 hover:bg-gray-500'
                }`}
                onClick={() => snapToIndex(index)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                animate={{
                  boxShadow: index === currentIndex 
                    ? "0 0 20px rgba(124, 58, 237, 0.8)" 
                    : "none"
                }}
              />
            ))}
          </motion.div>

          {/* Gesture hints */}
          <motion.div 
            className="text-center mt-6 text-gray-500 text-sm"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Drag • Scroll • Use arrow keys to navigate
          </motion.div>
        </motion.div>

        {/* Velocity indicator */}
        <motion.div
          className="fixed bottom-8 right-8 w-16 h-16 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center border border-purple-500/30"
          animate={{
            scale: Math.abs(velocityX.current) > 10 ? 1.2 : 1,
            borderColor: Math.abs(velocityX.current) > 10 ? "#7c3aed" : "rgba(124, 58, 237, 0.3)"
          }}
          style={{
            display: isDragging ? 'flex' : 'none'
          }}
        >
          <motion.div
            className="w-2 h-8 bg-gradient-to-t from-purple-500 to-cyan-500 rounded-full"
            animate={{
              scaleY: Math.min(Math.abs(velocityX.current) / 50, 1)
            }}
          />
        </motion.div>
      </div>

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </section>
  );
};

export default PhysicsCarousel;