"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  slideInFromLeft,
  slideInFromRight,
  slideInFromTop,
} from "@/utils/motion";
import { SparklesIcon } from "@heroicons/react/24/solid";
import Image from "next/image";

const HeroContent = () => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="flex flex-row items-center justify-center px-20 mt-40 w-full z-[20]"
    >
      <div className="h-full w-full flex flex-col gap-5 justify-center m-auto text-start">
        <motion.div
          variants={slideInFromTop}
          className="Welcome-box py-[8px] px-[7px] border border-[#7042f88b] opacity-[0.9]"
        >
          <SparklesIcon className="text-[#b49bff] mr-[10px] h-5 w-5" />
          <h1 className="Welcome-text text-[13px]">
            Senior AI Engineer & ML Specialist 🤖
          </h1>
        </motion.div>

        <motion.div
          variants={slideInFromLeft(0.5)}
          className="flex flex-col gap-6 mt-6 text-6xl font-bold text-white max-w-[600px] w-auto h-auto"
        >
          <span>
            Hi, I'm
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
              {" "}
              Josué Tostado{" "}
            </span>
            👋
          </span>
        </motion.div>

        <motion.p
          variants={slideInFromLeft(0.8)}
          className="text-lg text-gray-400 my-5 max-w-[600px]"
        >
          Accomplished AI engineer with 10+ years building intelligent systems that transform businesses. 
          Currently architecting cutting-edge AI educational platforms at Fxperto/Educare Tech.
        </motion.p>
        
        <motion.div
          variants={slideInFromLeft(0.9)}
          className="flex flex-wrap gap-4 mb-5"
        >
          <div className="flex items-center gap-2 text-sm text-gray-300">
            <span className="text-purple-500">🎯</span>
            Real-time Voice AI (50ms latency)
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-300">
            <span className="text-cyan-500">🧠</span>
            LangChain & Agent Orchestration
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-300">
            <span className="text-green-500">📊</span>
            Production Scale (1M+ transactions)
          </div>
        </motion.div>

        <motion.div
          variants={slideInFromLeft(1)}
          className="flex gap-4"
        >
          <a
            href="#contact"
            className="py-2 px-6 button-primary text-center text-white cursor-pointer rounded-lg"
          >
            Contact Me
          </a>
          <a
            href="#portfolio"
            className="py-2 px-6 border border-[#7042f88b] text-center text-white cursor-pointer rounded-lg hover:bg-[#7042f88b] transition-all duration-300"
          >
            View Portfolio
          </a>
        </motion.div>
      </div>

      <motion.div
        variants={slideInFromRight(0.8)}
        className="w-full h-full flex justify-center items-center relative group"
      >
        {/* Main image */}
        <motion.div
          whileHover={{ scale: 1.05, rotate: 5 }}
          transition={{ duration: 0.3 }}
          className="relative z-10"
        >
          <Image
            src="/mainIconsdark.svg"
            alt="AI Engineering Portfolio"
            height={650}
            width={650}
            className="drop-shadow-2xl"
          />
        </motion.div>
        
        {/* Background video that plays on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500 rounded-full overflow-hidden">
          <video
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src="/blackhole.webm" type="video/webm" />
          </video>
        </div>
        
        {/* Animated particles around the image */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-3 h-3 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full"
              animate={{
                x: [0, Math.cos(i * 60 * Math.PI / 180) * 300],
                y: [0, Math.sin(i * 60 * Math.PI / 180) * 300],
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.5,
                ease: "easeInOut"
              }}
              style={{
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)'
              }}
            />
          ))}
        </div>
        
        {/* Glow effect on hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-cyan-600/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>
    </motion.div>
  );
};

export default HeroContent;
