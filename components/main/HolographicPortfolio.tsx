"use client";
import React from "react";
import { motion } from "framer-motion";
import { slideInFromTop } from "@/utils/motion";
import { projects } from "@/constants";
import dynamic from "next/dynamic";

// Dynamically import HolographicCard to avoid SSR issues
const HolographicCard = dynamic(() => import("@/components/sub/HolographicCard"), {
  ssr: false,
  loading: () => (
    <div className="h-[400px] bg-[#0F0F0F] border border-[#2A0E61] rounded-lg animate-pulse" />
  ),
});

const HolographicPortfolio = () => {
  // Show only first 6 projects for holographic display
  const featuredProjects = projects.slice(0, 6);

  return (
    <section id="holographic-portfolio" className="py-20 bg-[#030014]">
      <div className="container mx-auto px-4">
        <motion.div
          variants={slideInFromTop}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center justify-center"
        >
          <h1 className="text-[40px] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 py-10">
            Featured Projects
          </h1>
          <p className="text-gray-400 text-center max-w-3xl mb-10">
            Interactive 3D holographic display of my most impactful AI/ML projects
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProjects.map((project, index) => (
            <HolographicCard key={index} project={project} index={index} />
          ))}
        </div>

        {/* View all projects link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-12"
        >
          <a
            href="#portfolio"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border border-[#7042f88b] rounded-lg text-white hover:from-purple-500/30 hover:to-cyan-500/30 transition-all duration-300"
          >
            View All Projects
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default HolographicPortfolio;