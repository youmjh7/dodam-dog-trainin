import React from 'react';

export const DodamLogo = ({ size = 44, style = {} }) => {
  return (
    <div 
      style={{ 
        width: `${size}px`, 
        height: `${size}px`, 
        borderRadius: '50%', 
        overflow: 'hidden', 
        display: 'inline-flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        boxShadow: '0 0 25px rgba(16, 185, 129, 0.45)',
        flexShrink: 0,
        ...style 
      }}
    >
      <svg 
        viewBox="0 0 100 100" 
        width="100%" 
        height="100%" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background Circle */}
        <circle cx="50" cy="50" r="50" fill="#10B981" />

        <g transform="translate(0, 2)">
          {/* Brown Ears */}
          <path 
            d="M22 28 C14 36, 12 55, 20 68 C25 76, 32 72, 30 58 C29 48, 28 35, 22 28 Z" 
            fill="#78350F" 
          />
          <path 
            d="M78 28 C86 36, 88 55, 80 68 C75 76, 68 72, 70 58 C71 48, 72 35, 78 28 Z" 
            fill="#78350F" 
          />

          {/* White Head & Muzzle */}
          <path 
            d="M28 42 C28 24, 72 24, 72 42 C72 65, 60 74, 50 74 C40 74, 28 65, 28 42 Z" 
            fill="#FFFFFF" 
          />

          {/* Eyes */}
          <circle cx="39" cy="42" r="4.5" fill="#0F172A" />
          <circle cx="37.5" cy="40.5" r="1.5" fill="#FFFFFF" />
          
          <circle cx="61" cy="42" r="4.5" fill="#0F172A" />
          <circle cx="59.5" cy="40.5" r="1.5" fill="#FFFFFF" />

          {/* Black Nose */}
          <ellipse cx="50" cy="52" rx="6" ry="4.5" fill="#0F172A" />

          {/* Mouth & Cute Red Tongue */}
          <path d="M46 56 Q50 60 54 56" stroke="#0F172A" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M47 58 C47 66, 53 66, 53 58 Z" fill="#EF4444" />
        </g>
      </svg>
    </div>
  );
};
