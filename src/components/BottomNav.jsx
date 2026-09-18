import React from 'react';
import { useApp } from '../context/AppContext';
import { Home, Calendar, MessageSquare, Sparkles, User } from 'lucide-react';

export const BottomNav = () => {
  const { activeTab, setActiveTab } = useApp();

  const tabs = [
    { id: 'home', label: '홈', icon: Home },
    { id: 'booking', label: '방문예약', icon: Calendar, badge: '15만' },
    { id: 'consultation', label: '1:1 챗', icon: MessageSquare },
    { id: 'ai-studio', label: 'AI스튜디오', icon: Sparkles, color: '#F59E0B' },
    { id: 'pet-profile', label: '내강아지', icon: User }
  ];

  return (
    <nav className="mobile-bottom-nav">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            className={`nav-tab-item ${isActive ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <div className="icon-wrapper">
              <Icon size={20} color={isActive ? (tab.color || '#FF6B00') : '#94A3B8'} />
              {tab.badge && <span className="tab-dot-badge">{tab.badge}</span>}
            </div>
            <span className="tab-label">{tab.label}</span>
          </button>
        );
      })}

      <style jsx>{`
        .mobile-bottom-nav {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          height: 65px;
          background: rgba(15, 23, 42, 0.95);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-top: 1px solid var(--border-color);
          display: flex;
          align-items: center;
          justify-content: space-around;
          z-index: 999;
          padding: 4px 10px 8px 10px;
        }

        @media (min-width: 768px) {
          .mobile-bottom-nav {
            display: none;
          }
        }

        .nav-tab-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: none;
          border: none;
          color: var(--text-muted);
          gap: 3px;
          cursor: pointer;
          flex: 1;
          height: 100%;
          position: relative;
          transition: all var(--transition-fast);
        }

        .nav-tab-item.active {
          color: #FFFFFF;
        }

        .icon-wrapper {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .tab-dot-badge {
          position: absolute;
          top: -6px;
          right: -14px;
          background: var(--primary);
          color: #FFFFFF;
          font-size: 0.6rem;
          font-weight: 800;
          padding: 1px 4px;
          border-radius: 99px;
          line-height: 1;
        }

        .tab-label {
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: -0.2px;
          white-space: nowrap;
          word-break: keep-all;
        }

        .nav-tab-item.active .tab-label {
          color: var(--primary);
          font-weight: 700;
        }
      `}</style>
    </nav>
  );
};
