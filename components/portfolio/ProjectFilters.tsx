"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ProjectFiltersProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  projectCounts: Record<string, number>;
}

const ProjectFilters = ({ categories, activeCategory, onCategoryChange, projectCounts }: ProjectFiltersProps) => {
  const filterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'All':
        return '🎯';
      case 'AI/ML':
        return '🤖';
      case 'Full-Stack':
        return '🚀';
      case 'Mobile':
        return '📱';
      case 'Enterprise':
        return '🏢';
      default:
        return '⭐';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'AI/ML':
        return 'from-purple-500 to-purple-700';
      case 'Full-Stack':
        return 'from-cyan-500 to-cyan-700';
      case 'Mobile':
        return 'from-green-500 to-green-700';
      case 'Enterprise':
        return 'from-orange-500 to-orange-700';
      default:
        return 'from-gray-500 to-gray-700';
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="flex flex-wrap justify-center gap-3 mb-12"
    >
      {categories.map((category, index) => {
        const isActive = activeCategory === category;
        const count = projectCounts[category] || 0;
        
        return (
          <motion.button
            key={category}
            variants={filterVariants}
            transition={{ delay: index * 0.1 }}
            onClick={() => onCategoryChange(category)}
            className={`relative group px-6 py-3 rounded-full border-2 transition-all duration-300 ${
              isActive
                ? 'border-purple-500 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 text-white'
                : 'border-gray-600 bg-transparent text-gray-300 hover:border-purple-400 hover:text-white'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Background glow */}
            <motion.div
              className={`absolute inset-0 rounded-full bg-gradient-to-r ${getCategoryColor(category)} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}
              animate={{
                opacity: isActive ? 0.3 : 0,
              }}
            />
            
            {/* Content */}
            <div className="relative flex items-center gap-2">
              <motion.span
                className="text-lg"
                animate={{
                  rotate: isActive ? [0, 10, -10, 0] : 0,
                }}
                transition={{
                  duration: 0.5,
                  repeat: isActive ? Infinity : 0,
                  repeatDelay: 2,
                }}
              >
                {getCategoryIcon(category)}
              </motion.span>
              
              <span className="font-medium">{category}</span>
              
              {/* Count badge */}
              <AnimatePresence>
                {count > 0 && (
                  <motion.span
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className={`ml-2 px-2 py-1 text-xs rounded-full ${
                      isActive
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-700 text-gray-300'
                    }`}
                  >
                    {count}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>

            {/* Active indicator */}
            <AnimatePresence>
              {isActive && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-purple-500 rounded-full"
                />
              )}
            </AnimatePresence>

            {/* Particle effects on hover */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(6)].map((_, particleIndex) => (
                <motion.div
                  key={particleIndex}
                  className="absolute w-1 h-1 bg-purple-400 rounded-full opacity-0 group-hover:opacity-100"
                  style={{
                    left: `${20 + particleIndex * 10}%`,
                    top: `${20 + (particleIndex % 2) * 40}%`,
                  }}
                  animate={{
                    y: [-5, -15, -5],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: particleIndex * 0.1,
                  }}
                />
              ))}
            </div>
          </motion.button>
        );
      })}
    </motion.div>
  );
};

export default ProjectFilters;