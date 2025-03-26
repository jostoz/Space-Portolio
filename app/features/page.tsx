"use client";
import { motion } from "framer-motion";
import { slideInFromLeft, slideInFromRight, slideInFromTop } from "@/utils/motion";
import { ChartBarIcon, BookOpenIcon, AcademicCapIcon, PuzzlePieceIcon } from "@heroicons/react/24/outline";

export default function Features() {
  return (
    <main className="h-full w-full">
      <div className="flex flex-col gap-20">
        <div className="h-[75vh] w-full flex flex-col justify-center items-center px-4">
          <motion.div
            variants={slideInFromTop}
            className="text-center mb-16"
          >
            <h1 className="text-[40px] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 mb-4">
              Características del Tutor AI
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Descubre cómo nuestro tutor inteligente puede acelerar tu aprendizaje
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <motion.div
              variants={slideInFromLeft(0.5)}
              className="bg-[#0300145e] p-8 rounded-lg border border-[#7042f88b]"
            >
              <BookOpenIcon className="w-12 h-12 text-blue-500 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Aprendizaje Adaptativo</h3>
              <p className="text-gray-400">
                El contenido se ajusta automáticamente a tu nivel de conocimiento.
                Avanza a tu propio ritmo con lecciones que evolucionan contigo.
              </p>
            </motion.div>

            <motion.div
              variants={slideInFromRight(0.5)}
              className="bg-[#0300145e] p-8 rounded-lg border border-[#7042f88b]"
            >
              <AcademicCapIcon className="w-12 h-12 text-blue-500 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Explicaciones Paso a Paso</h3>
              <p className="text-gray-400">
                Soluciones detalladas para cada problema, con conceptos claros y ejemplos prácticos.
                Aprende no solo el qué, sino también el porqué.
              </p>
            </motion.div>

            <motion.div
              variants={slideInFromLeft(0.7)}
              className="bg-[#0300145e] p-8 rounded-lg border border-[#7042f88b]"
            >
              <PuzzlePieceIcon className="w-12 h-12 text-blue-500 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Ejercicios Personalizados</h3>
              <p className="text-gray-400">
                Practica con problemas diseñados específicamente para tus áreas de mejora.
                Refuerza los conceptos que más necesitas trabajar.
              </p>
            </motion.div>

            <motion.div
              variants={slideInFromRight(0.7)}
              className="bg-[#0300145e] p-8 rounded-lg border border-[#7042f88b]"
            >
              <ChartBarIcon className="w-12 h-12 text-blue-500 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Seguimiento de Progreso</h3>
              <p className="text-gray-400">
                Visualiza tu evolución con estadísticas detalladas y gráficos interactivos.
                Identifica tus fortalezas y áreas de oportunidad.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
}
