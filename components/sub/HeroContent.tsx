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
        className="w-full h-full flex justify-center items-center"
      >
        <Image
          src="/mainIconsdark.svg"
          alt="FXperto Enterprise Platform"
          height={650}
          width={650}
        />
      </motion.div>
    </motion.div>
  );
};

export default HeroContent;
