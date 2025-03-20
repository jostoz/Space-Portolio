"use client";
import React from "react";
import { motion } from "framer-motion";
import { slideInFromLeft, slideInFromRight } from "@/utils/motion";
import { ChartBarIcon, ShieldCheckIcon, UserGroupIcon, CurrencyDollarIcon } from "@heroicons/react/24/outline";

const WhyFXperto = () => {
  const reasons = [
    {
      icon: <ChartBarIcon className="w-12 h-12 text-blue-500" />,
      title: "Análisis Avanzado",
      description: "Tecnología de vanguardia para análisis predictivo y toma de decisiones basada en datos."
    },
    {
      icon: <ShieldCheckIcon className="w-12 h-12 text-blue-500" />,
      title: "Seguridad Garantizada",
      description: "Protección de nivel empresarial con encriptación de extremo a extremo y cumplimiento normativo."
    },
    {
      icon: <UserGroupIcon className="w-12 h-12 text-blue-500" />,
      title: "Equipo Experto",
      description: "Consultores especializados con años de experiencia en mercados financieros globales."
    },
    {
      icon: <CurrencyDollarIcon className="w-12 h-12 text-blue-500" />,
      title: "ROI Comprobado",
      description: "Resultados medibles y optimización continua de estrategias financieras."
    }
  ];

  return (
    <section id="why-fxperto" className="py-20 bg-[#030014]">
      <div className="container mx-auto px-4">
        <motion.div
          variants={slideInFromTop}
          className="text-center mb-16"
        >
          <h2 className="text-[40px] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 mb-4">
            ¿Por qué elegir FXperto?
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            La plataforma preferida por empresas líderes para la gestión de divisas
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              variants={index % 2 === 0 ? slideInFromLeft(0.5) : slideInFromRight(0.5)}
              className="bg-[#0300145e] p-6 rounded-lg border border-[#7042f88b] hover:border-blue-500 transition-all duration-300"
            >
              <div className="mb-4">
                {reason.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                {reason.title}
              </h3>
              <p className="text-gray-400">
                {reason.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyFXperto; 