"use client";
import { motion } from "framer-motion";
import { slideInFromLeft, slideInFromRight, slideInFromTop } from "@/utils/motion";
import { ChartBarIcon, ShieldCheckIcon, UserGroupIcon, CurrencyDollarIcon } from "@heroicons/react/24/outline";

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
              Características Principales
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Descubre las herramientas que te ayudarán a optimizar tus operaciones cambiarias
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <motion.div
              variants={slideInFromLeft(0.5)}
              className="bg-[#0300145e] p-8 rounded-lg border border-[#7042f88b]"
            >
              <ChartBarIcon className="w-12 h-12 text-blue-500 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Análisis en Tiempo Real</h3>
              <p className="text-gray-400">
                Monitorea los mercados de divisas con datos actualizados al instante y análisis técnico avanzado.
                Toma decisiones informadas basadas en datos precisos y tendencias del mercado.
              </p>
            </motion.div>

            <motion.div
              variants={slideInFromRight(0.5)}
              className="bg-[#0300145e] p-8 rounded-lg border border-[#7042f88b]"
            >
              <ShieldCheckIcon className="w-12 h-12 text-blue-500 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Gestión de Riesgos</h3>
              <p className="text-gray-400">
                Protege tus operaciones con nuestro sistema avanzado de gestión de riesgos.
                Establece límites, alertas y estrategias de cobertura personalizadas.
              </p>
            </motion.div>

            <motion.div
              variants={slideInFromLeft(0.7)}
              className="bg-[#0300145e] p-8 rounded-lg border border-[#7042f88b]"
            >
              <UserGroupIcon className="w-12 h-12 text-blue-500 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Asesoría Especializada</h3>
              <p className="text-gray-400">
                Accede a un equipo de expertos en mercados financieros disponible 24/7.
                Recibe orientación personalizada para optimizar tus estrategias.
              </p>
            </motion.div>

            <motion.div
              variants={slideInFromRight(0.7)}
              className="bg-[#0300145e] p-8 rounded-lg border border-[#7042f88b]"
            >
              <CurrencyDollarIcon className="w-12 h-12 text-blue-500 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Reportes Detallados</h3>
              <p className="text-gray-400">
                Genera informes personalizados con métricas clave y análisis de rendimiento.
                Visualiza el impacto de tus decisiones con gráficos interactivos.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
} 