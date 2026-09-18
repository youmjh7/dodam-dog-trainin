import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, PlusCircle, Smartphone, Link, Tag, Image, Sparkles } from 'lucide-react';

export const RegisterAppModal = ({ isOpen, onClose }) => {
  const { addCustomApp } = useApp();
  const [formData, setFormData] = useState({
    title: '',
    category: '훈련 & 케어',
    icon: '',
    description: '',
    appUrl: '',
    badge: 'NEW',
    author: '염정화 행동교정 전문가'
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      alert('앱 이름을 입력해주세요!');
      return;
    }

    const defaultIcon = formData.icon.trim() || 'C:/Users/yh119/.gemini/antigravity-ide/brain/d1190999-c97c-46b2-bc69-6a72f60c7688/dodam_mascot_seamless_1789574475756.jpg';

    addCustomApp({
      ...formData,
      icon: defaultIcon,
      downloads: '1회 (신규 등록)',
      rating: 5.0,
      badgeColor: '#10B981'
    });

    alert('🎉 신규 강아지 앱이 도담 앱 센터에 성공적으로 등록되었습니다!');
    onClose();
  };

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.75)', backdropFilter: 'blur(8px)', zIndex: 1100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div className="glass-card" style={{ maxWidth: '540px', width: '100%', background: '#0F172A', border: '1px solid var(--border-color)', borderRadius: '20px', overflow: 'hidden' }}>
        <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'rgba(16, 185, 129, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <PlusCircle size={20} color="#10B981" />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '1.15rem', color: '#FFF' }}>📱 신규 강아지 앱 등록</h3>
              <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--text-muted)' }}>내가 만든 강아지 전용 앱을 등록하여 사용자들이 이용하도록 공개합니다</p>
            </div>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer' }}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, color: '#F8FAFC', marginBottom: '6px' }}>
              앱 이름 *
            </label>
            <input
              type="text"
              placeholder="예: 도담 강아지 나이 훈련 계산기"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', background: '#151D2C', border: '1px solid var(--border-color)', color: '#FFF', fontSize: '0.92rem' }}
              required
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, color: '#F8FAFC', marginBottom: '6px' }}>
                카테고리
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', background: '#151D2C', border: '1px solid var(--border-color)', color: '#FFF', fontSize: '0.92rem' }}
              >
                <option value="훈련 & 케어">훈련 & 케어</option>
                <option value="AI & 사진">AI & 사진</option>
                <option value="건강 & 영양">건강 & 영양</option>
                <option value="다이어리 & 기록">다이어리 & 기록</option>
                <option value="게임을 겸한 커뮤니티">커뮤니티/게임</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, color: '#F8FAFC', marginBottom: '6px' }}>
                앱 대표 개발자 / 출처
              </label>
              <input
                type="text"
                placeholder="예: 염정화 행동교정 전문가"
                value={formData.author}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', background: '#151D2C', border: '1px solid var(--border-color)', color: '#FFF', fontSize: '0.92rem' }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, color: '#F8FAFC', marginBottom: '6px' }}>
              앱 설명
            </label>
            <textarea
              rows={3}
              placeholder="앱이 제공하는 주요 기능과 사용 대상에 대한 설명을 적어주세요."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', background: '#151D2C', border: '1px solid var(--border-color)', color: '#FFF', fontSize: '0.92rem', resize: 'vertical' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, color: '#F8FAFC', marginBottom: '6px' }}>
              앱 실행 주소 (URL / 웹 링크)
            </label>
            <input
              type="text"
              placeholder="https://... 또는 앱 실행 경로 주소"
              value={formData.appUrl}
              onChange={(e) => setFormData({ ...formData, appUrl: e.target.value })}
              style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', background: '#151D2C', border: '1px solid var(--border-color)', color: '#FFF', fontSize: '0.92rem' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, color: '#F8FAFC', marginBottom: '6px' }}>
              앱 아이콘 이미지 주소 (선택 - 비워두면 도담 로고 적용)
            </label>
            <input
              type="text"
              placeholder="이미지 URL 주소"
              value={formData.icon}
              onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
              style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', background: '#151D2C', border: '1px solid var(--border-color)', color: '#FFF', fontSize: '0.92rem' }}
            />
          </div>

          <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
            <button type="button" onClick={onClose} className="btn btn-secondary btn-full" style={{ flex: 1 }}>
              취소
            </button>
            <button type="submit" className="btn btn-primary btn-full" style={{ flex: 2, background: '#10B981', color: '#FFF' }}>
              📱 도담 앱 스토어에 앱 등록하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
