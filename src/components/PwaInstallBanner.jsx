import React, { useState, useEffect } from 'react';
import { Download, Smartphone } from 'lucide-react';
import { DodamLogo } from './DodamLogo';

export const PwaInstallBanner = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showBanner, setShowBanner] = useState(false);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowBanner(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    if (window.matchMedia('(display-mode: standalone)').matches) {
      setInstalled(true);
    }

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setShowBanner(false);
      setInstalled(true);
    }
    setDeferredPrompt(null);
  };

  if (!showBanner && !installed) {
    return (
      <div style={{ background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(6, 182, 212, 0.15) 100%)', border: '1px solid #10B981', borderRadius: '14px', padding: '14px 18px', margin: '20px 0', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <DodamLogo size={40} />
          <div>
            <div style={{ fontWeight: 'bold', fontSize: '0.96rem', color: '#FFF' }}>📱 스마트폰 전용 '도담' 공식 앱 설치하기</div>
            <div style={{ fontSize: '0.82rem', color: '#94A3B8' }}>홈 화면 아이콘 등록으로 1초 만에 편리하게 방문 예약하세요!</div>
          </div>
        </div>
        <button className="btn btn-primary btn-sm" onClick={handleInstallClick} style={{ background: '#10B981', color: '#FFF', gap: '6px' }}>
          <Download size={14} /> 앱 설치
        </button>
      </div>
    );
  }

  return null;
};
