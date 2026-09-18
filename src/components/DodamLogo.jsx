import React from 'react';

export const DodamLogo = ({ size = 44, style = {}, useGold = false }) => {
  const [imgError, setImgError] = React.useState(false);

  const imgSrc = useGold ? '/gold_logo.jpg' : '/dodam_mascot.jpg';

  if (!imgError) {
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
          border: '2px solid #10B981',
          flexShrink: 0,
          background: '#0B0F17',
          ...style 
        }}
      >
        <img 
          src={imgSrc} 
          alt="도담 로고" 
          onError={() => setImgError(true)}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
        />
      </div>
    );
  }

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
        <circle cx="50" cy="50" r="50" fill="#10B981" />
        <g transform="translate(0, 3)">
          <path d="M24 26 C15 34 13 54 20 66 C24 74 32 70 30 58 C29 48 27 35 24 26 Z" fill="#854D0E" />
          <path d="M76 26 C85 34 87 54 80 66 C76 74 68 70 70 58 C71 48 73 35 76 26 Z" fill="#854D0E" />
          <path d="M30 40 C30 24 70 24 70 40 C70 60 60 72 50 72 C40 72 30 60 30 40 Z" fill="#FFFFFF" />
          <circle cx="38" cy="42" r="5" fill="#0F172A" />
          <circle cx="36.5" cy="40.2" r="1.8" fill="#FFFFFF" />
          <circle cx="62" cy="42" r="5" fill="#0F172A" />
          <circle cx="60.5" cy="40.2" r="1.8" fill="#FFFFFF" />
          <ellipse cx="50" cy="52" rx="6.5" ry="4.5" fill="#0F172A" />
          <path d="M45 56 Q50 60 55 56" stroke="#0F172A" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M46.5 57 C46.5 65.5 53.5 65.5 53.5 57 Z" fill="#EF4444" />
        </g>
      </svg>
    </div>
  );
};
