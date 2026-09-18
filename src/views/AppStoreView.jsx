import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { RegisterAppModal } from '../components/RegisterAppModal';
import { Smartphone, PlusCircle, Search, Star, Download, ExternalLink, Sparkles, ShieldCheck, Heart, ArrowRight } from 'lucide-react';

export const AppStoreView = () => {
  const { customApps, setActiveTab } = useApp();
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [searchQuery, setSearchQuery] = useState('');
  const [registerModalOpen, setRegisterModalOpen] = useState(false);

  const categories = ['전체', '훈련 & 케어', 'AI & 사진', '1:1 행동 상담', '건강 & 영양', '다이어리 & 기록'];

  const filteredApps = customApps.filter((app) => {
    const matchesCategory = selectedCategory === '전체' || app.category.includes(selectedCategory);
    const matchesSearch = app.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          app.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleLaunchApp = (app) => {
    if (app.actionTab) {
      setActiveTab(app.actionTab);
    } else if (app.appUrl && app.appUrl.startsWith('http')) {
      window.open(app.appUrl, '_blank');
    } else {
      alert(`🚀 [${app.title}] 앱이 실행되었습니다!\n\n개발자: ${app.author}\n설명: ${app.description}`);
    }
  };

  const handleOpenRegisterModal = () => {
    const pw = prompt('⚙️ [관리자 인증] 앱 등록을 위해 관리자 비밀번호를 입력해주세요:');
    if (pw === '@4865') {
      setRegisterModalOpen(true);
    } else if (pw !== null) {
      alert('❌ 관리자 비밀번호가 일치하지 않습니다. (비밀번호: @4865)');
    }
  };

  return (
    <div className="app-store-view container" style={{ paddingBottom: '60px' }}>
      {/* Header Banner */}
      <div className="glass-card" style={{ background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(16, 185, 129, 0.15) 100%)', border: '1px solid var(--border-color)', borderRadius: '24px', padding: '32px 24px', marginBottom: '30px', textAlgin: 'center' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', borderRadius: '9999px', background: 'rgba(16, 185, 129, 0.2)', border: '1px solid #10B981', color: '#10B981', fontSize: '0.85rem', fontWeight: 700, marginBottom: '14px' }}>
            <Smartphone size={16} />
            <span>도담앱스토어</span>
          </div>

          <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#FFF', margin: '8px 0 14px 0' }}>
            도담 펫 앱 라인업 & 센터<br />
            <span className="text-gradient">보호자분들이 자유롭게 실행하고 이용할 수 있습니다</span>
          </h1>

          <p style={{ color: 'var(--text-muted)', fontSize: '1.02rem', lineHeight: '1.6', marginBottom: '24px' }}>
            염정화 행동교정 전문가와 함께 만드는 맞춤 펫 앱 스토어입니다.<br />
            방문 훈련 계산기, AI 포토 스튜디오, 영양 사전, 훈련 다이어리 등 다양한 앱을 확인하고 자유롭게 실행해보세요!
          </p>

          <button
            className="btn btn-primary btn-lg"
            onClick={handleOpenRegisterModal}
            style={{ background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)', color: '#FFF', borderRadius: '14px', boxShadow: '0 4px 20px rgba(16, 185, 129, 0.4)', gap: '8px' }}
          >
            <PlusCircle size={20} />
            📱 [관리자 전용] 신규 강아지 앱 새로 등록하기
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '28px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap' }}>
          {/* Category Tabs */}
          <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px', maxWidth: '100%' }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: '8px 16px',
                  borderRadius: '9999px',
                  border: selectedCategory === cat ? '1px solid #10B981' : '1px solid var(--border-color)',
                  background: selectedCategory === cat ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                  color: selectedCategory === cat ? '#10B981' : 'var(--text-main)',
                  fontWeight: selectedCategory === cat ? 700 : 500,
                  fontSize: '0.88rem',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.2s'
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div style={{ position: 'relative', minWidth: '260px' }}>
            <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
            <input
              type="text"
              placeholder="등록된 앱 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ width: '100%', padding: '10px 14px 10px 36px', borderRadius: '12px', background: '#151D2C', border: '1px solid var(--border-color)', color: '#FFF', fontSize: '0.88rem' }}
            />
          </div>
        </div>
      </div>

      {/* App Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
        {filteredApps.map((app) => (
          <div key={app.id} className="glass-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', border: '1px solid var(--border-color)', borderRadius: '20px', padding: '20px', transition: 'all 0.2s' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px', marginBottom: '14px' }}>
                <img
                  src={app.icon}
                  alt={app.title}
                  style={{ width: '56px', height: '56px', borderRadius: '14px', objectFit: 'cover', border: '1px solid var(--border-color)', boxShadow: '0 4px 12px rgba(0,0,0,0.3)' }}
                />
                <span style={{ padding: '4px 10px', borderRadius: '9999px', background: `${app.badgeColor || '#10B981'}20`, color: app.badgeColor || '#10B981', border: `1px solid ${app.badgeColor || '#10B981'}`, fontSize: '0.74rem', fontWeight: 800 }}>
                  {app.badge || 'APP'}
                </span>
              </div>

              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#FFF', margin: '0 0 6px 0' }}>{app.title}</h3>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '10px' }}>
                <span>📁 {app.category}</span>
                <span>•</span>
                <span>👤 {app.author || '도담 개발자'}</span>
              </div>

              <p style={{ fontSize: '0.88rem', color: '#CBD5E1', lineHeight: '1.5', margin: '0 0 16px 0', minHeight: '40px' }}>
                {app.description}
              </p>
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '12px', borderTop: '1px solid var(--border-color)', marginBottom: '14px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#F59E0B' }}>
                  <Star size={14} fill="#F59E0B" /> {app.rating || 5.0}
                </span>
                <span>이용수: {app.downloads || '1,000+회'}</span>
              </div>

              <button
                className="btn btn-primary btn-full"
                onClick={() => handleLaunchApp(app)}
                style={{ background: 'linear-gradient(135deg, #10B981 0%, #06B6D4 100%)', color: '#FFF', borderRadius: '12px', gap: '8px' }}
              >
                <span>앱 즉시 실행하기</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredApps.length === 0 && (
        <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-muted)' }}>
          <p style={{ fontSize: '1.1rem' }}>검색 조건에 맞는 강아지 앱이 없습니다.</p>
          <button className="btn btn-secondary btn-sm" onClick={() => { setSelectedCategory('전체'); setSearchQuery(''); }}>
            전체 앱 보기
          </button>
        </div>
      )}

      {/* Modal */}
      <RegisterAppModal
        isOpen={registerModalOpen}
        onClose={() => setRegisterModalOpen(false)}
      />
    </div>
  );
};
