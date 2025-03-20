"use client";
import React from "react";
import { motion } from "framer-motion";
import { slideInFromLeft, slideInFromRight, slideInFromTop } from "@/utils/motion";
import { SparklesIcon } from "@heroicons/react/24/solid";

const Encryption = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen relative w-full h-full">
      <div className="absolute w-full h-auto flex flex-col items-center justify-center z-10">
        <motion.div
          variants={slideInFromTop}
          className="Welcome-box py-[8px] px-[7px] border border-[#7042f88b] opacity-[0.9]"
        >
          <SparklesIcon className="text-[#b49bff] mr-[10px] h-5 w-5" />
          <h1 className="Welcome-text text-[13px]">
            Ventajas de FXperto
          </h1>
        </motion.div>

        <motion.div
          variants={slideInFromLeft(0.5)}
          className="text-[50px] text-white font-medium mt-[10px] text-center mb-[15px]"
        >
          ¿Por qué elegir FXperto?
        </motion.div>

        <motion.div
          variants={slideInFromRight(0.5)}
          className="cursive text-[20px] text-gray-200 mb-10 mt-[10px] text-center"
        >
          La plataforma preferida por profesionales financieros
        </motion.div>
      </div>

      <div className="flex flex-col items-center justify-center translate-y-[-50px] absolute z-20 w-auto h-auto">
        <div className="flex flex-col items-center group cursor-pointer w-auto h-auto">
          <div className="Welcome-box py-[15px] px-[47px] my-[20px] cursor-pointer border border-[#7042f88b] opacity-[0.9]">
            <h1 className="Welcome-text text-[15px]">
              Ventaja Competitiva
            </h1>
          </div>
          <div className="Welcome-box py-[15px] px-[47px] my-[20px] cursor-pointer border border-[#7042f88b] opacity-[0.9]">
            <h1 className="Welcome-text text-[15px]">
              Decisiones Basadas en Datos
            </h1>
          </div>
          <div className="Welcome-box py-[15px] px-[47px] my-[20px] cursor-pointer border border-[#7042f88b] opacity-[0.9]">
            <h1 className="Welcome-text text-[15px]">
              Transparencia Total
            </h1>
          </div>
          <div className="Welcome-box py-[15px] px-[47px] my-[20px] cursor-pointer border border-[#7042f88b] opacity-[0.9]">
            <h1 className="Welcome-text text-[15px]">
              Innovación Continua
            </h1>
          </div>
        </div>
      </div>

      <div className="absolute z-10 w-full h-full flex justify-center items-center">
        <video
          loop
          muted
          autoPlay
          playsInline
          className="w-full h-full object-cover opacity-[0.4]"
        >
          <source src="/encryption.webm" type="video/webm" />
        </video>
      </div>
    </div>
  );
};

export default Encryption;
