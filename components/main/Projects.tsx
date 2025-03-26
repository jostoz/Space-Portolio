"use client";
import React from "react";
import { motion } from "framer-motion";
import { slideInFromLeft, slideInFromRight, slideInFromTop } from "@/utils/motion";
import ProjectCard from "../sub/ProjectCard";
import { features } from "@/constants";

const Projects = () => {
  return (
    <section id="features" className="py-20 bg-[#030014]">
      <div className="flex flex-col items-center justify-center py-20">
        <h1 className="text-[40px] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 py-20">
          Nuestro Enfoque Educativo
        </h1>
        
        {features.map((feature, index) => (
          <div key={index} className="h-full w-full flex flex-col md:flex-row gap-10 px-10 mt-20">
            <motion.div
              variants={slideInFromLeft(0.5)}
              className="text-white flex flex-col gap-5 mt-[10px]"
            >
              <div className="text-[25px] font-bold">
                {feature.title}
              </div>
              <div className="text-gray-400 text-[17px]">
                {feature.description}
              </div>
            </motion.div>

            <motion.div
              variants={slideInFromRight(0.5)}
              className="w-full h-full relative"
            >
              <ProjectCard
                src={feature.image}
                title={feature.title}
                description={feature.description}
              />
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
