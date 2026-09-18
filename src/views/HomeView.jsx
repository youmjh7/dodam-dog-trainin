import React from 'react';
import { useApp } from '../context/AppContext';
import { DodamLogo } from '../components/DodamLogo';
import { ShieldCheck, Calendar, MessageSquare, Sparkles, Star, Award, CheckCircle, ArrowRight, Zap, Crown } from 'lucide-react';

export const HomeView = () => {
  const { setActiveTab } = useApp();

  return (
    <div className="home-view" style={{ paddingBottom: '40px' }}>
      <section className="hero-section" style={{ textAlign: 'center', padding: '40px 0 30px 0' }}>
        <div className="container" style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
            <DodamLogo size={110} />
          </div>

          <h1 style={{ fontSize: '2.4rem', fontWeight: '800', color: '#FFF', margin: '12px 0', lineHeight: '1.35' }}>
            우리 강아지 맞춤 1:1 방문 훈련<br />
            <span className="text-gradient">전문 훈련사가 댁으로 직접 찾아갑니다</span>
          </h1>

          <p style={{ color: 'var(--text-muted)', fontSize: '1.02rem', marginBottom: '24px' }}>
            소리 짖음, 현관 경계, 분리불안, 산책 당김 1:1 맞춤 현장 솔루션 제공
          </p>

          {/* Important Notice Card */}
          <div style={{ background: 'rgba(255, 107, 0, 0.1)', border: '1px solid #FF8800', borderRadius: '16px', padding: '20px', maxWidth: '780px', margin: '0 auto 30px auto', textAlign: 'left' }}>
            <div style={{ color: '#FF8800', fontWeight: 'bold', fontSize: '1.08rem', marginBottom: '6px' }}>
              🚨 [훈련 범위 & 원칙] 도담 1:1 방문 훈련 필독 안내
            </div>
            <div style={{ color: '#FFF', fontSize: '1.02rem', fontWeight: 'bold', marginBottom: '4px' }}>
              🚫 대소변 훈련 미진행 | ❌ 간식 유혹·유인 훈련 NO! | ⭕ 바른 목줄(리드줄) 훈련 OK!
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', margin: 0, lineHeight: '1.5' }}>
              <strong>※ 대소변 훈련은 진행하지 않습니다.</strong> 소리 짖음, 외부인 경계, 분리불안, 산책 당김 교정을 전문으로 합니다.<br />
              간식 유인이 아닌 보호자님과의 바른 리드워크(목줄) 훈련으로 문제 행동을 근본 교정하며, <strong>교정 성공 후 올바른 행동에 대한 긍정 보상 간식은 정상 지급합니다!</strong>
            </p>
          </div>

          {/* 3 Main Action Cards Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginTop: '20px' }}>
            {/* Card 1: Booking */}
            <div className="glass-card" style={{ textAlign: 'left' }}>
              <h3 style={{ color: '#FFF', marginBottom: '8px', fontSize: '1.2rem' }}>1회 원포인트 방문 훈련</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '16px', lineHeight: '1.5' }}>
                90분간 목줄 리드워크, 벨 반응, 매트 훈련 집중 교정 (대소변 훈련 제외 / 성공 시 보상 지급)
              </p>
              <div style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--primary)', marginBottom: '16px' }}>
                200,000원 (+ 거리 출장비)
              </div>
              <button className="btn btn-primary btn-full" onClick={() => setActiveTab('booking')}>
                📅 날짜 선택하고 예약하기
              </button>
            </div>

            {/* Card 2: Q&A */}
            <div className="glass-card" style={{ textAlign: 'left', cursor: 'pointer' }} onClick={() => setActiveTab('qna')}>
              <span className="badge badge-purple" style={{ marginBottom: '8px' }}>Q&A 커뮤니티</span>
              <h3 style={{ color: '#FFF', marginBottom: '8px', fontSize: '1.2rem' }}>❓ 회원 맞춤 질문 게시판</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '16px', lineHeight: '1.5' }}>
                궁금한 문제 행동을 질문하고 전문 훈련사의 답변을 받아보세요.
              </p>
              <button className="btn btn-secondary btn-full">
                질문 게시판 이동
              </button>
            </div>

            {/* Card 3: Photo Gallery */}
            <div className="glass-card" style={{ textAlign: 'left', cursor: 'pointer' }} onClick={() => setActiveTab('photoboard')}>
              <span className="badge badge-orange" style={{ marginBottom: '8px' }}>PHOTO GALLERY</span>
              <h3 style={{ color: '#FFF', marginBottom: '8px', fontSize: '1.2rem' }}>📸 우리 강아지 포토 갤러리</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '16px', lineHeight: '1.5' }}>
                사랑스러운 강아지 사진을 자랑하고 하트를 받으세요!
              </p>
              <button className="btn btn-accent btn-full">
                포토 갤러리 구경하기
              </button>
            </div>

            {/* Card 4: AI Studio */}
            <div className="glass-card" style={{ textAlign: 'left', cursor: 'pointer' }} onClick={() => setActiveTab('ai-studio')}>
              <span className="badge badge-purple" style={{ marginBottom: '8px' }}>AI STUDIO</span>
              <h3 style={{ color: '#FFF', marginBottom: '8px', fontSize: '1.2rem' }}>✨ AI 펫 아바타 스튜디오</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '12px', lineHeight: '1.5' }}>
                우리 강아지 사진으로 AI 아바타 화보를 만들어 보세요.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 16px 0', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
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
