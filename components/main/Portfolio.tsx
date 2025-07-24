"use client";
import React from "react";
import { motion } from "framer-motion";
import { slideInFromTop } from "@/utils/motion";
import { projects } from "@/constants";

const Portfolio = () => {
  return (
    <section id="portfolio" className="py-20 bg-[#030014]">
      <div className="container mx-auto px-4">
        <motion.div
          variants={slideInFromTop}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center justify-center"
        >
          <h1 className="text-[40px] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 py-10">
            Proyectos Destacados
          </h1>
          <p className="text-gray-400 text-center max-w-3xl mb-10">
            Soluciones innovadoras que combinan AI, desarrollo full-stack y arquitecturas escalables
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-[#0F0F0F] border border-[#2A0E61] rounded-lg p-6 hover:border-[#7042f88b] transition-all duration-300 hover:scale-105"
            >
              <h3 className="text-xl font-bold text-white mb-3">{project.title}</h3>
              <p className="text-gray-400 text-sm mb-4">{project.description}</p>
              
              <div className="mb-4">
                <h4 className="text-purple-500 text-sm font-semibold mb-2">Tecnologías:</h4>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="text-xs bg-[#2A0E61] text-gray-300 px-2 py-1 rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="text-cyan-500 text-sm font-semibold mb-2">Métricas clave:</h4>
                <div className="flex flex-wrap gap-2">
                  {project.metrics.map((metric, metricIndex) => (
                    <span
                      key={metricIndex}
                      className="text-xs text-gray-400"
                    >
                      • {metric}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;