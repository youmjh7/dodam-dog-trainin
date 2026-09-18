import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, CreditCard, CheckCircle2, ShieldCheck, Tag, Sparkles } from 'lucide-react';

export const PaymentModal = () => {
  const { paymentModalState, closePaymentModal, completePayment } = useApp();
  const [selectedMethod, setSelectedMethod] = useState('kakaopay');
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!paymentModalState.isOpen) return null;

  const originalAmount = paymentModalState.amount || 150000;
  const finalAmount = Math.max(0, originalAmount - discountAmount);

  const applyCoupon = () => {
    if (couponCode.toUpperCase() === 'PAW10' || couponCode.trim() === '멍선생10') {
      const discount = Math.round(originalAmount * 0.1);
      setDiscountAmount(discount);
      setCouponApplied(true);
    } else if (couponCode.toUpperCase() === 'WELCOME') {
      setDiscountAmount(15000);
      setCouponApplied(true);
    } else {
      alert('유효하지 않은 쿠폰 코드입니다. (추천: PAW10 또는 WELCOME)');
    }
  };

  const handlePay = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      setTimeout(() => {
        completePayment(selectedMethod);
        setIsSuccess(false);
        setCouponApplied(false);
        setDiscountAmount(0);
        setCouponCode('');
      }, 1200);
    }, 1000);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content payment-modal">
        {/* Modal Header */}
        <div className="modal-header">
          <div className="header-title">
            <ShieldCheck size={22} color="#FF6B00" />
            <h3>안전 결제</h3>
          </div>
          <button className="close-btn" onClick={closePaymentModal}>
            <X size={20} />
          </button>
        </div>

        {isSuccess ? (
          <div className="success-state">
            <CheckCircle2 size={64} color="#10B981" className="success-icon" />
            <h4>결제가 성공적으로 완료되었습니다!</h4>
            <p>예약 및 서비스 이용 내역은 [내 반려견 프로필]에서 확인하실 수 있습니다.</p>
          </div>
        ) : (
          <div className="modal-body">
            {/* Product Summary */}
            <div className="order-summary-box">
              <span className="order-label">결제 항목</span>
              <h4 className="order-title">{paymentModalState.title || '1회 원포인트 방문 훈련 세션'}</h4>
              <div className="price-breakdown">
                <div className="breakdown-row">
                  <span>기본 금액</span>
                  <span>{originalAmount.toLocaleString()}원</span>
                </div>
                {couponApplied && (
                  <div className="breakdown-row discount">
                    <span>쿠폰 할인</span>
                    <span>-{discountAmount.toLocaleString()}원</span>
                  </div>
                )}
                <div className="breakdown-row total">
                  <span>최종 결제 금액</span>
                  <span className="total-price">{finalAmount.toLocaleString()}원</span>
                </div>
              </div>
            </div>

            {/* Coupon Code Input */}
            <div className="coupon-section">
              <label className="form-label">
                <Tag size={14} /> 할인 쿠폰 적용
              </label>
              <div className="coupon-input-group">
                <input
                  type="text"
                  className="form-input"
                  placeholder="쿠폰 코드 입력 (예: PAW10)"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  disabled={couponApplied}
                />
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  onClick={applyCoupon}
                  disabled={couponApplied || !couponCode.trim()}
                >
                  {couponApplied ? '적용완료' : '적용'}
                </button>
              </div>
              {couponApplied && (
                <span className="coupon-success-msg">✨ 10% 쿠폰 할인이 적용되었습니다!</span>
              )}
            </div>

            {/* Payment Method Selector */}
            <div className="methods-section">
              <label className="form-label">결제 수단 선택</label>
              <div className="method-grid">
                <button
                  type="button"
                  className={`method-card ${selectedMethod === 'kakaopay' ? 'active' : ''}`}
                  onClick={() => setSelectedMethod('kakaopay')}
                >
                  <span className="method-badge kakaopay">카카오페이</span>
                  <span className="method-sub">간편 결제</span>
                </button>

                <button
                  type="button"
                  className={`method-card ${selectedMethod === 'naverpay' ? 'active' : ''}`}
                  onClick={() => setSelectedMethod('naverpay')}
                >
                  <span className="method-badge naverpay">네이버페이</span>
                  <span className="method-sub">포인트 적립</span>
                </button>

                <button
                  type="button"
                  className={`method-card ${selectedMethod === 'card' ? 'active' : ''}`}
                  onClick={() => setSelectedMethod('card')}
                >
                  <CreditCard size={18} />
                  <span>신용/체크카드</span>
                </button>
              </div>
            </div>

            {/* Pay Button */}
            <button
              className="btn btn-primary btn-lg btn-full pay-submit-btn"
              onClick={handlePay}
              disabled={isProcessing}
            >
              {isProcessing ? '결제 처리 중...' : `${finalAmount.toLocaleString()}원 결제하기`}
            </button>
          </div>
        )}
      </div>

      <style jsx>{`
        .payment-modal {
          max-width: 480px;
        }

        .modal-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 16px;
          border-bottom: 1px solid var(--border-color);
          margin-bottom: 20px;
        }

        .header-title {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .header-title h3 {
          font-size: 1.15rem;
          color: #FFFFFF;
        }

        .close-btn {
          background: none;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
        }

        .order-summary-box {
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          padding: 16px;
          margin-bottom: 20px;
        }

        .order-label {
          font-size: 0.75rem;
          color: var(--text-muted);
          text-transform: uppercase;
        }

        .order-title {
          font-size: 1.05rem;
          color: #FFFFFF;
          margin: 4px 0 14px 0;
        }

        .price-breakdown {
          display: flex;
          flex-direction: column;
          gap: 8px;
          border-top: 1px dashed var(--border-color);
          padding-top: 12px;
          font-size: 0.9rem;
        }

        .breakdown-row {
          display: flex;
          justify-content: space-between;
          color: var(--text-muted);
        }

        .breakdown-row.discount {
          color: #10B981;
        }

        .breakdown-row.total {
          color: #FFFFFF;
          font-weight: 700;
          font-size: 1.05rem;
          margin-top: 4px;
        }

        .total-price {
          color: var(--primary);
          font-size: 1.25rem;
          font-weight: 800;
        }

        .coupon-section {
          margin-bottom: 20px;
        }

        .coupon-input-group {
          display: flex;
          gap: 8px;
        }

        .coupon-success-msg {
          font-size: 0.78rem;
          color: #10B981;
          margin-top: 6px;
          display: block;
        }

        .methods-section {
          margin-bottom: 24px;
        }

        .method-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
        }

        .method-card {
          background: var(--bg-input);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          padding: 12px 8px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          color: var(--text-main);
          font-size: 0.82rem;
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .method-card:hover {
          border-color: rgba(255, 255, 255, 0.2);
        }

        .method-card.active {
          border-color: var(--primary);
          background: rgba(255, 107, 0, 0.1);
        }

        .method-badge {
          font-weight: 800;
          font-size: 0.85rem;
          padding: 2px 6px;
          border-radius: 4px;
        }

        .method-badge.kakaopay {
          background: #FEE500;
          color: #000000;
        }

        .method-badge.naverpay {
          background: #03CF5D;
          color: #FFFFFF;
        }

        .method-sub {
          font-size: 0.68rem;
          color: var(--text-muted);
        }

        .pay-submit-btn {
          margin-top: 10px;
        }

        .success-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 30px 10px;
        }

        .success-icon {
          animation: pulseGlow 2s infinite;
          margin-bottom: 16px;
        }

        .success-state h4 {
          font-size: 1.2rem;
          color: #FFFFFF;
          margin-bottom: 8px;
        }

        .success-state p {
          font-size: 0.88rem;
          color: var(--text-muted);
        }
      `}</style>
    </div>
  );
};
