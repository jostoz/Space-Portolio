"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import {
  AI_ML_skills,
  Backend_skill,
  Frontend_skill,
  Full_stack,
  Other_skill,
  Skill_data,
} from "@/constants";

interface SkillItemProps {
  skill: { Image: string; width: number; height: number; name?: string };
  index: number;
  category: string;
}

const SkillItem = ({ skill, index, category }: SkillItemProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ 
        delay: index * 0.05,
        duration: 0.5,
        type: "spring",
        stiffness: 100
      }}
      whileHover={{ 
        scale: 1.2,
        rotate: 360,
        transition: { duration: 0.5 }
      }}
      className="relative group cursor-pointer"
    >
      <div className="relative w-20 h-20 flex items-center justify-center">
        <Image
          src={skill.Image}
          alt={skill.name || "skill"}
          width={skill.width}
          height={skill.height}
          className="object-contain"
        />
        
        {/* Hover glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full opacity-0 group-hover:opacity-50 blur-xl transition-opacity duration-300" />
      </div>
      
      {/* Skill name tooltip */}
      {skill.name && (
        <motion.div
          className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-[#0F0F0F] border border-[#2A0E61] px-2 py-1 rounded text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap"
          initial={{ y: -10 }}
          whileHover={{ y: 0 }}
        >
          {skill.name}
        </motion.div>
      )}
    </motion.div>
  );
};

const AnimatedSkills = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const x1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const x2 = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

  return (
    <section
      ref={containerRef}
      id="skills"
      className="relative flex flex-col items-center justify-center gap-3 h-full overflow-hidden pb-80 py-20"
    >
      {/* Animated background */}
      <div className="absolute inset-0 z-0">
        <motion.div
          style={{ x: x1 }}
          className="absolute top-20 left-0 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl"
        />
        <motion.div
          style={{ x: x2 }}
          className="absolute bottom-20 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"
        />
      </div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center z-10 mb-12"
      >
        <motion.div className="Welcome-box py-[8px] px-[7px] border border-[#7042f88b] opacity-[0.9] inline-block mb-4">
          <h1 className="Welcome-text text-[13px]">
            Technical Expertise
          </h1>
        </motion.div>
        <h2 className="text-[40px] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
          Technology Stack
        </h2>
        <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
          10+ years of proven expertise in AI & Machine Learning
        </p>
      </motion.div>

      {/* Skills Categories */}
      <div className="w-full max-w-6xl mx-auto px-4 z-10 space-y-16">
        {/* AI & Machine Learning */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <h3 className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 text-center">
            AI & Machine Learning
          </h3>
          <div className="flex flex-row justify-center flex-wrap gap-8">
            {AI_ML_skills.map((skill, index) => (
              <SkillItem key={index} skill={skill} index={index} category="ai" />
            ))}
          </div>
        </motion.div>

        {/* Languages & Frameworks */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <h3 className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500 text-center">
            Languages & Frameworks
          </h3>
          <div className="flex flex-row justify-center flex-wrap gap-8">
            {Skill_data.map((skill, index) => (
              <SkillItem key={index} skill={skill} index={index} category="lang" />
            ))}
          </div>
        </motion.div>

        {/* Frontend Technologies */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <h3 className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-teal-500 text-center">
            Frontend Technologies
          </h3>
          <div className="flex flex-row justify-center flex-wrap gap-8">
            {Frontend_skill.map((skill, index) => (
              <SkillItem key={index} skill={skill} index={index} category="frontend" />
            ))}
          </div>
        </motion.div>

        {/* Backend Technologies */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <h3 className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500 text-center">
            Backend Technologies
          </h3>
          <div className="flex flex-row justify-center flex-wrap gap-8">
            {Backend_skill.map((skill, index) => (
              <SkillItem key={index} skill={skill} index={index} category="backend" />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Animated skill orbit */}
      <motion.div
        style={{ rotate }}
        className="absolute w-full h-full pointer-events-none"
      >
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-[600px] h-[600px] border border-purple-500/20 rounded-full" />
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-4 h-4 bg-purple-500 rounded-full animate-pulse" />
          </div>
        </div>
      </motion.div>

      {/* Background video with overlay */}
      <div className="w-full h-full absolute">
        <div className="w-full h-full z-[-10] opacity-30 absolute flex items-center justify-center bg-cover">
          <video
            className="w-full h-auto"
            preload="false"
            playsInline
            loop
            muted
            autoPlay
            src="/blackhole.webm"
          />
        </div>
      </div>
    </section>
  );
};

export default AnimatedSkills;