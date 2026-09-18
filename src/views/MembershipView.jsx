import React from 'react';
import { useApp } from '../context/AppContext';
import { Crown, Sparkles, Check, Zap, MessageSquare, Calendar, ShieldCheck } from 'lucide-react';

export const MembershipView = () => {
  const { user, openPaymentModal } = useApp();

  return (
    <div className="membership-view container">
      <div className="membership-header">
        <div className="badge badge-purple">
          <Crown size={14} /> PawCoach 프리미엄 멤버십 & 패스
        </div>
        <h2>수익 창출 멤버십 요금제</h2>
        <p>우리 아이 맞춤 케어를 가장 알뜰하고 스마트하게 누리는 방법</p>
      </div>

      <div className="pricing-grid">
        {/* Plan 1: PawPass VIP */}
        <div className={`pricing-card glass-card ${user.pawPassActive ? 'active-plan' : 'highlight'}`}>
          <div className="card-top-tag">ALL-IN-ONE</div>
          <div className="plan-icon gold">
            <Crown size={28} color="#F59E0B" />
          </div>
          <h3 className="plan-title">PawPass VIP 월간 구독</h3>
          <p className="plan-desc">AI 스튜디오 무제한 + 1:1 챗 무제한 + 방문 훈련 10% 추가 할인 헤택</p>
          <div className="plan-price">
            <span className="price-num font-heading">19,900원</span>
            <span className="price-cycle">/ 월</span>
          </div>

          <ul className="plan-features">
            <li><Check size={16} color="#10B981" /> AI 강아지 이미지 스튜디오 무제한 생성</li>
            <li><Check size={16} color="#10B981" /> 1:1 영상 & 사진 상담 무제한 이용</li>
            <li><Check size={16} color="#10B981" /> 1회 방문 훈련(15만원) 10% 할인 쿠폰 발급</li>
            <li><Check size={16} color="#10B981" /> 우선 훈련사 배정 혜택</li>
          </ul>

          <button
            className="btn btn-primary btn-full btn-lg"
            onClick={() =>
              openPaymentModal({
                title: 'PawPass VIP 1개월 정기구독',
                amount: 19900,
                itemType: 'pawpass'
              })
            }
          >
            {user.pawPassActive ? '현재 이용 중 (PawPass VIP)' : 'PawPass VIP 구독하기'}
          </button>
        </div>

        {/* Plan 2: AI Credit Pack */}
        <div className="pricing-card glass-card">
          <div className="plan-icon purple">
            <Sparkles size={28} color="#8B5CF6" />
          </div>
          <h3 className="plan-title">AI 스튜디오 10회 패스</h3>
          <p className="plan-desc">필요할 때 충전해서 사용하는 5가지 테마 AI 아바타 카드 패스</p>
          <div className="plan-price">
            <span className="price-num font-heading">3,000원</span>
            <span className="price-cycle">/ 10회</span>
          </div>

          <ul className="plan-features">
            <li><Check size={16} color="#8B5CF6" /> 5가지 고품질 AI 테마 변환 10회</li>
            <li><Check size={16} color="#8B5CF6" /> HD 고화질 아바타 카드 다운로드</li>
            <li><Check size={16} color="#8B5CF6" /> 유효기간 없음 (언제든 사용 가능)</li>
          </ul>

          <button
            className="btn btn-accent btn-full"
            onClick={() =>
              openPaymentModal({
                title: 'AI 스튜디오 10회 크레딧 패스',
                amount: 3000,
                itemType: 'ai_credits',
                payload: { credits: 10 }
              })
            }
          >
            3,000원 충전하기
          </button>
        </div>

        {/* Plan 3: Single Visit Training (150,000 KRW) */}
        <div className="pricing-card glass-card">
          <div className="plan-icon orange">
            <Calendar size={28} color="#FF6B00" />
          </div>
          <h3 className="plan-title">1회 방문 훈련 이용권</h3>
          <p className="plan-desc">행동교정 1급 훈련사가 직접 댁으로 찾아가는 90분 세션</p>
          <div className="plan-price">
            <span className="price-num font-heading">150,000원</span>
            <span className="price-cycle">/ 1회 (90분)</span>
          </div>

          <ul className="plan-features">
            <li><Check size={16} color="#FF6B00" /> 자택 맞춤 환경 행동 진단</li>
            <li><Check size={16} color="#FF6B00" /> 외부 소리 짖음 / 현관 경계 실습</li>
            <li><Check size={16} color="#FF6B00" /> 맞춤 훈련 가이드 리포트 제공</li>
          </ul>

          <button
            className="btn btn-secondary btn-full"
            onClick={() =>
              openPaymentModal({
                title: '1회 원포인트 방문 훈련 세션',
                amount: 150000,
                itemType: 'visit_booking',
                payload: {
                  programName: '1회 원포인트 방문 훈련',
                  price: 150000,
                  trainerName: '강성훈 헤드 트레이너',
                  petName: '마루',
                  date: '2026-09-24',
                  timeSlot: '14:00 - 15:30',
                  address: '서울시 강남구 테헤란로 123'
                }
              })
            }
          >
            15만원 결제 및 예약
          </button>
        </div>
      </div>

      <style jsx>{`
        .membership-view {
          padding-top: 30px;
          padding-bottom: 60px;
        }

        .membership-header {
          text-align: center;
          margin-bottom: 40px;
        }

        .membership-header h2 {
          font-size: 2rem;
          color: #FFFFFF;
          margin: 8px 0;
        }

        .membership-header p {
          color: var(--text-muted);
        }

        .pricing-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        @media (max-width: 900px) {
          .pricing-grid {
            grid-template-columns: 1fr;
          }
        }

        .pricing-card {
          padding: 32px 24px;
          display: flex;
          flex-direction: column;
          position: relative;
        }

        .pricing-card.highlight {
          border-color: #F59E0B;
          box-shadow: 0 0 25px rgba(245, 158, 11, 0.15);
        }

        .pricing-card.active-plan {
          border-color: #10B981;
          background: rgba(16, 185, 129, 0.08);
        }

        .card-top-tag {
          position: absolute;
          top: -12px;
          right: 20px;
          background: #F59E0B;
          color: #000000;
          font-size: 0.68rem;
          font-weight: 800;
          padding: 3px 8px;
          border-radius: 99px;
        }

        .plan-icon {
          width: 54px;
          height: 54px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 16px;
        }

        .plan-icon.gold { background: rgba(245, 158, 11, 0.15); }
        .plan-icon.purple { background: rgba(139, 92, 246, 0.15); }
        .plan-icon.orange { background: rgba(255, 107, 0, 0.15); }

        .plan-title {
          font-size: 1.25rem;
          color: #FFFFFF;
          margin-bottom: 6px;
        }

        .plan-desc {
          font-size: 0.85rem;
          color: var(--text-muted);
          margin-bottom: 20px;
          flex-grow: 1;
        }

        .plan-price {
          display: flex;
          align-items: baseline;
          gap: 4px;
          margin-bottom: 24px;
        }

        .price-num {
          font-size: 1.8rem;
          font-weight: 800;
          color: #FFFFFF;
        }

        .price-cycle {
          font-size: 0.85rem;
          color: var(--text-muted);
        }

        .plan-features {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-bottom: 30px;
          font-size: 0.88rem;
          color: var(--text-main);
        }

        .plan-features li {
          display: flex;
          align-items: center;
          gap: 8px;
        }
      `}</style>
    </div>
  );
};
