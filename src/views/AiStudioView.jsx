import React, { useState, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { Sparkles, Download, RefreshCw, Zap, Crown, Image as ImageIcon, CheckCircle, Wand2 } from 'lucide-react';

export const AiStudioView = () => {
  const { activePet, user, addAiStudioPhoto, aiStudioPhotos, openPaymentModal } = useApp();

  const [selectedTheme, setSelectedTheme] = useState('superhero');
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentResult, setCurrentResult] = useState(null);
  const canvasRef = useRef(null);

  const themes = [
    {
      id: 'superhero',
      name: '🦸‍♂️ 히어로 멍',
      badge: 'POPULAR',
      bgGradient: ['#FF6B00', '#111827'],
      overlayColor: 'rgba(255, 107, 0, 0.25)',
      description: '빛나는 아우라와 슈퍼 히어로 수트를 입은 당당한 포즈'
    },
    {
      id: 'royal',
      name: '👑 명화 속 귀족 멍',
      badge: 'LUXURY',
      bgGradient: ['#F59E0B', '#1E1B4B'],
      overlayColor: 'rgba(245, 158, 11, 0.25)',
      description: '19세기 벨벳 왕관과 클래식 초상화 액자 스타일'
    },
    {
      id: 'cyberpunk',
      name: '🕶️ 사이버펑크 탐정',
      badge: 'NEW',
      bgGradient: ['#8B5CF6', '#06B6D4'],
      overlayColor: 'rgba(139, 92, 246, 0.25)',
      description: '네온 시티 조명과 미래형 바이저를 착용한 사이버 댕댕이'
    },
    {
      id: 'watercolor',
      name: '🎨 수채화 아티스트',
      badge: 'ART',
      bgGradient: ['#EC4899', '#3B82F6'],
      overlayColor: 'rgba(236, 72, 153, 0.25)',
      description: '파스텔 톤 붓터치와 부드러운 꽃밭 수채화 일러스트'
    },
    {
      id: 'cartoon',
      name: '🧸 3D 애니 마스코트',
      badge: 'CUTE',
      bgGradient: ['#10B981', '#3B82F6'],
      overlayColor: 'rgba(16, 185, 129, 0.25)',
      description: '픽사 스타일의 동글동글 입체 3D 마스코트 캐릭터'
    }
  ];

  const handleGenerate = () => {
    if (user.aiCredits <= 0 && !user.pawPassActive) {
      openPaymentModal({
        title: 'AI 스튜디오 10회 크레딧 패스',
        amount: 3000,
        itemType: 'ai_credits',
        payload: { credits: 10 }
      });
      return;
    }

    setIsGenerating(true);

    setTimeout(() => {
      // Draw dynamic styled Pet Avatar Card on Canvas
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        const themeObj = themes.find((t) => t.id === selectedTheme);

        canvas.width = 600;
        canvas.height = 700;

        // Background Gradient
        const grad = ctx.createLinearGradient(0, 0, 600, 700);
        grad.addColorStop(0, themeObj.bgGradient[0]);
        grad.addColorStop(1, themeObj.bgGradient[1]);
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 600, 700);

        // Decorative Circles
        ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
        ctx.beginPath();
        ctx.arc(300, 260, 200, 0, Math.PI * 2);
        ctx.fill();

        // Draw Dog Photo Placeholder / Base
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.src = activePet.image;
        img.onload = () => {
          ctx.save();
          ctx.beginPath();
          ctx.arc(300, 260, 160, 0, Math.PI * 2);
          ctx.clip();
          ctx.drawImage(img, 140, 100, 320, 320);
          ctx.restore();

          // Border Ring
          ctx.strokeStyle = '#FFFFFF';
          ctx.lineWidth = 6;
          ctx.beginPath();
          ctx.arc(300, 260, 162, 0, Math.PI * 2);
          ctx.stroke();

          // Overlay Theme Style Text
          ctx.fillStyle = '#FFFFFF';
          ctx.font = 'bold 28px Outfit, Pretendard, sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText(`✨ ${themeObj.name} ✨`, 300, 480);

          ctx.font = 'bold 36px Pretendard, sans-serif';
          ctx.fillText(activePet.name, 300, 530);

          ctx.font = '18px Pretendard, sans-serif';
          ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
          ctx.fillText(`${activePet.breed} · PawCoach AI Studio`, 300, 565);

          // Card Footer Badge
          ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
          ctx.fillRect(50, 610, 500, 50);
          ctx.fillStyle = '#FF8800';
          ctx.font = 'bold 16px Pretendard, sans-serif';
          ctx.fillText('🐾 PawCoach Certified AI Pet Avatar', 300, 642);

          const dataUrl = canvas.toDataURL('image/png');
          const photoRecord = {
            id: `ai-photo-${Date.now()}`,
            themeName: themeObj.name,
            petName: activePet.name,
            imageUrl: dataUrl,
            createdAt: new Date().toLocaleDateString('ko-KR')
          };

          setCurrentResult(photoRecord);
          addAiStudioPhoto(photoRecord);
          setIsGenerating(false);
        };
      }
    }, 1200);
  };

  const handleDownload = (dataUrl) => {
    const link = document.createElement('a');
    link.download = `${activePet.name}_AI_${selectedTheme}_card.png`;
    link.href = dataUrl;
    link.click();
  };

  return (
    <div className="ai-studio-view container">
      {/* View Header */}
      <div className="studio-header">
        <div className="badge badge-purple">
          <Wand2 size={14} /> AI 펫 아티스트 스튜디오
        </div>
        <h2>{activePet.name}의 AI 테마 프로필 만들기</h2>
        <p>사진 1장으로 만나는 5가지 고품질 AI 테마 카드 스튜디오</p>

        <div className="credits-status-bar">
          <span>
             보유 크레딧: <strong>{user.pawPassActive ? '무제한 (PawPass VIP)' : `${user.aiCredits}회`}</strong>
          </span>
          {!user.pawPassActive && (
            <button
              className="btn btn-secondary btn-sm"
              onClick={() =>
                openPaymentModal({
                  title: 'AI 스튜디오 10회 크레딧 패스',
                  amount: 3000,
                  itemType: 'ai_credits',
                  payload: { credits: 10 }
                })
              }
            >
              + 크레딧 충전 (3,000원)
            </button>
          )}
        </div>
      </div>

      <div className="studio-layout">
        {/* Left: Theme Selection Grid */}
        <div className="theme-selector-panel">
          <h3>1. AI 스타일 테마 선택</h3>
          <div className="themes-grid">
            {themes.map((t) => {
              const isSelected = selectedTheme === t.id;
              return (
                <div
                  key={t.id}
                  className={`theme-card glass-card ${isSelected ? 'active' : ''}`}
                  onClick={() => setSelectedTheme(t.id)}
                >
                  <div className="theme-top">
                    <span className="t-name">{t.name}</span>
                    <span className="badge badge-orange">{t.badge}</span>
                  </div>
                  <p className="t-desc">{t.description}</p>
                </div>
              );
            })}
          </div>

          <button
            className="btn btn-accent btn-lg btn-full generate-btn"
            onClick={handleGenerate}
            disabled={isGenerating}
          >
            {isGenerating ? (
              <>
                <RefreshCw size={20} className="spin-icon" /> AI 스타일 변환 중...
              </>
            ) : (
              <>
                <Sparkles size={20} /> AI 테마 카드로 변환하기 (1 크레딧)
              </>
            )}
          </button>
        </div>

        {/* Right: Real-time Canvas & Output Preview */}
        <div className="preview-panel glass-card">
          <h3>2. AI 생성 결과 카드</h3>

          {/* Hidden Canvas for Generation */}
          <canvas ref={canvasRef} style={{ display: 'none' }} />

          {currentResult ? (
            <div className="result-display">
              <img src={currentResult.imageUrl} alt="AI Result" className="result-card-img" />
              <div className="result-actions">
                <button
                  className="btn btn-primary btn-full"
                  onClick={() => handleDownload(currentResult.imageUrl)}
                >
                  <Download size={18} /> HD 고화질 아바타 카드 다운로드
                </button>
              </div>
            </div>
          ) : (
            <div className="placeholder-display">
              <div className="pet-preview-ring">
                <img src={activePet.image} alt={activePet.name} className="preview-base-img" />
              </div>
              <p className="preview-tip">
                좌측에서 스타일 테마를 선택한 후<br />
                <strong>[AI 테마 카드로 변환하기]</strong> 버튼을 눌러주세요!
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Gallery Section */}
      {aiStudioPhotos.length > 0 && (
        <section className="gallery-section">
          <h3>📸 나의 AI 생성이미지 갤러리 ({aiStudioPhotos.length})</h3>
          <div className="gallery-grid">
            {aiStudioPhotos.map((photo) => (
              <div key={photo.id} className="gallery-item glass-card">
                <img src={photo.imageUrl} alt="Saved AI Card" className="gallery-img" />
                <div className="gallery-info">
                  <span className="g-theme">{photo.themeName}</span>
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => handleDownload(photo.imageUrl)}
                  >
                    <Download size={14} /> 저장
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <style jsx>{`
        .ai-studio-view {
          padding-top: 30px;
          padding-bottom: 60px;
        }

        .studio-header {
          text-align: center;
          margin-bottom: 30px;
        }

        .studio-header h2 {
          font-size: 2rem;
          color: #FFFFFF;
          margin: 8px 0;
        }

        .studio-header p {
          color: var(--text-muted);
          margin-bottom: 16px;
        }

        .credits-status-bar {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid var(--border-color);
          padding: 8px 18px;
          border-radius: var(--radius-full);
          font-size: 0.9rem;
          color: #FFFFFF;
        }

        .studio-layout {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
          margin-bottom: 40px;
        }

        @media (max-width: 860px) {
          .studio-layout {
            grid-template-columns: 1fr;
          }
        }

        .theme-selector-panel h3, .preview-panel h3 {
          font-size: 1.15rem;
          color: #FFFFFF;
          margin-bottom: 16px;
        }

        .themes-grid {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 20px;
        }

        .theme-card {
          padding: 16px;
          cursor: pointer;
          border: 1px solid var(--border-color);
          transition: all var(--transition-fast);
        }

        .theme-card.active {
          border-color: var(--accent-purple);
          background: rgba(139, 92, 246, 0.12);
        }

        .theme-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 4px;
        }

        .t-name {
          font-size: 1rem;
          font-weight: 700;
          color: #FFFFFF;
        }

        .t-desc {
          font-size: 0.82rem;
          color: var(--text-muted);
        }

        .preview-panel {
          padding: 24px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .placeholder-display {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          flex: 1;
          padding: 40px 20px;
        }

        .pet-preview-ring {
          width: 140px;
          height: 140px;
          border-radius: 50%;
          border: 3px solid var(--primary);
          overflow: hidden;
          margin-bottom: 20px;
        }

        .preview-base-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .preview-tip {
          font-size: 0.9rem;
          color: var(--text-muted);
          line-height: 1.5;
        }

        .result-display {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
        }

        .result-card-img {
          width: 100%;
          max-width: 360px;
          border-radius: var(--radius-lg);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
        }

        .spin-icon {
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .gallery-section {
          padding-top: 20px;
        }

        .gallery-section h3 {
          font-size: 1.2rem;
          color: #FFFFFF;
          margin-bottom: 16px;
        }

        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }

        @media (max-width: 768px) {
          .gallery-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        .gallery-item {
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }

        .gallery-img {
          width: 100%;
          height: 200px;
          object-fit: cover;
        }

        .gallery-info {
          padding: 10px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: rgba(0, 0, 0, 0.4);
        }

        .g-theme {
          font-size: 0.78rem;
          color: #FFFFFF;
          font-weight: 600;
        }
      `}</style>
    </div>
  );
};
