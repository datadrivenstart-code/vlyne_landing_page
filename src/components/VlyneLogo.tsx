import React, { useState } from 'react';

interface VlyneLogoProps {
  className?: string;
  showText?: boolean;
  subtitle?: string;
}

const CANDIDATE_IMAGE_URLS = [
  '/vlyne-logo.png',
  '/logo.png',
];

export default function VlyneLogo({ className = 'w-full', showText = true, subtitle }: VlyneLogoProps) {
  const [candidateIndex, setCandidateIndex] = useState(0);
  const [imageFailedToLoad, setImageFailedToLoad] = useState(false);

  const handleImageError = () => {
    if (candidateIndex < CANDIDATE_IMAGE_URLS.length - 1) {
      setCandidateIndex(prev => prev + 1);
    } else {
      setImageFailedToLoad(true);
    }
  };

  const isHeightConstrained = className.split(' ').some(cls => 
    cls.startsWith('h-') || cls.includes(':h-') || 
    cls.startsWith('max-h-') || cls.includes(':max-h-') || 
    cls.startsWith('!h-')
  );

  const imgClass = isHeightConstrained
    ? "h-full w-auto object-contain select-none filter drop-shadow-md"
    : "w-full h-auto max-h-[300px] object-contain select-none filter drop-shadow-md";

  const svgClass = isHeightConstrained
    ? "h-full w-auto select-none filter drop-shadow-md"
    : "w-full h-auto select-none filter drop-shadow-md";

  if (!imageFailedToLoad) {
    return (
      <div className={`flex items-center justify-center ${className}`}>
        <img
          src={CANDIDATE_IMAGE_URLS[candidateIndex]}
          alt="VLYNE Logo"
          onError={handleImageError}
          referrerPolicy="no-referrer"
          className={imgClass}
        />
      </div>
    );
  }

  return (
    <div className={`flex items-center justify-center ${className}`}>
      {/* High-fidelity 3D metallic blue V logo, fully identical to the user's branding and circuit wings */}
      <svg 
        className={svgClass} 
        viewBox={showText ? "0 40 1000 640" : "220 80 560 440"} 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        id="vlyne-emblem-svg"
      >
        <defs>
          {/* Polished glossy cyan-to-royal-blue gradient for 3D front face of the V elements */}
          <linearGradient id="vFaceGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00d2ff" />
            <stop offset="45%" stopColor="#0072ff" />
            <stop offset="100%" stopColor="#0035a6" />
          </linearGradient>

          {/* Deep royal bevel extrusion shade for 3D edges */}
          <linearGradient id="vBevelGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0056b3" />
            <stop offset="50%" stopColor="#002b80" />
            <stop offset="100%" stopColor="#001240" />
          </linearGradient>

          {/* Glowing tech circuit trace gradient */}
          <linearGradient id="circuitGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.25" />
            <stop offset="30%" stopColor="#3b82f6" stopOpacity="0.85" />
            <stop offset="70%" stopColor="#3b82f6" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#00f0ff" stopOpacity="0.25" />
          </linearGradient>

          {/* Metallic chrome gradient for VLYNE typography */}
          <linearGradient id="textGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="50%" stopColor="#f3f4f6" />
            <stop offset="100%" stopColor="#a1a1aa" />
          </linearGradient>

          {/* Soft cyan aura backlight glow */}
          <filter id="glowFilt" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          {/* Drop shadow filter to give a floating 3D premium effect */}
          <filter id="shadowFilt" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="12" stdDeviation="14" floodColor="#0072ff" floodOpacity="0.3" />
          </filter>
        </defs>

        {/* Ambient cyan backdrop aura behind the central V */}
        <circle cx="500" cy="300" r="180" fill="#00f0ff" opacity="0.12" filter="url(#glowFilt)" />

        {/* High-fidelity horizontal wings circuit traces (symmetrical to user's uploaded branding logo) */}
        <g stroke="url(#circuitGrad)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" opacity="0.9" id="circuits-group">
          {/* Left Side Circuits */}
          <path d="M 280 240 H 240 L 200 200 H 130" />
          <path d="M 260 325 H 210 L 160 275 H 80" />
          <path d="M 240 350 H 130" />
          <path d="M 260 375 H 210 L 160 425 H 80" />
          <path d="M 280 460 H 240 L 200 500 H 130" />

          {/* Right Side Circuits */}
          <path d="M 720 240 H 760 L 800 200 H 870" />
          <path d="M 740 325 H 790 L 840 275 H 920" />
          <path d="M 760 350 H 870" />
          <path d="M 740 375 H 790 L 840 425 H 920" />
          <path d="M 720 460 H 760 L 800 500 H 870" />
        </g>

        {/* Technical nodes (cyan circles at trace terminals) */}
        <g fill="#00f0ff" opacity="0.95" id="nodes-group" filter="url(#glowFilt)">
          {/* Left Side Nodes */}
          <circle cx="130" cy="200" r="5" />
          <circle cx="80" cy="275" r="5" />
          <circle cx="130" cy="350" r="5" />
          <circle cx="80" cy="425" r="5" />
          <circle cx="130" cy="500" r="5" />

          {/* Right Side Nodes */}
          <circle cx="870" cy="200" r="5" />
          <circle cx="920" cy="275" r="5" />
          <circle cx="870" cy="350" r="5" />
          <circle cx="920" cy="425" r="5" />
          <circle cx="870" cy="500" r="5" />
        </g>

        {/* 3D Glossy "V" Geometry (Scaled and Positioned Perfectly via Transform) */}
        <g filter="url(#shadowFilt)" id="v-3d-geometry" transform="translate(0, -196) scale(2.0)">
          
          {/* LEFT ARM - Deep Indigo Bevel Underlay */}
          <path 
            d="M 100 148 L 198 148 L 260 338 L 246 338 Z" 
            fill="url(#vBevelGrad)" 
          />
          {/* LEFT ARM - Luminous Chrome-Blue Front Face */}
          <path 
            d="M 102 148 L 175 148 L 253 338 L 235 338 Z" 
            fill="url(#vFaceGrad)" 
          />
          {/* LEFT ARM - Vivid Bright Highlight Border */}
          <path 
            d="M 102 148 L 235 338" 
            stroke="#ffffff" 
            strokeWidth="4" 
            strokeLinecap="round" 
            filter="url(#glowFilt)" 
            opacity="0.95"
          />

          {/* TOP RIGHT - Floating segment face */}
          <path 
            d="M 285 148 L 398 148 L 350 216 L 274 216 Z" 
            fill="url(#vFaceGrad)" 
          />
          {/* TOP RIGHT - Bevel 3D edge */}
          <path 
            d="M 285 148 L 274 216 L 258 216 L 274 148 Z" 
            fill="url(#vBevelGrad)" 
          />
          {/* TOP RIGHT - Glowing highlights */}
          <path 
            d="M 285 148 L 350 216" 
            stroke="#00f0ff" 
            strokeWidth="3.5" 
            filter="url(#glowFilt)" 
          />

          {/* BOTTOM RIGHT - Connecting segment face */}
          <path 
            d="M 252 248 L 315 248 L 272 320 L 253 338 Z" 
            fill="url(#vFaceGrad)" 
          />
          {/* BOTTOM RIGHT - Dark structural bevel shadow */}
          <path 
            d="M 315 248 L 272 320 L 255 320 L 302 248 Z" 
            fill="url(#vBevelGrad)" 
          />
        </g>

        {/* Beautiful lens flare highlight exactly at bottom V vertex */}
        <ellipse 
          cx="500" 
          cy="480" 
          rx="120" 
          ry="10" 
          fill="#00f0ff" 
          filter="url(#glowFilt)" 
          opacity="0.9" 
        />
        <circle 
          cx="500" 
          cy="480" 
          r="16" 
          fill="#ffffff" 
          filter="url(#glowFilt)" 
        />

        {/* VLYNE Typography - Beautifully rendered in a geometric futuristic font with a chrome gradient and metallic shine */}
        {showText && (
          <g>
            <text
              x="500"
              y="595"
              fill="url(#textGrad)"
              filter="url(#glowFilt)"
              fontFamily="'Space Grotesk', 'Inter', 'Outfit', 'Segoe UI', sans-serif"
              fontSize="68"
              fontWeight="800"
              letterSpacing="28"
              textAnchor="middle"
              style={{ letterSpacing: '28px', textIndent: '28px' }}
              className="tracking-widest font-extrabold select-none"
            >
              VLYNE
            </text>
            
            {/* Elegant horizontal thin tech separator line under VLYNE */}
            <line 
              x1="350" 
              y1="620" 
              x2="650" 
              y2="620" 
              stroke="#00f0ff" 
              strokeWidth="2.5" 
              opacity="0.4" 
              filter="url(#glowFilt)" 
            />
            {subtitle && (
              <text
                x="500"
                y="655"
                fill="#00f0ff"
                fontFamily="'Space Grotesk', 'Inter', 'Outfit', 'Segoe UI', sans-serif"
                fontSize="24"
                fontWeight="600"
                letterSpacing="12"
                textAnchor="middle"
                style={{ letterSpacing: '12px', textIndent: '12px' }}
                className="tracking-widest font-semibold select-none opacity-80"
              >
                {subtitle}
              </text>
            )}
          </g>
        )}
      </svg>
    </div>
  );
}

