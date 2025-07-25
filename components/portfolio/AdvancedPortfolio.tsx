"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectCoverflow } from "swiper/modules";
import { gsap } from "gsap";
import { projects } from "@/constants";
import ProjectFilters from "./ProjectFilters";
import ProjectModal from "./ProjectModal";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";

interface ProjectCardProps {
  project: any;
  index: number;
  isActive?: boolean;
  onOpenModal?: (project: any) => void;
}

const AdvancedProjectCard = ({ project, index, isActive = false, onOpenModal }: ProjectCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isHovered && videoRef.current) {
      videoRef.current.play();
    } else if (videoRef.current) {
      videoRef.current.pause();
    }
  }, [isHovered]);

  useEffect(() => {
    if (isHovered && particlesRef.current) {
      // GSAP particle animation
      const particles = particlesRef.current.children;
      gsap.fromTo(particles, 
        { 
          scale: 0, 
          opacity: 0,
          rotation: 0 
        },
        { 
          scale: 1, 
          opacity: 1,
          rotation: 360,
          duration: 2,
          stagger: 0.1,
          ease: "back.out(1.7)"
        }
      );
    }
  }, [isHovered]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -15;
    const rotateY = ((x - centerX) / centerX) * 15;
    
    gsap.to(cardRef.current, {
      rotationX: rotateX,
      rotationY: rotateY,
      transformPerspective: 1000,
      scale: 1.05,
      duration: 0.3,
      ease: "power2.out"
    });

    // Magnetic effect
    const magnetic = {
      x: ((x - centerX) / centerX) * 10,
      y: ((y - centerY) / centerY) * 10
    };

    gsap.to(cardRef.current, {
      x: magnetic.x,
      y: magnetic.y,
      duration: 0.3,
      ease: "power2.out"
    });
  };

  const handleMouseLeave = () => {
    if (cardRef.current) {
      gsap.to(cardRef.current, {
        rotationX: 0,
        rotationY: 0,
        scale: 1,
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "power2.out"
      });
    }
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      className="relative h-[500px] w-full bg-gradient-to-br from-[#0a0a0a] via-[#1a1a2e] to-[#16213e] border border-[#2A0E61] rounded-2xl overflow-hidden cursor-pointer group"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={() => onOpenModal?.(project)}
      whileHover={{
        boxShadow: "0 25px 50px -12px rgba(124, 58, 237, 0.3)",
      }}
      style={{
        transformStyle: "preserve-3d",
      }}
    >
      {/* Animated background gradient */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-purple-600/0 via-cyan-600/0 to-pink-600/0 transition-all duration-500"
        animate={{
          background: isHovered 
            ? "linear-gradient(135deg, rgba(147, 51, 234, 0.2) 0%, rgba(6, 182, 212, 0.2) 50%, rgba(236, 72, 153, 0.2) 100%)"
            : "linear-gradient(135deg, rgba(147, 51, 234, 0) 0%, rgba(6, 182, 212, 0) 50%, rgba(236, 72, 153, 0) 100%)"
        }}
      />

      {/* Video Background */}
      {project.video && (
        <div className="absolute inset-0 overflow-hidden">
          <video
            ref={videoRef}
            className={`w-full h-full object-cover transition-opacity duration-500 ${isHovered ? 'opacity-30' : 'opacity-0'}`}
            muted
            loop
            playsInline
            onLoadedData={() => setVideoLoaded(true)}
          >
            <source src={project.video} type="video/mp4" />
          </video>
        </div>
      )}

      {/* Glitch overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 opacity-0"
        animate={{
          opacity: isHovered ? [0, 0.5, 0] : 0,
          skewX: isHovered ? [0, 2, -2, 0] : 0,
        }}
        transition={{
          opacity: { duration: 0.1, repeat: isHovered ? Infinity : 0, repeatDelay: 2 },
          skewX: { duration: 0.1, repeat: isHovered ? Infinity : 0, repeatDelay: 2 }
        }}
      />

      {/* Particle system */}
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-gradient-to-r from-purple-400 to-cyan-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={isHovered ? {
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
              rotate: [0, 180, 360],
            } : {}}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.1,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 p-6 h-full flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <motion.h3 
              className="text-xl font-bold text-white mb-2 line-clamp-2"
              animate={{ color: isHovered ? "#a78bfa" : "#ffffff" }}
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
                project.category === 'AI/ML' ? 'border-purple-500 text-purple-300 bg-purple-500/10' :
                project.category === 'Full-Stack' ? 'border-cyan-500 text-cyan-300 bg-cyan-500/10' :
                project.category === 'Mobile' ? 'border-green-500 text-green-300 bg-green-500/10' :
                'border-orange-500 text-orange-300 bg-orange-500/10'
              }`}>
                {project.category || 'Enterprise'}
              </span>
              
              {project.featured && (
                <motion.span 
                  className="text-yellow-400 text-xs"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  ⭐ Featured
                </motion.span>
              )}
            </motion.div>
          </div>

          {/* Action buttons */}
          <motion.div 
            className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            initial={{ scale: 0 }}
            animate={{ scale: isHovered ? 1 : 0 }}
          >
            {project.github && (
              <motion.a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-800/50 rounded-lg hover:bg-gray-700/50 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
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
                className="p-2 bg-purple-600/50 rounded-lg hover:bg-purple-500/50 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </motion.a>
            )}
          </motion.div>
        </div>

        {/* Description */}
        <p className="text-gray-400 text-sm mb-4 line-clamp-3 flex-1">
          {project.description}
        </p>

        {/* Tech stack */}
        <div className="mb-4">
          <h4 className="text-purple-400 text-xs font-semibold mb-2">Tech Stack:</h4>
          <div className="flex flex-wrap gap-1">
            {project.tech.slice(0, 4).map((tech: string, techIndex: number) => (
              <motion.span
                key={techIndex}
                className="text-xs bg-[#2A0E61]/50 text-gray-300 px-2 py-1 rounded border border-purple-500/20"
                whileHover={{ 
                  backgroundColor: "#7c3aed",
                  scale: 1.05,
                  borderColor: "#a78bfa"
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

        {/* Metrics */}
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
                  animate={{ rotate: isHovered ? [0, 180, 360] : 0 }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                >
                  •
                </motion.span>
                {metric}
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Loading overlay for video */}
      {project.video && !videoLoaded && (
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
          <motion.div
            className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        </div>
      )}
    </motion.div>
  );
};

const AdvancedPortfolio = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const swiperRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleOpenModal = (project: any) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProject(null), 300);
  };

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

  // Reset swiper when category changes
  useEffect(() => {
    if (swiperRef.current && swiperRef.current.slideTo) {
      swiperRef.current.slideTo(0, 300);
      setActiveSlide(0);
    }
  }, [activeCategory]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section ref={containerRef} className="py-20 bg-[#030014] relative overflow-hidden">
      {/* Animated background */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ y: backgroundY }}
      >
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-purple-500/3 to-cyan-500/3 rounded-full blur-3xl" />
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
            Featured Projects
          </motion.h1>
          <motion.p 
            className="text-gray-400 text-lg max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Cutting-edge solutions combining AI, machine learning, and modern web technologies
          </motion.p>
          
          {/* Stats */}
          <motion.div 
            className="flex justify-center gap-8 mt-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">{filteredProjects.length}</div>
              <div className="text-sm text-gray-500">Projects</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-cyan-400">10+</div>
              <div className="text-sm text-gray-500">Years</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-pink-400">1M+</div>
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

        {/* Advanced Carousel */}
        <motion.div 
          className="relative"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Swiper
            ref={swiperRef}
            modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
            spaceBetween={30}
            slidesPerView={1}
            centeredSlides={true}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            effect="coverflow"
            coverflowEffect={{
              rotate: 15,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            navigation={{
              nextEl: '.swiper-button-next-custom',
              prevEl: '.swiper-button-prev-custom',
            }}
            breakpoints={{
              640: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 30,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
            }}
            onSlideChange={(swiper) => setActiveSlide(swiper.activeIndex)}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            className="advanced-swiper pb-12"
          >
            <AnimatePresence mode="wait">
              {filteredProjects.map((project, index) => (
                <SwiperSlide key={`${activeCategory}-${index}`}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <AdvancedProjectCard 
                      project={project} 
                      index={index}
                      isActive={index === activeSlide}
                      onOpenModal={handleOpenModal}
                    />
                  </motion.div>
                </SwiperSlide>
              ))}
            </AnimatePresence>
          </Swiper>

          {/* Custom Navigation */}
          <div className="flex justify-center items-center gap-4 mt-8">
            <motion.button
              className="swiper-button-prev-custom p-3 bg-gradient-to-r from-purple-600 to-purple-700 rounded-full hover:from-purple-500 hover:to-purple-600 transition-all duration-300 disabled:opacity-50"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </motion.button>

            <div className="text-sm text-gray-400">
              {activeSlide + 1} / {filteredProjects.length}
            </div>

            <motion.button
              className="swiper-button-next-custom p-3 bg-gradient-to-r from-cyan-600 to-cyan-700 rounded-full hover:from-cyan-500 hover:to-cyan-600 transition-all duration-300 disabled:opacity-50"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
          </div>
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

export default AdvancedPortfolio;