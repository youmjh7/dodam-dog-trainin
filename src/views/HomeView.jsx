import React from 'react';
import { useApp } from '../context/AppContext';
import { initialTrainers } from '../context/AppContext';
import { ShieldCheck, Calendar, MessageSquare, Sparkles, Star, Award, CheckCircle, ArrowRight, Zap, Crown } from 'lucide-react';

export const HomeView = () => {
  const { setActiveTab, openPaymentModal, activePet } = useApp();

  return (
    <div className="home-view">
      {/* Hero Banner Section */}
      <section className="hero-section">
        <div className="container hero-container">
          <div style={{ textAlign: 'center', marginBottom: '20px', display: 'flex', justifyContent: 'center' }}>
            <div style={{ 
              width: '110px', 
              height: '110px', 
              borderRadius: '50%', 
              background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              border: '3px solid #10B981', 
              boxShadow: '0 0 30px rgba(16, 185, 129, 0.5)',
              fontSize: '3.2rem'
            }}>
              🐶
            </div>
          </div>

          <div className="hero-badge pulse-element">
            <ShieldCheck size={16} color="#FF8800" />
            <span>1회 방문: 20만원 / 2회 이상: 회당 15만원 · 경기도 안산시 출발 (km당 2천원)</span>
          </div>

          <h1 className="hero-title">
            우리 집 강아지의 문제 행동,<br />
            <span className="text-gradient">전문 훈련사가 직접 댁으로 찾아갑니다</span>
          </h1>

          <p className="hero-description">
            경기도 안산시 출발! 거리에 따른 투명한 출장비 계산기와 1:1 맞춤 현장 솔루션을 제공합니다.
          </p>

          {/* Training Philosophy Important Notice Banner */}
          <div style={{ background: 'rgba(255, 107, 0, 0.12)', border: '1px solid #FF8800', borderRadius: '16px', padding: '20px', maxWidth: '800px', margin: '20px auto', textAlign: 'left' }}>
            <div style={{ color: '#FF8800', fontWeight: 'bold', fontSize: '1.08rem', marginBottom: '6px' }}>
              🚨 [훈련 범위 & 원칙] 도담 1:1 방문 훈련 핵심 필독 안내
            </div>
            <div style={{ color: '#FFF', fontSize: '1.02rem', fontWeight: 'bold', marginBottom: '4px' }}>
              🚫 대소변 훈련 미진행 | ❌ 간식 유혹·유인 훈련 NO! | ⭕ 바른 목줄(리드줄) 훈련 OK!
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: 0, lineHeight: '1.5' }}>
              <strong>※ 대소변 훈련은 진행하지 않습니다.</strong> 소리 짖음, 벨 반응, 분리불안, 산책 당김 교정을 전문으로 하며, 훈련 성공 시 칭찬 보상 간식은 정상 제공됩니다.
            </p>
          </div>

          {/* Key Stats Bar */}
          <div className="hero-stats-grid">
            <div className="stat-card">
              <span className="stat-num">20만원 / 15만원</span>
              <span className="stat-label">1회 20만 / 2회이상 회당 15만</span>
            </div>
            <div className="stat-card">
              <span className="stat-num">km당 2,000원</span>
              <span className="stat-label">경기도 안산시 출발 거리 출장비</span>
            </div>
            <div className="stat-card">
              <span className="stat-num">4.9 / 5.0</span>
              <span className="stat-label">실제 보호자 평점 (3,400+건)</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Services Grid */}
      <section className="services-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">SERVICES</span>
            <h2>PawCoach 맞춤 케어 프로그램</h2>
            <p>필요에 맞게 선택할 수 있는 훈련 & 케어 솔루션</p>
          </div>

          <div className="services-grid">
            {/* Service 1: 1 Session Visit */}
            <div className="service-card featured">
              <div className="card-top-tag font-heading">1회 단독 세션</div>
              <div className="service-icon orange">
                <Calendar size={28} color="#FF6B00" />
              </div>
              <h3 className="service-title">1회 원포인트 방문 훈련</h3>
              <p className="service-desc">
                전문 훈련사가 직접 댁으로 방문하여 소리 짖음, 벨 반응, 매트 훈련, 외부인 경계 등 생활 환경 맞춤 솔루션을 90분간 집중 제공합니다.
              </p>
              <div className="service-price">
                <span className="price-tag font-heading">200,000원</span>
                <span className="price-unit">/ 1회 (+ 출장비 별도)</span>
              </div>
              <ul className="feature-list">
                <li><CheckCircle size={14} color="#FF6B00" /> 사전 영상 1:1 행동 분석</li>
                <li><CheckCircle size={14} color="#FF6B00" /> 현장 환경 위험요소 진단</li>
                <li><CheckCircle size={14} color="#FF6B00" /> 안산 부곡동 출발 출장비 계산</li>
              </ul>
              <button
                className="btn btn-primary btn-full"
                onClick={() => setActiveTab('booking')}
              >
                1회 방문 훈련 예약하기
              </button>
            </div>

            {/* Service 2: 2 Session or More Package */}
            <div className="service-card">
              <div className="card-top-tag font-heading" style={{ background: '#8B5CF6' }}>회당 15만원 할인!</div>
              <div className="service-icon purple">
                <Award size={28} color="#8B5CF6" />
              </div>
              <h3 className="service-title">2회 이상 연속 패키지</h3>
              <p className="service-desc">
                2회 이상 신청 시 회당 15만원 할인 혜택! 지속적인 행동 습관 형성이 필요한 강아지를 위한 단계별 케어.
              </p>
              <div className="service-price">
                <span className="price-tag font-heading">300,000원 ~</span>
                <span className="price-unit">/ 2회 기준 (회당 15만원)</span>
              </div>
              <ul className="feature-list">
                <li><CheckCircle size={14} color="#8B5CF6" /> 회당 15만원 할인 적용</li>
                <li><CheckCircle size={14} color="#8B5CF6" /> 주차별 맞춤 훈련 미션</li>
                <li><CheckCircle size={14} color="#8B5CF6" /> 1:1 영상 챗 코칭 지원</li>
              </ul>
              <button
                className="btn btn-secondary btn-full"
                onClick={() => setActiveTab('booking')}
              >
                2회 이상 패키지 신청
              </button>
            </div>

            {/* Service 3: AI Pet Studio Teaser */}
            <div className="service-card">
              <div className="service-icon yellow">
                <Sparkles size={28} color="#F59E0B" />
              </div>
              <h3 className="service-title">AI 강아지 이미지 스튜디오</h3>
              <p className="service-desc">
                우리 강아지 사진으로 만들어내는 프라이빗 AI 스튜디오! 히어로, 명화, 사이버펑크, 애니메이션 캐릭터 카드 생성.
              </p>
              <div className="service-price">
                <span className="price-tag font-heading">무료 3회</span>
                <span className="price-unit">/ 가입 즉시 체험</span>
              </div>
              <ul className="feature-list">
                <li><CheckCircle size={14} color="#F59E0B" /> 5가지 고품질 AI 테마</li>
                <li><CheckCircle size={14} color="#F59E0B" /> 펫 아바타 카드 자동 제작</li>
                <li><CheckCircle size={14} color="#F59E0B" /> HD 고화질 다운로드</li>
              </ul>
              <button
                className="btn btn-accent btn-full"
                onClick={() => setActiveTab('ai-studio')}
              >
                AI 스튜디오 체험하기
              </button>
            </div>
          </div>
        </div>
      </section>



      {/* Certified Trainers Showcase */}
      <section className="trainers-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">TRAINERS</span>
            <h2>검증된 1:1 전문 훈련사 라인업</h2>
            <p>공인 자격증과 수년간의 현장 경험을 갖춘 베테랑 트레이너</p>
          </div>

          <div className="trainers-grid">
            {initialTrainers.map((tr) => (
              <div key={tr.id} className="trainer-card glass-card">
                <div className="trainer-img-wrapper">
                  <img src={tr.image} alt={tr.name} className="trainer-img" />
                  <div className="trainer-rating-badge">
                    <Star size={14} color="#F59E0B" fill="#F59E0B" />
                    <span>{tr.rating} ({tr.reviewsCount})</span>
                  </div>
                </div>
                <div className="trainer-body">
                  <h3 className="trainer-name">{tr.name}</h3>
                  <span className="trainer-title">{tr.title}</span>
                  <div className="specialty-chips">
                    {tr.specialties.map((sp, idx) => (
                      <span key={idx} className="badge badge-orange">{sp}</span>
                    ))}
                  </div>
                  <p className="trainer-bio">{tr.bio}</p>
                  <button
                    className="btn btn-secondary btn-sm btn-full"
                    onClick={() => setActiveTab('booking')}
                  >
                    이 훈련사로 예약 (15만원)
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style jsx>{`
        .home-view {
          padding-bottom: 40px;
        }

        .hero-section {
          padding: 60px 0 50px 0;
          background: radial-gradient(circle at 50% 20%, rgba(255, 107, 0, 0.12) 0%, rgba(11, 15, 23, 0) 70%);
          text-align: center;
        }

        .hero-container {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(255, 107, 0, 0.15);
          border: 1px solid rgba(255, 107, 0, 0.3);
          padding: 6px 16px;
          border-radius: var(--radius-full);
          font-size: 0.88rem;
          color: #FF8800;
          font-weight: 700;
          margin-bottom: 24px;
        }

        .hero-title {
          font-size: 2.4rem;
          font-weight: 800;
          line-height: 1.25;
          color: #FFFFFF;
          margin-bottom: 16px;
          max-width: 800px;
        }

        @media (min-width: 768px) {
          .hero-title {
            font-size: 3.2rem;
          }
        }

        .hero-description {
          font-size: 1.05rem;
          color: var(--text-muted);
          max-width: 650px;
          margin-bottom: 32px;
        }

        .hero-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 14px;
          justify-content: center;
          margin-bottom: 50px;
        }

        .hero-stats-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          width: 100%;
          max-width: 840px;
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          padding: 20px;
          border-radius: var(--radius-lg);
        }

        @media (max-width: 640px) {
          .hero-stats-grid {
            grid-template-columns: 1fr;
            gap: 12px;
          }
        }

        .stat-card {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .stat-num {
          font-size: 1.5rem;
          font-weight: 800;
          color: #FF8800;
          font-family: var(--font-heading);
        }

        .stat-label {
          font-size: 0.8rem;
          color: var(--text-muted);
        }

        .services-section, .trainers-section, .membership-banner-section {
          padding: 50px 0;
        }

        .section-header {
          text-align: center;
          margin-bottom: 40px;
        }

        .section-tag {
          font-size: 0.75rem;
          font-weight: 800;
          letter-spacing: 2px;
          color: var(--primary);
        }

        .section-header h2 {
          font-size: 1.8rem;
          color: #FFFFFF;
          margin: 6px 0;
        }

        .section-header p {
          color: var(--text-muted);
          font-size: 0.95rem;
        }

        .services-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        @media (max-width: 900px) {
          .services-grid {
            grid-template-columns: 1fr;
          }
        }

        .service-card {
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-lg);
          padding: 28px 24px;
          display: flex;
          flex-direction: column;
          position: relative;
        }

        .service-card.featured {
          border-color: var(--primary);
          box-shadow: 0 0 30px rgba(255, 107, 0, 0.15);
        }

        .card-top-tag {
          position: absolute;
          top: -12px;
          right: 20px;
          background: var(--primary);
          color: #FFFFFF;
          font-size: 0.7rem;
          font-weight: 800;
          padding: 4px 10px;
          border-radius: 99px;
        }

        .service-icon {
          width: 52px;
          height: 52px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 16px;
        }

        .service-icon.orange { background: rgba(255, 107, 0, 0.15); }
        .service-icon.purple { background: rgba(139, 92, 246, 0.15); }
        .service-icon.yellow { background: rgba(245, 158, 11, 0.15); }

        .service-title {
          font-size: 1.25rem;
          color: #FFFFFF;
          margin-bottom: 8px;
        }

        .service-desc {
          font-size: 0.88rem;
          color: var(--text-muted);
          margin-bottom: 20px;
          flex-grow: 1;
        }

        .service-price {
          display: flex;
          align-items: baseline;
          gap: 6px;
          margin-bottom: 20px;
        }

        .price-tag {
          font-size: 1.5rem;
          font-weight: 800;
          color: #FFFFFF;
        }

        .service-card.featured .price-tag {
          color: var(--primary);
        }

        .price-unit {
          font-size: 0.82rem;
          color: var(--text-muted);
        }

        .feature-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-bottom: 24px;
          font-size: 0.86rem;
          color: var(--text-main);
        }

        .feature-list li {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .membership-banner-card {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 36px 40px;
          background: linear-gradient(135deg, rgba(22, 30, 46, 0.9) 0%, rgba(35, 25, 55, 0.9) 100%);
          border: 1px solid rgba(139, 92, 246, 0.3);
          border-radius: var(--radius-lg);
          gap: 20px;
        }

        @media (max-width: 768px) {
          .membership-banner-card {
            flex-direction: column;
            text-align: center;
            padding: 24px;
          }
        }

        .banner-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(245, 158, 11, 0.15);
          color: #F59E0B;
          padding: 4px 12px;
          border-radius: 99px;
          font-size: 0.8rem;
          font-weight: 700;
          margin-bottom: 8px;
        }

        .banner-content h2 {
          font-size: 1.4rem;
          color: #FFFFFF;
          margin-bottom: 4px;
        }

        .banner-content p {
          color: var(--text-muted);
          font-size: 0.9rem;
        }

        .trainers-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        @media (max-width: 900px) {
          .trainers-grid {
            grid-template-columns: 1fr;
          }
        }

        .trainer-img-wrapper {
          position: relative;
          height: 220px;
          border-radius: var(--radius-lg) var(--radius-lg) 0 0;
          overflow: hidden;
        }

        .trainer-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .trainer-rating-badge {
          position: absolute;
          bottom: 12px;
          left: 12px;
          background: rgba(11, 15, 23, 0.85);
          backdrop-filter: blur(8px);
          padding: 4px 10px;
          border-radius: 99px;
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 0.8rem;
          color: #FFFFFF;
          font-weight: 700;
        }

        .trainer-body {
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .trainer-name {
          font-size: 1.15rem;
          color: #FFFFFF;
        }

        .trainer-title {
          font-size: 0.8rem;
          color: var(--text-muted);
        }

        .specialty-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 4px;
        }

        .trainer-bio {
          font-size: 0.85rem;
          color: var(--text-muted);
          line-height: 1.4;
          margin-bottom: 6px;
        }
      `}</style>
    </div>
  );
};
