"use client";

import React from "react";

const StarBackground = () => {
  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden z-0">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-black" />
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-twinkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent" />
    </div>
  );
};

export default StarBackground;
