import React from 'react';
import { Link } from 'react-router-dom';

/**
 * MatchEdLogo Component
 * Accurately renders the official matchEd brand mark:
 * - Geometric sans wordmark "matchEd"
 * - Deep midnight navy text (#0B2545)
 * - Warm honey gold underline bar (#CFA25E)
 */
export const MatchEdLogo = ({ 
  size = 'md', 
  theme = 'dark', // 'dark' (navy on light) | 'light' (white on dark)
  showLink = true,
  className = ''
}) => {
  const sizeClasses = {
    sm: { text: 'text-xl tracking-tight', bar: 'h-1 w-7 -mt-0.5' },
    md: { text: 'text-2xl tracking-tight', bar: 'h-1.5 w-9 -mt-0.5' },
    lg: { text: 'text-3xl tracking-tight', bar: 'h-2 w-12 -mt-1' },
    xl: { text: 'text-4xl tracking-tight', bar: 'h-2.5 w-16 -mt-1' }
  };

  const currentSize = sizeClasses[size] || sizeClasses.md;
  const textColor = theme === 'light' ? 'text-white' : 'text-[#0B2545]';

  const logoContent = (
    <div className={`inline-flex flex-col items-center select-none font-sans group ${className}`}>
      <div className={`font-black ${currentSize.text} ${textColor} leading-none transition-transform group-hover:scale-[1.02]`}>
        <span>match</span>
        <span className="text-[#0B2545] dark:text-white" style={{ color: theme === 'light' ? '#FFFFFF' : '#0B2545' }}>Ed</span>
      </div>
      {/* Warm Golden / Honey Accent Bar */}
      <div 
        className={`${currentSize.bar} rounded-full transition-all duration-300 group-hover:w-full group-hover:opacity-90`}
        style={{ backgroundColor: '#CFA25E' }}
      />
    </div>
  );

  if (showLink) {
    return (
      <Link to="/" className="inline-flex items-center focus:outline-none">
        {logoContent}
      </Link>
    );
  }

  return logoContent;
};

export default MatchEdLogo;
