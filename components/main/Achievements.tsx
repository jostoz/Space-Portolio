"use client";
import React from "react";
import { motion } from "framer-motion";
import { slideInFromLeft, slideInFromRight, slideInFromTop } from "@/utils/motion";

const Achievements = () => {
  const achievements = [
    {
      title: "Google Cloud ML Engineer",
      type: "Certification",
      description: "Certified in Google Cloud Machine Learning Engineering",
      icon: "🥇",
      color: "from-yellow-500 to-orange-500"
    },
    {
      title: "Kaggle Competition Expert",
      type: "Achievement",
      description: "Top 15% globally in competitive machine learning challenges",
      icon: "🏆",
      color: "from-purple-500 to-pink-500"
    },
    {
      title: "Government Contracts",
      type: "Business Impact",
      description: "Successfully secured and delivered national-scale government projects",
      icon: "🏛️",
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "100M+ Data Points",
      type: "Scale Achievement",
      description: "Built and maintained systems processing massive datasets",
      icon: "📊",
      color: "from-green-500 to-teal-500"
    },
    {
      title: "AI Hackathon Participant",
      type: "Community",
      description: "Active participant in AI hackathons at lablab.ai",
      icon: "⚡",
      color: "from-red-500 to-pink-500"
    },
    {
      title: "Pre-ChatGPT Innovation",
      type: "Pioneer",
      description: "Built conversational commerce system before ChatGPT era",
      icon: "🚀",
      color: "from-indigo-500 to-purple-500"
    }
  ];

  const stats = [
    { number: "10+", label: "Years Experience", icon: "📅" },
    { number: "40%", label: "Cost Reduction", icon: "💰" },
    { number: "60%", label: "Efficiency Gain", icon: "⚡" },
    { number: "92%", label: "User Satisfaction", icon: "😊" },
    { number: "1M+", label: "Daily Transactions", icon: "🔄" },
    { number: "100M+", label: "Data Points", icon: "📈" }
  ];

  return (
    <section id="achievements" className="py-20 bg-[#030014]">
      <div className="container mx-auto px-4">
        <motion.div
          variants={slideInFromTop}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center justify-center mb-16"
        >
          <h1 className="text-[40px] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 py-10">
            Achievements & Impact
          </h1>
          <p className="text-gray-400 text-center max-w-3xl">
            Certifications, recognitions, and measurable impact across projects and organizations
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          variants={slideInFromLeft(0.3)}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-16"
        >
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-[#0F0F0F] border border-[#2A0E61] rounded-lg p-4 text-center hover:border-[#7042f88b] transition-all duration-300"
            >
              <div className="text-2xl mb-2">{stat.icon}</div>
              <div className="text-2xl font-bold text-white mb-1">{stat.number}</div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {achievements.map((achievement, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-[#0F0F0F] border border-[#2A0E61] rounded-lg p-6 hover:border-[#7042f88b] transition-all duration-300 hover:scale-105"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${achievement.color} flex items-center justify-center text-2xl`}>
                  {achievement.icon}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">{achievement.title}</h3>
                  <p className="text-sm text-purple-400">{achievement.type}</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm">{achievement.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Fun Fact Section */}
        <motion.div
          variants={slideInFromRight(0.5)}
          initial="hidden"
          animate="visible"
          className="mt-16 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 border border-[#7042f88b] rounded-lg p-8 text-center"
        >
          <h2 className="text-2xl font-bold text-white mb-4">⚡ Fun Fact</h2>
          <p className="text-gray-300 text-lg">
            I built a pre-ChatGPT conversational commerce system that processed 1000+ daily orders!
          </p>
        </motion.div>

        {/* Open to Collaborate */}
        <motion.div
          variants={slideInFromLeft(0.5)}
          initial="hidden"
          animate="visible"
          className="mt-8 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-[#7042f88b] rounded-lg p-8 text-center"
        >
          <h2 className="text-2xl font-bold text-white mb-4">💭 Open to Collaborate On</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <span className="bg-[#2A0E61] text-gray-300 px-4 py-2 rounded-full text-sm">AI/ML Projects</span>
            <span className="bg-[#2A0E61] text-gray-300 px-4 py-2 rounded-full text-sm">Voice AI Applications</span>
            <span className="bg-[#2A0E61] text-gray-300 px-4 py-2 rounded-full text-sm">Educational Technology</span>
            <span className="bg-[#2A0E61] text-gray-300 px-4 py-2 rounded-full text-sm">Innovative Startups</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Achievements;