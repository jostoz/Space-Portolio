"use client";

import React, { useRef, useEffect, useState, useMemo } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { gsap } from "gsap";
import { projects } from "@/constants";
import ProjectFilters from "./ProjectFilters";
import ProjectModal from "./ProjectModal";

const DynamicCarousel = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  // Mouse position tracking
  const mouseX = useRef(0);
  const velocity = useRef(0);
  const position = useRef(0);
  const rafId = useRef<number>();
  const isHovering = useRef(false);

  // Filter projects
  const filteredProjects = useMemo(() => {
    if (activeCategory === 'All') return projects;
    return projects.filter(project => project.category === activeCategory);
  }, [activeCategory]);

  // Duplicate projects for infinite scroll
  const infiniteProjects = useMemo(() => {
    return [...filteredProjects, ...filteredProjects, ...filteredProjects];
  }, [filteredProjects]);

  // Categories
  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(projects.map(p => p.category || 'Enterprise'))];
    return ['All', ...uniqueCategories];
  }, []);

  const projectCounts = useMemo(() => {
    const counts: Record<string, number> = { 'All': projects.length };
    projects.forEach(project => {
      const category = project.category || 'Enterprise';
      counts[category] = (counts[category] || 0) + 1;
    });
    return counts;
  }, []);

  // Scroll effects
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

  // Mouse-based movement
  const updateVelocity = () => {
    if (!containerRef.current || !isHovering.current) {
      velocity.current *= 0.95; // Friction when not hovering
      if (Math.abs(velocity.current) < 0.1) {
        velocity.current = 0;
      }
    } else {
      // Calculate velocity based on mouse position
      const containerRect = containerRef.current.getBoundingClientRect();
      const centerX = containerRect.width / 2;
      const relativeX = mouseX.current - containerRect.left - centerX;
      const maxVelocity = 15;
      
      // Convert mouse position to velocity (-1 to 1 range)
      const normalizedX = relativeX / centerX;
      velocity.current = normalizedX * maxVelocity;
    }

    // Update position
    position.current += velocity.current;

    // Update carousel position
    if (trackRef.current) {
      gsap.set(trackRef.current, {
        x: position.current,
        force3D: true
      });

      // Infinite scroll logic
      const cardWidth = 350 + 32; // card width + gap
      const totalWidth = cardWidth * filteredProjects.length;
      
      if (position.current > 0) {
        position.current -= totalWidth;
      } else if (position.current < -totalWidth * 2) {
        position.current += totalWidth;
      }
    }

    rafId.current = requestAnimationFrame(updateVelocity);
  };

  // Mouse handlers
  const handleMouseMove = (e: React.MouseEvent) => {
    mouseX.current = e.clientX;
  };

  const handleMouseEnter = () => {
    isHovering.current = true;
  };

  const handleMouseLeave = () => {
    isHovering.current = false;
  };

  // Card hover effects
  const handleCardHover = (index: number) => {
    setHoveredIndex(index);
    const card = document.querySelector(`[data-card-index="${index}"]`);
    
    if (card) {
      gsap.to(card, {
        scale: 1.05,
        y: -10,
        duration: 0.3,
        ease: "power2.out"
      });
    }
  };

  const handleCardLeave = (index: number) => {
    setHoveredIndex(null);
    const card = document.querySelector(`[data-card-index="${index}"]`);
    
    if (card) {
      gsap.to(card, {
        scale: 1,
        y: 0,
        duration: 0.3,
        ease: "power2.out"
      });
    }
  };

  // Initialize animation loop
  useEffect(() => {
    rafId.current = requestAnimationFrame(updateVelocity);

    return () => {
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [filteredProjects.length]);

  // Reset position on category change
  useEffect(() => {
    position.current = 0;
    velocity.current = 0;
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
            Move your mouse to navigate through my work
          </motion.p>
        </motion.div>

        {/* Filters */}
        <ProjectFilters
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          projectCounts={projectCounts}
        />

        {/* Dynamic Carousel */}
        <div 
          className="relative mt-12"
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Gradient overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#030014] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#030014] to-transparent z-10 pointer-events-none" />
          
          {/* Carousel track */}
          <div className="overflow-hidden">
            <div
              ref={trackRef}
              className="flex gap-8 py-8"
              style={{ width: "max-content" }}
            >
              {infiniteProjects.map((project, index) => (
                <motion.div
                  key={`${activeCategory}-${index}`}
                  data-card-index={index}
                  className="relative w-[350px] h-[450px] cursor-pointer"
                  onMouseEnter={() => handleCardHover(index)}
                  onMouseLeave={() => handleCardLeave(index)}
                  onClick={() => handleOpenModal(project)}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: (index % filteredProjects.length) * 0.1 }}
                >
                  {/* Card glow effect */}
                  <div className={`absolute -inset-2 bg-gradient-to-r from-purple-600/20 via-cyan-600/20 to-pink-600/20 rounded-2xl blur-xl transition-opacity duration-300 ${
                    hoveredIndex === index ? 'opacity-100' : 'opacity-0'
                  }`} />
                  
                  {/* Card content */}
                  <div className="relative h-full bg-gradient-to-br from-[#0a0a0a] via-[#1a1a2e] to-[#16213e] border border-[#2A0E61] rounded-2xl overflow-hidden">
                    {/* Background image/video */}
                    <div className="absolute inset-0">
                      {project.video && hoveredIndex === index ? (
                        <video
                          src={project.video}
                          className="w-full h-full object-cover"
                          autoPlay
                          loop
                          muted
                          playsInline
                        />
                      ) : (
                        <div 
                          className="w-full h-full bg-cover bg-center transition-transform duration-700"
                          style={{ 
                            backgroundImage: `url(${project.image})`,
                            transform: hoveredIndex === index ? 'scale(1.1)' : 'scale(1)'
                          }}
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
                    </div>

                    {/* Content */}
                    <div className="relative z-10 p-6 h-full flex flex-col justify-end">
                      <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                      <p className="text-gray-400 text-sm mb-4 line-clamp-2">{project.description}</p>
                      
                      {/* Tech stack */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tech.slice(0, 3).map((tech: string, i: number) => (
                          <span 
                            key={i}
                            className="px-2 py-1 text-xs bg-purple-500/20 text-purple-300 rounded-full"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Metrics */}
                      {project.metrics && (
                        <div className="flex gap-4 text-xs text-gray-500">
                          {project.metrics.slice(0, 2).map((metric: string, i: number) => (
                            <span key={i}>{metric}</span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Hover overlay */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-purple-900/50 to-transparent opacity-0 transition-opacity duration-300"
                      animate={{ opacity: hoveredIndex === index ? 1 : 0 }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Mouse indicator */}
          <motion.div
            className="text-center mt-8 text-gray-500 text-sm"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            ← Move your mouse to navigate →
          </motion.div>
        </div>
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

export default DynamicCarousel;