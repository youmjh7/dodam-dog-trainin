import React from 'react';
import { useApp } from '../context/AppContext';
import { DodamLogo } from './DodamLogo';
import { Dog, Calendar, MessageSquare, Sparkles, Crown, UserPlus, ChevronDown, PlusCircle, Smartphone } from 'lucide-react';

export const Header = () => {
  const {
    activeTab,
    setActiveTab,
    pets,
    activePet,
    setActivePetId,
    setPetModalOpen,
    setEditingPet,
    user,
    setAuthModalOpen
  } = useApp();

  return (
    <header className="desktop-header">
      <div className="container header-content">
        {/* Brand Logo */}
        <div className="logo-group" onClick={() => setActiveTab('home')}>
          <DodamLogo size={42} />
          <div className="logo-text-group">
            <span className="logo-title font-heading">도담</span>
            <span className="logo-sub">DODAM · 방문 반려견 훈련 서비스</span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="nav-menu">
          <button
            className={`nav-link ${activeTab === 'home' ? 'active' : ''}`}
            onClick={() => setActiveTab('home')}
          >
            홈
          </button>
          <button
            className={`nav-link ${activeTab === 'booking' ? 'active' : ''}`}
            onClick={() => setActiveTab('booking')}
          >
            <Calendar size={16} />
            방문 훈련 예약
            <span className="nav-badge">회당 15만원~</span>
          </button>
          <button
            className={`nav-link ${activeTab === 'app-store' || activeTab === 'appstore' ? 'active' : ''}`}
            onClick={() => setActiveTab('appstore')}
            style={{ background: activeTab === 'app-store' || activeTab === 'appstore' ? '#10B981' : 'transparent', color: activeTab === 'app-store' || activeTab === 'appstore' ? '#FFF' : '#10B981', border: '1px solid #10B981', borderRadius: '8px' }}
          >
            <Smartphone size={16} color={activeTab === 'app-store' || activeTab === 'appstore' ? '#FFF' : '#10B981'} />
            📱 도담앱스토어
          </button>
          <button
            className={`nav-link ${activeTab === 'qna' ? 'active' : ''}`}
            onClick={() => setActiveTab('qna')}
          >
            ❓ Q&A 질문란
          </button>
          <button
            className={`nav-link ${activeTab === 'photoboard' || activeTab === 'photo-gallery' ? 'active' : ''}`}
            onClick={() => setActiveTab('photoboard')}
          >
            📸 강아지 포토
          </button>
          <button
            className={`nav-link ${activeTab === 'pet-profile' || activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('pet-profile')}
          >
            <Dog size={16} />
            내 반려견
          </button>
        </nav>

        {/* Right Actions & Pet Selector */}
        <div className="header-right">
          {/* Active Pet Dropdown Select */}
          <div className="pet-select-wrapper">
            <div className="active-pet-chip">
              <img src={activePet.image} alt={activePet.name} className="pet-chip-avatar" />
              <div className="pet-chip-info" onClick={() => setActiveTab('pet-profile')}>
                <span className="pet-chip-name">{activePet.name}</span>
                <span className="pet-chip-breed">{activePet.breed}</span>
              </div>
              <select
                className="pet-native-select"
                value={activePet.id}
                onChange={(e) => {
                  if (e.target.value === 'add_new') {
                    setEditingPet(null);
                    setPetModalOpen(true);
                  } else {
                    setActivePetId(e.target.value);
                  }
                }}
              >
                {pets.map((p) => (
                  <option key={p.id} value={p.id}>
                    🐶 {p.name} ({p.breed})
                  </option>
                ))}
                <option value="add_new">+ 새 반려견 등록하기</option>
              </select>
              <ChevronDown size={14} className="pet-select-arrow" />
            </div>
          </div>

          <button
            className="btn btn-primary btn-sm"
            onClick={() => setAuthModalOpen(true)}
            style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <UserPlus size={15} />
            🔑 회원가입 / 로그인
          </button>
        </div>
      </div>

      <style jsx>{`
        .desktop-header {
          position: sticky;
          top: 0;
          z-index: 900;
          background: rgba(11, 15, 23, 0.85);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-bottom: 1px solid var(--border-color);
        }

        .header-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 72px;
          gap: 12px;
        }

        .logo-group {
          display: flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
          white-space: nowrap;
          flex-shrink: 0;
        }

        .logo-icon {
          width: 40px;
          height: 40px;
          border-radius: 12px;
          background: linear-gradient(135deg, #FF6B00 0%, #FF8800 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 12px rgba(255, 107, 0, 0.3);
          flex-shrink: 0;
        }

        .logo-text-group {
          display: flex;
          flex-direction: column;
          white-space: nowrap;
          flex-shrink: 0;
        }

        .logo-title {
          font-size: 1.35rem;
          font-weight: 800;
          color: #FFFFFF;
          line-height: 1.1;
          white-space: nowrap;
          word-break: keep-all;
        }

        .logo-sub {
          font-size: 0.72rem;
          color: var(--text-muted);
          letter-spacing: -0.2px;
          white-space: nowrap;
        }

        .nav-menu {
          display: none;
          align-items: center;
          gap: 6px;
          white-space: nowrap;
          flex-shrink: 0;
        }

        @media (min-width: 860px) {
          .nav-menu {
            display: flex;
          }
        }

        .nav-link {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 8px 14px;
          border-radius: var(--radius-md);
          background: transparent;
          border: none;
          color: var(--text-muted);
          font-size: 0.92rem;
          font-weight: 600;
          cursor: pointer;
          transition: all var(--transition-fast);
          position: relative;
          white-space: nowrap;
          flex-shrink: 0;
          word-break: keep-all;
        }

        .nav-link:hover {
          color: #FFFFFF;
          background: rgba(255, 255, 255, 0.05);
        }

        .nav-link.active {
          color: #FFFFFF;
          background: rgba(255, 107, 0, 0.12);
          border: 1px solid rgba(255, 107, 0, 0.25);
        }

        .nav-badge {
          font-size: 0.68rem;
          background: rgba(255, 107, 0, 0.2);
          color: #FF8800;
          padding: 2px 6px;
          border-radius: 99px;
          font-weight: 700;
          margin-left: 2px;
          white-space: nowrap;
          flex-shrink: 0;
        }

        .header-right {
          display: flex;
          align-items: center;
          gap: 12px;
          white-space: nowrap;
          flex-shrink: 0;
        }

        .pet-select-wrapper {
          position: relative;
        }

        .active-pet-chip {
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid var(--border-color);
          padding: 5px 12px 5px 6px;
          border-radius: var(--radius-full);
          position: relative;
          cursor: pointer;
        }

        .active-pet-chip:hover {
          border-color: rgba(255, 107, 0, 0.4);
          background: rgba(255, 107, 0, 0.08);
        }

        .pet-chip-avatar {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          object-fit: cover;
        }

        .pet-chip-info {
          display: flex;
          flex-direction: column;
          line-height: 1.1;
        }

        .pet-chip-name {
          font-size: 0.82rem;
          font-weight: 700;
          color: #FFFFFF;
        }

        .pet-chip-breed {
          font-size: 0.68rem;
          color: var(--text-muted);
        }

        .pet-native-select {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0;
          cursor: pointer;
        }

        .pet-select-arrow {
          color: var(--text-muted);
        }
      `}</style>
    </header>
  );
};
