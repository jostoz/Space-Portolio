"use client";
import React from "react";
import { motion } from "framer-motion";
import { slideInFromLeft, slideInFromRight, slideInFromTop } from "@/utils/motion";
import ProjectCard from "../sub/ProjectCard";

const Projects = () => {
  return (
    <section id="features" className="py-20 bg-[#030014]">
      <div className="flex flex-col items-center justify-center py-20">
        <h1 className="text-[40px] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 py-20">
          Características Principales
        </h1>
        <div className="h-full w-full flex flex-col md:flex-row gap-10 px-10">
          <motion.div
            variants={slideInFromLeft(0.5)}
            className="text-white flex flex-col gap-5 mt-[10px]"
          >
            <div className="text-[25px] font-bold">
              Análisis en Tiempo Real
            </div>
            <div className="text-gray-400 text-[17px]">
              Accede a datos actualizados al segundo y análisis técnico avanzado para tomar decisiones informadas en tus operaciones de divisas.
            </div>
          </motion.div>

          <motion.div
            variants={slideInFromRight(0.5)}
            className="w-full h-full relative"
          >
            <ProjectCard
              src="/mainIconsdark.svg"
              title="Datos en Vivo"
              description="Monitorea el mercado de divisas en tiempo real con nuestra plataforma avanzada."
            />
          </motion.div>
        </div>

        <div className="h-full w-full flex flex-col md:flex-row gap-10 px-10 mt-20">
          <motion.div
            variants={slideInFromLeft(0.5)}
            className="text-white flex flex-col gap-5 mt-[10px]"
          >
            <div className="text-[25px] font-bold">
              Alertas Inteligentes
            </div>
            <div className="text-gray-400 text-[17px]">
              Configura alertas personalizadas basadas en tus objetivos y nunca pierdas una oportunidad en el mercado.
            </div>
          </motion.div>

          <motion.div
            variants={slideInFromRight(0.5)}
            className="w-full h-full relative"
          >
            <ProjectCard
              src="/mainIconsdark.svg"
              title="Notificaciones"
              description="Recibe alertas instantáneas sobre movimientos importantes en el mercado."
            />
          </motion.div>
        </div>

        <div className="h-full w-full flex flex-col md:flex-row gap-10 px-10 mt-20">
          <motion.div
            variants={slideInFromLeft(0.5)}
            className="text-white flex flex-col gap-5 mt-[10px]"
          >
            <div className="text-[25px] font-bold">
              Asesoría Experta
            </div>
            <div className="text-gray-400 text-[17px]">
              Accede a consultoría especializada para desarrollar estrategias de cobertura efectivas y optimizar tus operaciones.
            </div>
          </motion.div>

          <motion.div
            variants={slideInFromRight(0.5)}
            className="w-full h-full relative"
          >
            <ProjectCard
              src="/mainIconsdark.svg"
              title="Consultoría"
              description="Obtén asesoramiento experto para maximizar tus resultados en el mercado de divisas."
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
