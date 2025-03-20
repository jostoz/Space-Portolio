"use client";
import { motion } from "framer-motion";
import { slideInFromLeft, slideInFromRight, slideInFromTop } from "@/utils/motion";
import { EnvelopeIcon, PhoneIcon, MapPinIcon } from "@heroicons/react/24/outline";

export default function Contact() {
  return (
    <main className="h-full w-full">
      <div className="flex flex-col gap-20">
        <div className="h-[75vh] w-full flex flex-col justify-center items-center px-4">
          <motion.div
            variants={slideInFromTop}
            className="text-center mb-16"
          >
            <h1 className="text-[40px] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 mb-4">
              Contacto
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Estamos aquí para ayudarte. Contáctanos para más información.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto w-full">
            <motion.div
              variants={slideInFromLeft(0.5)}
              className="bg-[#0300145e] p-8 rounded-lg border border-[#7042f88b]"
            >
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <EnvelopeIcon className="w-6 h-6 text-blue-500" />
                  <div>
                    <h3 className="text-white font-medium">Email</h3>
                    <p className="text-gray-400">contacto@fxperto.com</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <PhoneIcon className="w-6 h-6 text-blue-500" />
                  <div>
                    <h3 className="text-white font-medium">Teléfono</h3>
                    <p className="text-gray-400">+34 900 123 456</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <MapPinIcon className="w-6 h-6 text-blue-500" />
                  <div>
                    <h3 className="text-white font-medium">Ubicación</h3>
                    <p className="text-gray-400">Madrid, España</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={slideInFromRight(0.5)}
              className="bg-[#0300145e] p-8 rounded-lg border border-[#7042f88b]"
            >
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-white font-medium mb-2">
                    Nombre
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-2 bg-[#0300145e] border border-[#7042f88b] rounded-lg text-white focus:outline-none focus:border-blue-500"
                    placeholder="Tu nombre"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-white font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-2 bg-[#0300145e] border border-[#7042f88b] rounded-lg text-white focus:outline-none focus:border-blue-500"
                    placeholder="tu@email.com"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-white font-medium mb-2">
                    Mensaje
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full px-4 py-2 bg-[#0300145e] border border-[#7042f88b] rounded-lg text-white focus:outline-none focus:border-blue-500"
                    placeholder="Tu mensaje"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-medium hover:opacity-90 transition-opacity"
                >
                  Enviar Mensaje
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
} 