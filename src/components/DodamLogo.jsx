import React from 'react';

export const DodamLogo = ({ size = 44, style = {}, useGold = false }) => {
  const [imgIndex, setImgIndex] = React.useState(0);
  const sources = useGold 
    ? ['/gold_logo.jpg', 'gold_logo.jpg'] 
    : ['로고시안', 'public/dodam_mascot.jpg', 'dodam_mascot.jpg', './dodam_mascot.jpg', '/dodam_mascot.jpg'];

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
        background: '#FFF9F2',
        ...style 
      }}
    >
      {imgIndex < sources.length ? (
        <img 
          src={sources[imgIndex]} 
          alt="도담 로고" 
          onError={() => setImgIndex(prev => prev + 1)}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
        />
      ) : (
        <svg viewBox="0 0 100 100" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="50" fill="#FDF6EC" />
          <circle cx="50" cy="50" r="47" stroke="#10B981" strokeWidth="2.5" fill="none" />
          <path d="M 22 28 C 14 36 12 56 22 66 C 26 70 34 64 30 52 Z" fill="#EAB308" />
          <path d="M 78 28 C 86 36 88 56 78 66 C 74 70 66 64 70 52 Z" fill="#EAB308" />
          <ellipse cx="50" cy="46" rx="26" ry="24" fill="#FDE047" />
          <ellipse cx="50" cy="52" rx="16" ry="12" fill="#FFFFFF" />
          <circle cx="39" cy="42" r="4.5" fill="#1E293B" />
          <circle cx="37.5" cy="40.5" r="1.5" fill="#FFFFFF" />
          <circle cx="61" cy="42" r="4.5" fill="#1E293B" />
          <circle cx="60.5" cy="40.5" r="1.5" fill="#FFFFFF" />
          <ellipse cx="50" cy="49" rx="5" ry="3.5" fill="#1E293B" />
          <path d="M 45 53 Q 50 57 55 53" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" />
          <path d="M 46.5 54.5 C 46.5 62 53.5 62 53.5 54.5 Z" fill="#F43F5E" />
          <path d="M 28 66 Q 50 82 72 66 Q 50 94 28 66 Z" fill="#16A34A" />
          <path d="M 50 72 Q 54 75 52 80 Q 47 78 50 72 Z" fill="#FFFFFF" />
        </svg>
      )}
    </div>
  );
};
