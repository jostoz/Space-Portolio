"use client";
import React from "react";
import { motion } from "framer-motion";
import { slideInFromLeft, slideInFromRight, slideInFromTop } from "@/utils/motion";
import { ChartBarIcon, ShieldCheckIcon, UserGroupIcon, CurrencyDollarIcon } from "@heroicons/react/24/outline";

const WhyFXperto = () => {
  return (
    <section id="why-fxperto" className="py-20 bg-[#030014]">
      <div className="container mx-auto px-4">
        <motion.div
          variants={slideInFromTop}
          className="text-center mb-16"
        >
          <h2 className="text-[40px] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 mb-4">
            ¿Por qué FXperto?
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Descubre las ventajas que nos hacen líderes en gestión de divisas
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <motion.div
            variants={slideInFromLeft(0.5)}
            className="bg-[#0300145e] p-6 rounded-lg border border-[#7042f88b]"
          >
            <ChartBarIcon className="w-12 h-12 text-blue-500 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Análisis Avanzado</h3>
            <p className="text-gray-400">
              Herramientas de análisis técnico y fundamental para decisiones informadas
            </p>
          </motion.div>

          <motion.div
            variants={slideInFromLeft(0.7)}
            className="bg-[#0300145e] p-6 rounded-lg border border-[#7042f88b]"
          >
            <ShieldCheckIcon className="w-12 h-12 text-blue-500 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Seguridad Garantizada</h3>
            <p className="text-gray-400">
              Protección de datos y transacciones con tecnología de última generación
            </p>
          </motion.div>

          <motion.div
            variants={slideInFromRight(0.7)}
            className="bg-[#0300145e] p-6 rounded-lg border border-[#7042f88b]"
          >
            <UserGroupIcon className="w-12 h-12 text-blue-500 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Equipo Experto</h3>
            <p className="text-gray-400">
              Asesoramiento personalizado de profesionales con años de experiencia
            </p>
          </motion.div>

          <motion.div
            variants={slideInFromRight(0.5)}
            className="bg-[#0300145e] p-6 rounded-lg border border-[#7042f88b]"
          >
            <CurrencyDollarIcon className="w-12 h-12 text-blue-500 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">ROI Comprobado</h3>
            <p className="text-gray-400">
              Resultados medibles y optimización continua de estrategias
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhyFXperto; 