import React from 'react';
import { useApp } from '../context/AppContext';
import { DodamLogo } from '../components/DodamLogo';

export const HomeView = () => {
  const { setActiveTab } = useApp();

  return (
    <div className="home-view" style={{ paddingBottom: '40px' }}>
      <div className="container" style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 20px' }}>
        <div style={{ textAlign: 'center', margin: '20px 0 30px 0' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
            <DodamLogo size={110} />
          </div>

          <h1 style={{ fontSize: '2.4rem', fontWeight: '800', margin: '12px 0', color: '#FFF', lineHeight: '1.35' }}>
            우리 강아지 맞춤 1:1 방문 훈련<br />
            <span className="text-gradient">전문 훈련사가 댁으로 직접 찾아갑니다</span>
          </h1>
          <p style={{ color: 'var(--text-muted)', marginBottom: '24px', fontSize: '1.02rem' }}>
            소리 짖음, 현관 경계, 분리불안, 산책 당김 1:1 맞춤 현장 솔루션 제공
          </p>

          {/* Important Notice Card */}
          <div style={{ background: 'rgba(255, 107, 0, 0.1)', border: '1px solid #FF8800', borderRadius: '16px', padding: '20px', maxWidth: '880px', margin: '0 auto 30px auto', textAlign: 'left' }}>
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
        </div>

        {/* 3 Main Action Cards Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))', gap: '24px' }}>
          {/* Card 1: Booking */}
          <div className="glass-card" style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', transition: 'all 0.2s ease-in-out' }}>
            <div>
              <span className="badge badge-orange" style={{ marginBottom: '10px' }}>1:1 맞춤 훈련</span>
              <h3 style={{ color: '#FFF', marginBottom: '8px', fontSize: '1.25rem' }}>1회 원포인트 방문 훈련</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '16px', lineHeight: '1.5' }}>
                90분간 목줄 리드워크, 벨 반응, 매트 훈련 집중 교정 (대소변 훈련 제외 / 성공 시 보상 지급)
              </p>
            </div>
            <div>
              <div style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--primary)', marginBottom: '14px' }}>
                200,000원 <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 'normal' }}>(+ 거리 출장비)</span>
              </div>
              <button className="btn btn-primary btn-full" onClick={() => setActiveTab('booking')}>
                📅 날짜 선택하고 예약하기
              </button>
            </div>
          </div>

          {/* Card 2: Q&A */}
          <div className="glass-card" style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', cursor: 'pointer', transition: 'all 0.2s ease-in-out' }} onClick={() => setActiveTab('qna')}>
            <div>
              <span className="badge badge-purple" style={{ marginBottom: '10px' }}>Q&A 커뮤니티</span>
              <h3 style={{ color: '#FFF', marginBottom: '8px', fontSize: '1.25rem' }}>❓ 회원 맞춤 질문 게시판</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '16px', lineHeight: '1.5' }}>
                궁금한 강아지 문제 행동을 질문하고 전문 훈련사의 1:1 맞춤 답변을 받아보세요.
              </p>
            </div>
            <div>
              <div style={{ fontSize: '1.05rem', fontWeight: 'bold', color: '#A78BFA', marginBottom: '14px' }}>
                💬 전문 훈련사 무료 답변
              </div>
              <button className="btn btn-secondary btn-full">
                질문 게시판 이동
              </button>
            </div>
          </div>

          {/* Card 3: Photo Gallery */}
          <div className="glass-card" style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', cursor: 'pointer', transition: 'all 0.2s ease-in-out' }} onClick={() => setActiveTab('photoboard')}>
            <div>
              <span className="badge badge-orange" style={{ marginBottom: '10px' }}>PHOTO GALLERY</span>
              <h3 style={{ color: '#FFF', marginBottom: '8px', fontSize: '1.25rem' }}>📸 우리 강아지 포토 갤러리</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '16px', lineHeight: '1.5' }}>
                사랑스러운 강아지 자랑하고 다른 반려견 보호자들과 소통하며 하트를 받아보세요!
              </p>
            </div>
            <div>
              <div style={{ fontSize: '1.05rem', fontWeight: 'bold', color: '#F59E0B', marginBottom: '14px' }}>
                ❤️ 귀여운 포토 자랑하기
              </div>
              <button className="btn btn-accent btn-full">
                포토 갤러리 구경하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeView;
