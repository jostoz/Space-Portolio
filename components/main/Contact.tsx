"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { slideInFromLeft, slideInFromRight, slideInFromTop } from "@/utils/motion";
import { EnvelopeIcon, PhoneIcon, MapPinIcon } from "@heroicons/react/24/outline";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica para enviar el formulario
    console.log(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="py-20 bg-[#030014]">
      <div className="container mx-auto px-4">
        <motion.div
          variants={slideInFromTop}
          className="text-center mb-16"
        >
          <h2 className="text-[40px] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 mb-4">
            Contacto
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Estamos aquí para ayudarte a optimizar tu gestión de divisas
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            variants={slideInFromLeft(0.5)}
            className="bg-[#0300145e] p-8 rounded-lg border border-[#7042f88b]"
          >
            <h3 className="text-2xl font-bold text-white mb-6">
              Información de Contacto
            </h3>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <EnvelopeIcon className="w-6 h-6 text-blue-500 mt-1" />
                <div>
                  <h4 className="text-white font-semibold">Email</h4>
                  <p className="text-gray-400">contacto@fxperto.com</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <PhoneIcon className="w-6 h-6 text-blue-500 mt-1" />
                <div>
                  <h4 className="text-white font-semibold">Teléfono</h4>
                  <p className="text-gray-400">+34 900 123 456</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <MapPinIcon className="w-6 h-6 text-blue-500 mt-1" />
                <div>
                  <h4 className="text-white font-semibold">Ubicación</h4>
                  <p className="text-gray-400">Madrid, España</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={slideInFromRight(0.5)}
            className="bg-[#0300145e] p-8 rounded-lg border border-[#7042f88b]"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-white mb-2">
                  Nombre
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-[#030014] border border-[#7042f88b] rounded-lg text-white focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-white mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-[#030014] border border-[#7042f88b] rounded-lg text-white focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="company" className="block text-white mb-2">
                  Empresa
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-[#030014] border border-[#7042f88b] rounded-lg text-white focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-white mb-2">
                  Teléfono
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-[#030014] border border-[#7042f88b] rounded-lg text-white focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-white mb-2">
                  Mensaje
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-2 bg-[#030014] border border-[#7042f88b] rounded-lg text-white focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 px-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
              >
                Enviar Mensaje
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact; 