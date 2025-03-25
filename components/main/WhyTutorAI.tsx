"use client";
import { motion } from "framer-motion";
import { slideInFromLeft, slideInFromRight, slideInFromTop } from "@/utils/motion";
import { 
  ChatBubbleBottomCenterTextIcon,
  DevicePhoneMobileIcon,
  ArrowsRightLeftIcon,
  ClockIcon
} from "@heroicons/react/24/outline";

const WhyTutorAI = () => {
  return (
    <section id="why-tutorai" className="py-20 bg-[#030014]">
      <div className="container mx-auto px-4">
        <motion.div
          variants={slideInFromTop}
          className="text-center mb-16"
        >
          <h2 className="text-[40px] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 mb-4">
            ¿Por qué TutorAI?
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Descubre las ventajas de nuestro tutor inteligente
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <motion.div
            variants={slideInFromLeft(0.5)}
            className="bg-[#0300145e] p-6 rounded-lg border border-[#7042f88b]"
          >
            <ChatBubbleBottomCenterTextIcon className="w-12 h-12 text-blue-500 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Respuestas Empáticas</h3>
            <p className="text-gray-400">
              IA que comprende y responde a tus emociones y necesidades
            </p>
          </motion.div>

          <motion.div
            variants={slideInFromLeft(0.7)}
            className="bg-[#0300145e] p-6 rounded-lg border border-[#7042f88b]"
          >
            <DevicePhoneMobileIcon className="w-12 h-12 text-blue-500 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Multi-canal</h3>
            <p className="text-gray-400">
              Disponible en voz, texto y video según tus preferencias
            </p>
          </motion.div>

          <motion.div
            variants={slideInFromRight(0.7)}
            className="bg-[#0300145e] p-6 rounded-lg border border-[#7042f88b]"
          >
            <ArrowsRightLeftIcon className="w-12 h-12 text-blue-500 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Adaptativo</h3>
            <p className="text-gray-400">
              Ajusta su enseñanza a tu ritmo y estilo de aprendizaje
            </p>
          </motion.div>

          <motion.div
            variants={slideInFromRight(0.5)}
            className="bg-[#0300145e] p-6 rounded-lg border border-[#7042f88b]"
          >
            <ClockIcon className="w-12 h-12 text-blue-500 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Soporte 24/7</h3>
            <p className="text-gray-400">
              Asistencia constante cuando la necesites, día y noche
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhyTutorAI;
