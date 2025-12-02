import React, { useState, useEffect } from 'react';

const WatchingGhost = () => {
  const [eyePosition, setEyePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Get ghost position (fixed at top-left)
      const ghostX = 100; // approximate center of ghost
      const ghostY = 100;

      // Calculate angle between ghost and cursor
      const deltaX = e.clientX - ghostX;
      const deltaY = e.clientY - ghostY;
      
      // Calculate distance and normalize it
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      const maxMove = 8; // Maximum eye movement in pixels
      
      // Calculate eye position (limited movement)
      const moveX = (deltaX / distance) * Math.min(distance / 50, maxMove);
      const moveY = (deltaY / distance) * Math.min(distance / 50, maxMove);
      
      setEyePosition({ x: moveX, y: moveY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed top-8 left-8 z-50 pointer-events-none">
      <div className="relative w-32 h-32">
        {/* Ghost Body */}
        <svg viewBox="0 0 100 120" className="w-full h-full">
          {/* Ghost shape */}
          <path
            d="M50 20 C30 20, 20 30, 20 50 L20 100 L25 95 L30 100 L35 95 L40 100 L45 95 L50 100 L55 95 L60 100 L65 95 L70 100 L75 95 L80 100 L80 50 C80 30, 70 20, 50 20 Z"
            fill="white"
            stroke="#9333ea"
            strokeWidth="2"
            className="drop-shadow-lg"
          />
          
          {/* Left Eye */}
          <g>
            {/* Eye socket */}
            <ellipse cx="35" cy="45" rx="8" ry="10" fill="#1a1a1a" />
            {/* Eyeball */}
            <circle
              cx={35 + eyePosition.x}
              cy={45 + eyePosition.y}
              r="4"
              fill="#dc2626"
              className="transition-all duration-100"
            />
            {/* Pupil */}
            <circle
              cx={35 + eyePosition.x}
              cy={45 + eyePosition.y}
              r="2"
              fill="black"
              className="transition-all duration-100"
            />
          </g>
          
          {/* Right Eye */}
          <g>
            {/* Eye socket */}
            <ellipse cx="65" cy="45" rx="8" ry="10" fill="#1a1a1a" />
            {/* Eyeball */}
            <circle
              cx={65 + eyePosition.x}
              cy={45 + eyePosition.y}
              r="4"
              fill="#dc2626"
              className="transition-all duration-100"
            />
            {/* Pupil */}
            <circle
              cx={65 + eyePosition.x}
              cy={45 + eyePosition.y}
              r="2"
              fill="black"
              className="transition-all duration-100"
            />
          </g>
          
          {/* Mouth */}
          <path
            d="M 40 65 Q 50 70, 60 65"
            stroke="#1a1a1a"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
        </svg>
        
        {/* Glow effect */}
        <div className="absolute inset-0 bg-purple-500/20 rounded-full blur-xl animate-pulse"></div>
      </div>
    </div>
  );
};

export default WatchingGhost;
