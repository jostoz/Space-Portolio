"use client";
import React from "react";
import { motion } from "framer-motion";
import { slideInFromLeft, slideInFromRight, slideInFromTop } from "@/utils/motion";

const ProfessionalHighlights = () => {
  const highlights = [
    {
      title: "Senior AI Architect",
      company: "Fxperto/Educare Tech",
      description: "Leading AI education platform development with cutting-edge technology",
      icon: "🏢"
    },
    {
      title: "Cost & Efficiency Expert",
      metrics: "40% cost reduction & 60% efficiency improvement",
      description: "Consistently delivering measurable impact across implementations",
      icon: "📈"
    },
    {
      title: "National Scale Systems",
      metrics: "100M+ phone numbers",
      description: "Built telecommunications system serving entire national infrastructure",
      icon: "📱"
    },
    {
      title: "Healthcare AI Success",
      metrics: "92% user satisfaction",
      description: "HIPAA-compliant AI applications with exceptional user experience",
      icon: "🧠"
    },
    {
      title: "Kaggle Competition Expert",
      metrics: "Top 15% globally",
      description: "Proven expertise in competitive machine learning challenges",
      icon: "🏆"
    },
    {
      title: "Production Scale Impact",
      metrics: "1M+ daily transactions",
      description: "Systems processing massive volumes with reliability and performance",
      icon: "⚡"
    }
  ];

  return (
    <section id="highlights" className="py-20 bg-[#030014]">
      <div className="container mx-auto px-4">
        <motion.div
          variants={slideInFromTop}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center justify-center mb-16"
        >
          <h1 className="text-[40px] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 py-10">
            Professional Highlights
          </h1>
          <p className="text-gray-400 text-center max-w-3xl">
            10+ years of proven excellence in AI engineering and machine learning, 
            delivering transformative solutions across industries
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {highlights.map((highlight, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-[#0F0F0F] border border-[#2A0E61] rounded-lg p-6 hover:border-[#7042f88b] transition-all duration-300 hover:scale-105"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">{highlight.icon}</span>
                <div>
                  <h3 className="text-xl font-bold text-white">{highlight.title}</h3>
                  {highlight.company && (
                    <p className="text-purple-400 text-sm font-medium">{highlight.company}</p>
                  )}
                  {highlight.metrics && (
                    <p className="text-cyan-400 text-sm font-bold">{highlight.metrics}</p>
                  )}
                </div>
              </div>
              <p className="text-gray-400 text-sm">{highlight.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          variants={slideInFromLeft(0.5)}
          initial="hidden"
          animate="visible"
          className="mt-16 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 border border-[#7042f88b] rounded-lg p-8"
        >
          <h2 className="text-2xl font-bold text-white mb-4">Current Focus Areas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start gap-3">
              <span className="text-purple-500 text-xl">🔮</span>
              <div>
                <h4 className="text-white font-semibold">Advanced LangGraph Workflows</h4>
                <p className="text-gray-400 text-sm">Agent orchestration and intelligent workflow automation</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-cyan-500 text-xl">🎤</span>
              <div>
                <h4 className="text-white font-semibold">Ultra-low Latency Voice AI</h4>
                <p className="text-gray-400 text-sm">Real-time conversational systems with sub-50ms response</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-green-500 text-xl">🧩</span>
              <div>
                <h4 className="text-white font-semibold">Pydantic v2 Data Validation</h4>
                <p className="text-gray-400 text-sm">Robust schema design for enterprise applications</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-yellow-500 text-xl">🎓</span>
              <div>
                <h4 className="text-white font-semibold">AI-Powered EdTech</h4>
                <p className="text-gray-400 text-sm">Educational technology and personalized learning systems</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProfessionalHighlights;