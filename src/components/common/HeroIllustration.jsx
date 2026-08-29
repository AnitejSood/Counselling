import React from 'react';

export const HeroIllustration = () => {
  return (
    <div className="relative w-full max-w-lg mx-auto aspect-square flex items-center justify-center p-2">
      
      {/* Background Ambient Glow */}
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 via-indigo-500/20 to-purple-600/20 rounded-full blur-3xl transform scale-95"></div>

      {/* SVG Vector Graphic */}
      <svg
        viewBox="0 0 600 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full relative z-10 drop-shadow-2xl"
      >
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="50%" stopColor="#6366F1" />
            <stop offset="100%" stopColor="#8B5CF6" />
          </linearGradient>

          <linearGradient id="gradGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#D97706" />
          </linearGradient>

          <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="10" stdDeviation="12" floodColor="#0F172A" floodOpacity="0.35" />
          </filter>
        </defs>

        {/* Concentric Rings */}
        <circle cx="300" cy="300" r="220" stroke="url(#grad1)" strokeWidth="2" strokeDasharray="6 6" opacity="0.35" />
        <circle cx="300" cy="300" r="160" stroke="#38BDF8" strokeWidth="1.5" opacity="0.3" />
        <circle cx="300" cy="300" r="100" stroke="#818CF8" strokeWidth="1" strokeDasharray="4 4" opacity="0.4" />

        {/* Central Core */}
        <circle cx="300" cy="300" r="60" fill="url(#grad1)" filter="url(#shadow)" />
        <path
          d="M275 290L300 275L325 290L300 305L275 290ZM275 305L300 320L325 305"
          stroke="#FFFFFF"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Node 1: Discovery (Top Left) */}
        <g transform="translate(130, 140)" filter="url(#shadow)">
          <rect x="-70" y="-30" width="140" height="60" rx="16" fill="#1E293B" stroke="#3B82F6" strokeWidth="2" />
          <circle cx="-45" cy="0" r="14" fill="#3B82F6" />
          <path d="M-49 -4L-41 4M-41 -4L-49 4" stroke="#FFF" strokeWidth="2" strokeLinecap="round" />
          <text x="-22" y="-3" fill="#FFFFFF" fontSize="13" fontWeight="800" fontFamily="sans-serif">Discovery</text>
          <text x="-22" y="14" fill="#94A3B8" fontSize="10" fontWeight="600" fontFamily="sans-serif">Psychometrics</text>
        </g>
        <path d="M185 165 L255 255" stroke="#3B82F6" strokeWidth="2" strokeDasharray="4 4" opacity="0.7" />

        {/* Node 2: Arti Sood (Top Right) */}
        <g transform="translate(470, 140)" filter="url(#shadow)">
          <rect x="-70" y="-30" width="140" height="60" rx="16" fill="#1E293B" stroke="#8B5CF6" strokeWidth="2" />
          <circle cx="-45" cy="0" r="14" fill="#8B5CF6" />
          <path d="M-45 -6A5 5 0 1 0 -45 4A5 5 0 1 0 -45 -6M-52 10C-52 7 -48 6 -45 6C-42 6 -38 7 -38 10" stroke="#FFF" strokeWidth="1.5" fill="none" />
          <text x="-22" y="-3" fill="#FFFFFF" fontSize="13" fontWeight="800" fontFamily="sans-serif">Arti Sood</text>
          <text x="-22" y="14" fill="#A78BFA" fontSize="10" fontWeight="600" fontFamily="sans-serif">1-on-1 Mentor</text>
        </g>
        <path d="M415 165 L345 255" stroke="#8B5CF6" strokeWidth="2" strokeDasharray="4 4" opacity="0.7" />

        {/* Node 3: Shortlist (Bottom Right) */}
        <g transform="translate(470, 460)" filter="url(#shadow)">
          <rect x="-70" y="-30" width="140" height="60" rx="16" fill="#1E293B" stroke="#10B981" strokeWidth="2" />
          <circle cx="-45" cy="0" r="14" fill="#10B981" />
          <path d="M-49 0L-46 3L-41 -3" stroke="#FFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <text x="-22" y="-3" fill="#FFFFFF" fontSize="13" fontWeight="800" fontFamily="sans-serif">Shortlist</text>
          <text x="-22" y="14" fill="#6EE7B7" fontSize="10" fontWeight="600" fontFamily="sans-serif">US/UK/Canada</text>
        </g>
        <path d="M415 435 L345 345" stroke="#10B981" strokeWidth="2" strokeDasharray="4 4" opacity="0.7" />

        {/* Node 4: Admit Offer (Bottom Left) */}
        <g transform="translate(130, 460)" filter="url(#shadow)">
          <rect x="-70" y="-30" width="140" height="60" rx="16" fill="#1E293B" stroke="url(#gradGold)" strokeWidth="2" />
          <circle cx="-45" cy="0" r="14" fill="url(#gradGold)" />
          <path d="M-49 -4L-45 -8L-41 -4M-45 -8V4" stroke="#FFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <text x="-22" y="-3" fill="#FFFFFF" fontSize="13" fontWeight="800" fontFamily="sans-serif">Admit Offer</text>
          <text x="-22" y="14" fill="#FDE047" fontSize="10" fontWeight="600" fontFamily="sans-serif">Scholarships</text>
        </g>
        <path d="M185 435 L255 345" stroke="#F59E0B" strokeWidth="2" strokeDasharray="4 4" opacity="0.7" />

      </svg>
    </div>
  );
};
