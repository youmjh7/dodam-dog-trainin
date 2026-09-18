import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { initialTrainers } from '../context/AppContext';
import { Calendar as CalendarIcon, Clock, MapPin, ShieldCheck, CreditCard, ChevronRight, Navigation } from 'lucide-react';

export function estimateKmFromAddress(addressStr) {
  if (!addressStr || addressStr.trim() === '') return 5;
  const addr = addressStr.toLowerCase();
  if (addr.includes('부곡동')) return 1; // 출발지 동일 부곡동 1km
  if (addr.includes('안산')) return 6; // 안산 타 지역 6km
  if (addr.includes('군포') || addr.includes('의왕')) return 11;
  if (addr.includes('시흥') || addr.includes('안양')) return 13;
  if (addr.includes('수원') || addr.includes('화성')) return 19;
  if (addr.includes('부천') || addr.includes('광명')) return 23;
  if (addr.includes('인천') || addr.includes('용인')) return 31;
  if (addr.includes('서울') || addr.includes('강남') || addr.includes('서초') || addr.includes('마포') || addr.includes('송파')) return 36;
  if (addr.includes('성남') || addr.includes('분당')) return 33;
  if (addr.includes('고양') || addr.includes('파주') || addr.includes('남양주')) return 50;
  return 25;
}

export const BookingView = () => {
  const { activePet, openPaymentModal, setActiveTab } = useApp();

  const [step, setStep] = useState(1);
  const [sessionCount, setSessionCount] = useState(1); // 1회 20만 / 2회이상 15만
  const [targetAddress, setTargetAddress] = useState('경기도 수원시 팔달구 매산로 123');
  const [calculatedKm, setCalculatedKm] = useState(18);

  const [selectedTrainer, setSelectedTrainer] = useState(initialTrainers[0]);
  const [calendarMonth, setCalendarMonth] = useState(9);
  const [bookingDate, setBookingDate] = useState('2026-09-23');
  const [timeSlot, setTimeSlot] = useState('14:00 - 15:30');

  // Daily AM / PM booking slots state (오전 1팀, 오후 1팀)
  const [bookedSchedule, setBookedSchedule] = useState({
    '2026-09-18': { am: true, pm: false },
    '2026-09-20': { am: false, pm: true },
    '2026-09-22': { am: true, pm: true },
    '2026-09-25': { am: true, pm: false },
    '2026-10-10': { am: false, pm: true },
  });

  // Admin Schedule Editing State & Password (@4865) Protection
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [adminEditDate, setAdminEditDate] = useState(null);
  const [showAdminPwModal, setShowAdminPwModal] = useState(false);
  const [adminPwInput, setAdminPwInput] = useState('');

  // Admin Member Management State
  const [showAdminMemberModal, setShowAdminMemberModal] = useState(false);
  const [memberSearchQuery, setMemberSearchQuery] = useState('');
  const [members, setMembers] = useState([
    { id: 'm-1', name: '김보호자 (마루맘)', email: 'user@pawcoach.kr', phone: '010-1234-5678', petName: '마루', breed: '포메라니안', completedSessions: 1, address: '경기도 안산시 상록구 부곡동 123', memo: '소리 짖음 1회 수료 완료 (회당 15만원 우대 적용중)', joinDate: '2026-08-15' },
    { id: 'm-2', name: '이보호자 (코코아빠)', email: 'coco@pawcoach.kr', phone: '010-9876-5432', petName: '코코', breed: '골든 리트리버', completedSessions: 0, address: '경기도 수원시 팔달구 매산로 45', memo: '신규 신청견. 산책 당김 집중 교정 예정.', joinDate: '2026-09-02' },
    { id: 'm-3', name: '박보호자 (초코맘)', email: 'choco@pawcoach.kr', phone: '010-5555-7777', petName: '초코', breed: '푸들', completedSessions: 2, address: '서울특별시 강남구 테헤란로 88', memo: '2회 수료 완료. 매트 피신 성공적.', joinDate: '2026-07-10' },
    { id: 'm-4', name: '최보호자 (루비맘)', email: 'ruby@pawcoach.kr', phone: '010-3333-4444', petName: '루비', breed: '비숑 프리제', completedSessions: 1, address: '경기도 군포시 산본동 500', memo: '1회 수료. 짖음 교정 양호.', joinDate: '2026-08-28' }
  ]);

  // SMS Phone Verification State
  const [adminAuthTab, setAdminAuthTab] = useState('sms'); // 'sms' or 'pw'
  const [adminPhone, setAdminPhone] = useState('010-1234-5678');
  const [smsSent, setSmsSent] = useState(false);
  const [smsCode, setSmsCode] = useState('');
  const [userInputCode, setUserInputCode] = useState('');

  const handleAdminAccessClick = () => {
    if (isAdminMode) {
      setIsAdminMode(false);
      alert('🔒 관리자 수정 모드가 해제되었습니다.');
    } else {
      setAdminPwInput('');
      setUserInputCode('');
      setSmsSent(false);
      setShowAdminPwModal(true);
    }
  };

  const handleSendSmsCode = () => {
    if (!adminPhone || adminPhone.trim().length < 10) {
      alert('휴대폰 번호를 올바르게 입력해주세요.');
      return;
    }
    const generated = String(Math.floor(1000 + Math.random() * 9000));
    setSmsCode(generated);
    setUserInputCode(generated);
    setSmsSent(true);
    alert(`📱 [문자 메시지 알림 수신]\n\n[멍선생 1:1 방문훈련]\n관리자 접속 인증번호는 [ ${generated} ] 입니다.\n(${adminPhone} 번호로 발송 완료)`);
  };

  const handleVerifySmsCode = (e) => {
    e.preventDefault();
    if (userInputCode === smsCode && smsCode !== '') {
      setIsAdminMode(true);
      setShowAdminPwModal(false);
      setSmsSent(false);
      setUserInputCode('');
      alert('🔓 휴대폰 문자 본인 인증 성공! 관리자 권한이 부여되었습니다.');
    } else {
      alert('❌ 인증번호가 올바르지 않습니다. 수신된 4자리 인증번호를 확인해주세요.');
    }
  };

  const handleAdminPwSubmit = (e) => {
    e.preventDefault();
    if (adminPwInput === '@4865') {
      setIsAdminMode(true);
      setShowAdminPwModal(false);
      alert('🔓 관리자 인증 성공! (비밀번호: @4865)\n\n달력 일정 및 회원 정보 관리 기능을 사용할 수 있습니다.');
    } else {
      alert('❌ 비밀번호가 올바르지 않습니다. (비밀번호: @4865)');
    }
  };

  useEffect(() => {
    const estimated = estimateKmFromAddress(targetAddress);
    setCalculatedKm(estimated);
  }, [targetAddress]);

  // 1회 이상 훈련 수료 강아지이거나 2회 이상 신청 시 회당 15만원 자동 할인!
  const hasCompletedBefore = activePet && (activePet.completedSessions >= 1);
  const baseFeePerSession = hasCompletedBefore ? 150000 : 200000;
  const totalTrainingFee = sessionCount * baseFeePerSession;
  const totalTravelFee = calculatedKm * 2000;
  const grandTotalFee = totalTrainingFee + totalTravelFee;

  const handleProceedToPayment = () => {
    openPaymentModal({
      title: `${sessionCount}회 방문 훈련 예약 (주소 거리 출장비 포함)`,
      amount: grandTotalFee,
      itemType: 'visit_booking',
      payload: {
        programName: `${sessionCount}회 방문 훈련`,
        price: grandTotalFee,
        trainerName: selectedTrainer.name,
        petName: activePet.name,
        date: bookingDate,
        timeSlot,
        address: targetAddress
      },
      onSuccess: () => {
        const isAmSlot = timeSlot.startsWith('10:00');
        setBookedSchedule(prev => ({
          ...prev,
          [bookingDate]: {
            am: isAmSlot ? true : (prev[bookingDate]?.am || false),
            pm: !isAmSlot ? true : (prev[bookingDate]?.pm || false),
          }
        }));
        setActiveTab('pet-profile');
      }
    });
  };

  return (
    <div className="booking-view container">
      {/* View Title */}
      <div className="booking-header">
        <div className="badge badge-orange">
          <ShieldCheck size={14} /> 출발지: 경기도 안산 (km당 2천원)
        </div>
        <h2>1:1 방문 훈련 예약 & 실시간 주소 거리 계산기</h2>
        <p>상세 자택 주소를 입력하면 안산 출발 주행 거리(km)와 출장비가 즉시 계산됩니다.</p>
      </div>

      {/* Important Notice Banner */}
      <div style={{ background: 'rgba(239, 68, 68, 0.12)', border: '1px solid #EF4444', borderRadius: '14px', padding: '18px 20px', marginBottom: '24px' }}>
        <div style={{ color: '#F87171', fontWeight: 'bold', fontSize: '1.05rem', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          📌 [필독 중요 사항] 도담 방문 훈련 범위 및 방식
        </div>
        <div style={{ color: '#FFF', fontSize: '1rem', fontWeight: 'bold' }}>
          🚫 대소변 훈련 미진행 | ❌ 간식 유혹·유인 훈련 NO! | ⭕ 바른 목줄(리드줄) 훈련 OK!
        </div>
        <p style={{ color: '#E2E8F0', fontSize: '0.88rem', margin: '4px 0 0 0', lineHeight: '1.5' }}>
          ※ <strong>대소변 훈련은 진행하지 않습니다.</strong> 짖음, 벨 반응, 분리불안, 산책 당김 교정에 집중하며, 훈련 성공 시 칭찬 보상 간식은 정상 제공됩니다.
        </p>
      </div>

      {/* Progress Steps Indicator */}
      <div className="steps-indicator">
        <div className={`step-item ${step >= 1 ? 'active' : ''}`}>
          <span className="step-num">1</span>
          <span className="step-txt">주소 & 거리계산</span>
        </div>
        <div className="step-line" />
        <div className={`step-item ${step >= 2 ? 'active' : ''}`}>
          <span className="step-num">2</span>
          <span className="step-txt">훈련사 선택</span>
        </div>
        <div className="step-line" />
        <div className={`step-item ${step >= 3 ? 'active' : ''}`}>
          <span className="step-num">3</span>
          <span className="step-txt">일정 선택</span>
        </div>
        <div className="step-line" />
        <div className={`step-item ${step >= 4 ? 'active' : ''}`}>
          <span className="step-num">4</span>
          <span className="step-txt">최종 정산</span>
        </div>
      </div>

      {/* Step 1: Session Count & Address Distance Calculator */}
      {step === 1 && (
        <div className="step-content">
          <h3 className="step-title">1단계: 방문 희망 주소 입력 & 훈련 횟수 선택</h3>

          <div className="calculator-box glass-card">

            <div className="form-group">
              <label className="form-label"><MapPin size={14} /> 방문 희망 자택 상세 주소 입력</label>
              <input
                type="text"
                className="form-input"
                placeholder="예: 서울시 강남구 테헤란로 123, 수원시 팔달구 매산로 45"
                value={targetAddress}
                onChange={(e) => setTargetAddress(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label"><Navigation size={14} /> 안산 출발 산출 거리 km (수정 가능)</label>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <input
                  type="number"
                  className="form-input"
                  style={{ width: '130px', color: '#FF8800', fontWeight: 'bold' }}
                  value={calculatedKm}
                  onChange={(e) => setCalculatedKm(Number(e.target.value))}
                />
                <span style={{ color: '#FFF', fontWeight: 'bold' }}>km</span>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}> (주소에 따른 거리 감지)</span>
              </div>
            </div>

            {/* Calculation Result Summary Box */}
            <div className="calc-summary-card">
              <div className="calc-row">
                <span>방문 훈련 기본비 ({sessionCount}회 세션):</span>
                <strong>{totalTrainingFee.toLocaleString()}원</strong>
              </div>
              <div className="calc-row">
                <span>거리 출장비 ({calculatedKm}km × 2,000원):</span>
                <strong className="travel-fee-text">+{totalTravelFee.toLocaleString()}원</strong>
              </div>
              <div className="calc-total-row">
                <span>최종 예상 결제액:</span>
                <span className="grand-total-price">{grandTotalFee.toLocaleString()}원</span>
              </div>
            </div>
          </div>

          <div className="step-actions">
            <button className="btn btn-primary btn-lg" onClick={() => setStep(2)}>
              다음: 훈련사 선택하기 <ChevronRight size={18} />
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Trainer Selection */}
      {step === 2 && (
        <div className="step-content">
          <h3 className="step-title">2단계: 담당 훈련사 선택</h3>
          <div className="trainers-select-grid">
            {initialTrainers.map((tr) => {
              const isSelected = selectedTrainer.id === tr.id;
              return (
                <div
                  key={tr.id}
                  className={`trainer-select-card glass-card ${isSelected ? 'selected' : ''}`}
                  onClick={() => setSelectedTrainer(tr)}
                >
                  <img src={tr.image} alt={tr.name} className="trainer-avatar" />
                  <div className="trainer-select-info">
                    <h4>{tr.name}</h4>
                    <span className="trainer-sub">{tr.title}</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="step-actions">
            <button className="btn btn-secondary" onClick={() => setStep(1)}>이전</button>
            <button className="btn btn-primary btn-lg" onClick={() => setStep(3)}>
              다음: 희망 일정 선택 <ChevronRight size={18} />
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Schedule (오전 1팀, 오후 1팀 정원) */}
      {step === 3 && (
        <div className="step-content">
          <h3 className="step-title">3단계: 방문 희망 날짜 선택 (1일 오전 1팀, 오후 1팀 제한)</h3>
          <div className="calendar-wrapper">
            <div className="calendar-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  onClick={() => setCalendarMonth(m => Math.max(9, m - 1))}
                >
                  ◀
                </button>
                <h4 style={{ margin: 0 }}><CalendarIcon size={18} /> 2026년 {calendarMonth}월 방문 예약 달력</h4>
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  onClick={() => setCalendarMonth(m => Math.min(10, m + 1))}
                >
                  ▶
                </button>
              </div>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <button
                  type="button"
                  onClick={handleAdminAccessClick}
                  style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '0.8rem', cursor: 'pointer', opacity: 0.6, display: 'flex', alignItems: 'center', gap: '4px' }}
                  title="관리자 비밀번호 인증 (4865)"
                >
                  🔒 {isAdminMode ? '⚙️ [관리자 수정중 - OFF]' : '관리자'}
                </button>
                <span className="badge badge-green">선택된 날짜: {bookingDate}</span>
              </div>
            </div>

            {isAdminMode && (
              <div style={{ background: 'rgba(139, 92, 246, 0.15)', border: '1px solid #8B5CF6', padding: '12px 14px', borderRadius: '10px', marginBottom: '16px', fontSize: '0.88rem', color: '#DDD6FE' }}>
                ⚙️ <strong>[관리자 일정 수정 모드]</strong> 수정하고 싶으신 날짜를 클릭하면 해당 날짜의 오전/오후 마감 상태 및 휴무를 자유롭게 변경할 수 있습니다.
              </div>
            )}

            <div className="calendar-days-header">
              <div>일</div><div>월</div><div>화</div><div>수</div><div>목</div><div>금</div><div>토</div>
            </div>

            <div className="calendar-grid">
              {/* Dynamic offset: 9월 offset = 2, 10월 offset = 4 */}
              {Array.from({ length: calendarMonth === 9 ? 2 : 4 }).map((_, i) => (
                <div key={`disabled-${i}`} className="day-cell disabled" />
              ))}

              {Array.from({ length: calendarMonth === 9 ? 30 : 31 }, (_, i) => i + 1).map((day) => {
                const monthStr = calendarMonth < 10 ? '0' + calendarMonth : calendarMonth;
                const dayStr = day < 10 ? '0' + day : day;
                const dateStr = `2026-${monthStr}-${dayStr}`;
                const defaultClosed = (calendarMonth === 9 && (day === 15 || day === 22)) || (calendarMonth === 10 && (day === 13 || day === 27));
                const sched = bookedSchedule[dateStr] || { am: false, pm: false };
                const fullyBooked = defaultClosed || (sched.am && sched.pm);
                const isSelected = bookingDate === dateStr;

                let statusText = '2팀 가능';
                let statusColor = '#34D399';
                if (fullyBooked) {
                  statusText = '마감';
                  statusColor = '#EF4444';
                } else if (sched.am && !sched.pm) {
                  statusText = '오후 1팀';
                  statusColor = '#F59E0B';
                } else if (!sched.am && sched.pm) {
                  statusText = '오전 1팀';
                  statusColor = '#F59E0B';
                }

                return (
                  <div
                    key={day}
                    className={`day-cell ${isSelected ? 'selected' : ''} ${fullyBooked ? 'closed' : ''}`}
                    style={{ border: isAdminMode ? '1px dashed #8B5CF6' : undefined }}
                    onClick={() => {
                      if (isAdminMode) {
                        setAdminEditDate(dateStr);
                      } else if (!fullyBooked) {
                        setBookingDate(dateStr);
                        if (sched.am && !sched.pm) setTimeSlot('14:00 - 15:30');
                        else if (!sched.am && sched.pm) setTimeSlot('10:00 - 11:30');
                      } else {
                        alert('선택하신 날짜는 오전/오후 2팀 예약이 모두 마감되었습니다.');
                      }
                    }}
                  >
                    <span className="day-num">{day}</span>
                    <span className="day-status" style={{ color: statusColor }}>{statusText}</span>
                  </div>
                );
              })}
            </div>

            {/* AM / PM Time Slot Selector */}
            {(() => {
              const curSched = bookedSchedule[bookingDate] || { am: false, pm: false };
              return (
                <div style={{ marginTop: '20px', borderTop: '1px dashed var(--border-color)', paddingTop: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <label className="form-label" style={{ margin: 0 }}>
                      <Clock size={14} /> 1일 2팀 정원 (오전 1팀 + 오후 1팀) 시간대 선택 ({bookingDate})
                    </label>
                    <span className="badge badge-purple">
                      {curSched.am && curSched.pm ? '❌ 전체 마감' : curSched.am ? '☀️ 오전마감 / 🌙 오후가능' : curSched.pm ? '☀️ 오전가능 / 🌙 오후마감' : '✨ 오전/오후 모두 가능 (2팀)'}
                    </span>
                  </div>

                  {/* Morning Session */}
                  <div style={{ marginBottom: '14px' }}>
                    <div style={{ fontSize: '0.82rem', color: '#F59E0B', fontWeight: 'bold', marginBottom: '6px' }}>☀️ 오전 훈련 타임 (1팀 정원)</div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
                      {['10:00 - 11:30'].map((slot) => {
                        const isAmBooked = curSched.am;
                        const isSlotActive = timeSlot === slot;
                        return (
                          <button
                            key={slot}
                            type="button"
                            disabled={isAmBooked}
                            className={`btn btn-sm ${isSlotActive ? 'btn-primary' : 'btn-secondary'}`}
                            style={{ opacity: isAmBooked ? 0.4 : 1, textDecoration: isAmBooked ? 'line-through' : 'none' }}
                            onClick={() => setTimeSlot(slot)}
                          >
                            {slot} {isAmBooked ? '(오전 마감)' : ''}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Afternoon Session */}
                  <div>
                    <div style={{ fontSize: '0.82rem', color: '#3B82F6', fontWeight: 'bold', marginBottom: '6px' }}>🌙 오후 훈련 타임 (1팀 정원)</div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                      {['13:00 - 14:30', '15:30 - 17:00', '19:00 - 20:30'].map((slot) => {
                        const isPmBooked = curSched.pm;
                        const isSlotActive = timeSlot === slot;
                        return (
                          <button
                            key={slot}
                            type="button"
                            disabled={isPmBooked}
                            className={`btn btn-sm ${isSlotActive ? 'btn-primary' : 'btn-secondary'}`}
                            style={{ opacity: isPmBooked ? 0.4 : 1, textDecoration: isPmBooked ? 'line-through' : 'none' }}
                            onClick={() => setTimeSlot(slot)}
                          >
                            {slot} {isPmBooked ? '(오후 마감)' : ''}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>

          <div className="step-actions">
            <button className="btn btn-secondary" onClick={() => setStep(2)}>이전</button>
            <button className="btn btn-primary btn-lg" onClick={() => setStep(4)}>
              다음: 최종 정산 확인 <ChevronRight size={18} />
            </button>
          </div>
        </div>
      )}

      {/* Step 4: Final Confirmation */}
      {step === 4 && (
        <div className="step-content">
          <h3 className="step-title">4단계: 최종 예약 정산</h3>
          <div className="confirmation-card glass-card">
            <div className="receipt-header">
              <h4>방문 훈련 정산 영수증</h4>
              <span className="price-tag font-heading">{grandTotalFee.toLocaleString()}원</span>
            </div>

            <div className="receipt-grid">
              <div className="receipt-item">
                <span className="r-label">반려견</span>
                <span className="r-val">🐶 {activePet.name} ({hasCompletedBefore ? '수료견 15만원 할인 적용' : '첫 훈련'})</span>
              </div>
              <div className="receipt-item">
                <span className="r-label">도착 자택 주소</span>
                <span className="r-val">{targetAddress}</span>
              </div>
              <div className="receipt-item">
                <span className="r-label">훈련 기본비 (1회 방문)</span>
                <span className="r-val">{totalTrainingFee.toLocaleString()}원</span>
              </div>
              <div className="receipt-item">
                <span className="r-label">출장 거리비 ({calculatedKm}km × 2천원)</span>
                <span className="r-val">+{totalTravelFee.toLocaleString()}원</span>
              </div>
            </div>
          </div>

          <div className="step-actions">
            <button className="btn btn-secondary" onClick={() => setStep(3)}>이전</button>
            <button className="btn btn-primary btn-lg pulse-element" onClick={handleProceedToPayment}>
              <CreditCard size={20} />
              {grandTotalFee.toLocaleString()}원 안전 결제하기
            </button>
          </div>
        </div>
      )}

      {/* Admin Date Schedule Edit Modal */}
      {adminEditDate && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.75)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
          <div className="glass-card" style={{ maxWidth: '440px', width: '100%', padding: '24px', background: '#151D2C', border: '1px solid #8B5CF6' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ color: '#FFF', margin: 0, fontSize: '1.15rem' }}>⚙️ [{adminEditDate}] 달력 일정 직접 수정</h3>
              <button onClick={() => setAdminEditDate(null)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '1.2rem', cursor: 'pointer' }}>✕</button>
            </div>

            {(() => {
              const curSched = bookedSchedule[adminEditDate] || { am: false, pm: false };
              return (
                <div>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '16px' }}>
                    원하시는 오전/오후 버튼을 누르면 달력의 해당 날짜 예약 가능 여부가 즉시 변경됩니다.
                  </p>

                  <div style={{ background: '#0F172A', padding: '14px', borderRadius: '10px', marginBottom: '16px', border: '1px solid var(--border-color)' }}>
                    {/* AM Slot Toggle */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', paddingBottom: '10px', borderBottom: '1px dashed var(--border-color)' }}>
                      <div>
                        <div style={{ color: '#F59E0B', fontWeight: 'bold', fontSize: '0.9rem' }}>☀️ 오전 훈련 슬롯 (10:00 - 11:30)</div>
                        <span style={{ fontSize: '0.78rem', color: curSched.am ? '#EF4444' : '#10B981', fontWeight: 'bold' }}>
                          현재 상태: {curSched.am ? '🔴 마감 (예약 불가)' : '🟢 오픈 (예약 가능)'}
                        </span>
                      </div>
                      <button
                        type="button"
                        className={`btn btn-sm ${curSched.am ? 'btn-primary' : 'btn-secondary'}`}
                        onClick={() => {
                          setBookedSchedule(prev => ({
                            ...prev,
                            [adminEditDate]: { ...(prev[adminEditDate] || { am: false, pm: false }), am: !curSched.am }
                          }));
                        }}
                      >
                        {curSched.am ? '🔓 오전 열기' : '🔒 오전 마감하기'}
                      </button>
                    </div>

                    {/* PM Slot Toggle */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <div style={{ color: '#3B82F6', fontWeight: 'bold', fontSize: '0.9rem' }}>🌙 오후 훈련 슬롯 (13:00~20:30)</div>
                        <span style={{ fontSize: '0.78rem', color: curSched.pm ? '#EF4444' : '#10B981', fontWeight: 'bold' }}>
                          현재 상태: {curSched.pm ? '🔴 마감 (예약 불가)' : '🟢 오픈 (예약 가능)'}
                        </span>
                      </div>
                      <button
                        type="button"
                        className={`btn btn-sm ${curSched.pm ? 'btn-primary' : 'btn-secondary'}`}
                        onClick={() => {
                          setBookedSchedule(prev => ({
                            ...prev,
                            [adminEditDate]: { ...(prev[adminEditDate] || { am: false, pm: false }), pm: !curSched.pm }
                          }));
                        }}
                      >
                        {curSched.pm ? '🔓 오후 열기' : '🔒 오후 마감하기'}
                      </button>
                    </div>
                  </div>

                  {/* Quick Presets */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '16px' }}>
                    <button
                      type="button"
                      className="btn btn-secondary btn-sm"
                      onClick={() => {
                        setBookedSchedule(prev => ({
                          ...prev,
                          [adminEditDate]: { am: true, pm: true }
                        }));
                      }}
                    >
                      🚫 하루 전체 휴무 (마감)
                    </button>
                    <button
                      type="button"
                      className="btn btn-accent btn-sm"
                      onClick={() => {
                        setBookedSchedule(prev => ({
                          ...prev,
                          [adminEditDate]: { am: false, pm: false }
                        }));
                      }}
                    >
                      ✨ 하루 전체 예약 가능
                    </button>
                  </div>

                  <button
                    type="button"
                    className="btn btn-primary btn-full"
                    style={{ width: '100%' }}
                    onClick={() => setAdminEditDate(null)}
                  >
                    수정 완료 및 저장
                  </button>
                </div>
              );
            })()}
          </div>
        </div>
      )}

      {/* Admin Auth Modal (Pure Phone SMS Code Authentication) */}
      {showAdminPwModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.75)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
          <div className="glass-card" style={{ maxWidth: '420px', width: '100%', padding: '24px', background: '#151D2C', border: '1px solid #8B5CF6' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <h3 style={{ color: '#FFF', margin: 0, fontSize: '1.15rem' }}>📱 관리자 휴대폰 SMS 본인 인증</h3>
              <button onClick={() => setShowAdminPwModal(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '1.2rem', cursor: 'pointer' }}>✕</button>
            </div>

            <form onSubmit={handleVerifySmsCode}>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.86rem', marginBottom: '14px' }}>
                등록된 관리자 휴대폰 번호로 발송된 4자리 인증번호를 입력하세요.
              </p>

              <div className="form-group" style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '6px' }}>휴대폰 번호</label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input
                    type="text"
                    placeholder="010-0000-0000"
                    value={adminPhone}
                    onChange={e => setAdminPhone(e.target.value)}
                    style={{ flex: 1, padding: '10px 12px', background: '#0F172A', border: '1px solid var(--border-color)', color: '#FFF', borderRadius: '8px', fontSize: '0.95rem' }}
                    required
                  />
                  <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    onClick={handleSendSmsCode}
                    style={{ whiteSpace: 'nowrap', fontWeight: 'bold' }}
                  >
                    {smsSent ? '🔄 재발송' : '📱 인증번호 발송'}
                  </button>
                </div>
              </div>

              {smsSent && (
                <div>
                  <div style={{ background: 'rgba(16, 185, 129, 0.15)', border: '1px solid #10B981', borderRadius: '10px', padding: '12px 14px', marginBottom: '14px' }}>
                    <div style={{ color: '#34D399', fontWeight: 'bold', fontSize: '0.88rem', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      📱 [문자 메시지 수신 완료] ({adminPhone})
                    </div>
                    <div style={{ color: '#FFF', fontSize: '0.95rem' }}>
                      수신 인증번호: <span style={{ color: '#F59E0B', fontWeight: '800', fontSize: '1.25rem', letterSpacing: '3px', background: 'rgba(0,0,0,0.4)', padding: '2px 10px', borderRadius: '6px', marginLeft: '4px' }}>{smsCode}</span>
                    </div>
                    <p style={{ color: '#94A3B8', fontSize: '0.78rem', margin: '6px 0 0 0' }}>
                      ※ 위 4자리 번호를 아래 칸에 입력하시고 [인증 확인 및 접속]을 클릭하세요.
                    </p>
                  </div>

                  <div className="form-group" style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', color: '#10B981', fontSize: '0.85rem', marginBottom: '6px', fontWeight: 'bold' }}>
                      ✅ 4자리 인증번호 입력
                    </label>
                    <input
                      type="text"
                      placeholder="인증번호 4자리"
                      value={userInputCode}
                      onChange={e => setUserInputCode(e.target.value)}
                      style={{ width: '100%', padding: '12px', background: '#0F172A', border: '1px solid #10B981', color: '#FFF', borderRadius: '8px', fontSize: '1.2rem', letterSpacing: '4px', textAlign: 'center' }}
                      maxLength={4}
                      autoFocus
                      required
                    />
                  </div>
                </div>
              )}

              <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                <button type="button" className="btn btn-secondary" style={{ flex: 1 }} onClick={() => setShowAdminPwModal(false)}>취소</button>
                <button type="submit" className="btn btn-primary" style={{ flex: 1 }} disabled={!smsSent}>
                  인증 확인 및 접속
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Admin Member Management Modal */}
      {showAdminMemberModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
          <div className="glass-card" style={{ maxWidth: '680px', width: '100%', padding: '24px', background: '#151D2C', border: '1px solid #8B5CF6', maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>
              <div>
                <h3 style={{ color: '#FFF', margin: 0, fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  👥 [관리자] 회원 정보 & 수료 관리 센터
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', margin: '4px 0 0 0' }}>
                  회원별 훈련 수료 횟수(completedSessions)를 직접 조정하거나 메모를 저장할 수 있습니다.
                </p>
              </div>
              <button onClick={() => setShowAdminMemberModal(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '1.4rem', cursor: 'pointer' }}>✕</button>
            </div>

            {/* Search Bar */}
            <div style={{ display: 'flex', gap: '10px', marginBottom: '16px' }}>
              <input
                type="text"
                placeholder="🔍 회원 이름, 강아지 이름, 전화번호 검색..."
                value={memberSearchQuery}
                onChange={e => setMemberSearchQuery(e.target.value)}
                style={{ flex: 1, padding: '10px 14px', background: '#0F172A', border: '1px solid var(--border-color)', color: '#FFF', borderRadius: '8px', fontSize: '0.88rem' }}
              />
            </div>

            {/* Member List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', maxHeight: '55vh', overflowY: 'auto' }}>
              {members
                .filter(m => {
                  if (!memberSearchQuery) return true;
                  const q = memberSearchQuery.toLowerCase();
                  return m.name.toLowerCase().includes(q) || m.petName.toLowerCase().includes(q) || (m.phone && m.phone.includes(q));
                })
                .map(m => {
                  const isVip = m.completedSessions >= 1;
                  return (
                    <div key={m.id} style={{ background: '#1E293B', border: isVip ? '1px solid #10B981' : '1px solid var(--border-color)', borderRadius: '12px', padding: '16px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', borderBottom: '1px dashed var(--border-color)', paddingBottom: '8px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <strong style={{ color: '#FFF', fontSize: '1.05rem' }}>👤 {m.name}</strong>
                          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>가입일: {m.joinDate}</span>
                        </div>
                        <span className={`badge ${isVip ? 'badge-green' : 'badge-purple'}`} style={{ fontSize: '0.78rem' }}>
                          {isVip ? `🎁 수료견 (회당 15만원 자동 할인)` : `🌱 첫 훈련 대상 (회당 20만원)`}
                        </span>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '0.85rem', color: '#E2E8F0', marginBottom: '12px' }}>
                        <div>🐶 <strong>반려견:</strong> {m.petName} ({m.breed || '품종미상'})</div>
                        <div>📞 <strong>연락처:</strong> {m.phone || '미등록'}</div>
                        <div>📧 <strong>이메일:</strong> {m.email}</div>
                        <div>🏠 <strong>주소:</strong> {m.address}</div>
                      </div>

                      {/* Completed Sessions Controls */}
                      <div style={{ background: '#0F172A', padding: '10px 14px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                        <span style={{ color: '#FFF', fontSize: '0.88rem', fontWeight: 'bold' }}>
                          🎓 훈련 수료 횟수: <span style={{ color: '#34D399', fontSize: '1.1rem' }}>{m.completedSessions}회</span>
                        </span>
                        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                          <button
                            type="button"
                            className="btn btn-secondary btn-sm"
                            style={{ padding: '2px 8px' }}
                            onClick={() => {
                              setMembers(prev => prev.map(item => item.id === m.id ? { ...item, completedSessions: Math.max(0, item.completedSessions - 1) } : item));
                            }}
                          >
                            - 1회
                          </button>
                          <button
                            type="button"
                            className="btn btn-primary btn-sm"
                            style={{ padding: '2px 8px' }}
                            onClick={() => {
                              setMembers(prev => prev.map(item => item.id === m.id ? { ...item, completedSessions: item.completedSessions + 1 } : item));
                            }}
                          >
                            + 1회 수료 추가
                          </button>
                        </div>
                      </div>

                      {/* Memo */}
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <input
                          type="text"
                          defaultValue={m.memo}
                          id={`b-memo-input-${m.id}`}
                          placeholder="관리자 메모..."
                          style={{ flex: 1, padding: '8px 10px', background: '#0F172A', border: '1px solid var(--border-color)', color: '#94A3B8', borderRadius: '6px', fontSize: '0.82rem' }}
                        />
                        <button
                          type="button"
                          className="btn btn-secondary btn-sm"
                          onClick={() => {
                            const el = document.getElementById(`b-memo-input-${m.id}`);
                            if (el) {
                              setMembers(prev => prev.map(item => item.id === m.id ? { ...item, memo: el.value } : item));
                              alert('💾 메모가 저장되었습니다.');
                            }
                          }}
                        >
                          저장
                        </button>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .booking-view { padding-top: 40px; padding-bottom: 60px; max-width: 800px; }
        .booking-header { text-align: center; margin-bottom: 30px; }
        .booking-header h2 { font-size: 2rem; color: #FFF; margin: 10px 0 6px 0; }
        .booking-header p { color: var(--text-muted); }
        .steps-indicator { display: flex; align-items: center; justify-content: space-between; margin-bottom: 30px; background: var(--bg-card); padding: 16px; border-radius: var(--radius-lg); border: 1px solid var(--border-color); }
        .step-item { display: flex; align-items: center; gap: 8px; color: var(--text-muted); }
        .step-item.active { color: #FFF; }
        .step-num { width: 28px; height: 28px; border-radius: 50%; background: rgba(255, 255, 255, 0.1); display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 0.85rem; }
        .step-item.active .step-num { background: var(--primary); color: #FFF; }
        .step-line { flex: 1; height: 1px; background: var(--border-color); margin: 0 8px; }
        .step-title { font-size: 1.3rem; color: #FFF; margin-bottom: 20px; }
        .calculator-box { padding: 24px; margin-bottom: 24px; }
        .calc-summary-card { background: rgba(255, 107, 0, 0.1); border: 1px solid var(--primary); padding: 18px; border-radius: 12px; margin-top: 16px; }
        .calc-row { display: flex; justify-content: space-between; color: var(--text-muted); font-size: 0.9rem; margin-bottom: 8px; }
        .travel-fee-text { color: #F59E0B; }
        .calc-total-row { display: flex; justify-content: space-between; align-items: center; border-top: 1px dashed var(--border-color); paddingTop: 12px; margin-top: 8px; color: #FFF; font-weight: bold; }
        .grand-total-price { font-size: 1.6rem; color: var(--primary); font-weight: 800; }
        .trainers-select-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-bottom: 30px; }
        .trainer-select-card { padding: 16px; display: flex; flex-direction: column; align-items: center; text-align: center; cursor: pointer; border: 1px solid var(--border-color); }
        .trainer-select-card.selected { border-color: var(--primary); background: rgba(255, 107, 0, 0.08); }
        .trainer-avatar { width: 60px; height: 60px; border-radius: 50%; object-fit: cover; margin-bottom: 8px; }
        .trainer-select-info h4 { font-size: 1rem; color: #FFF; }
        .trainer-sub { font-size: 0.75rem; color: var(--text-muted); }
        .form-card, .confirmation-card { padding: 24px; margin-bottom: 24px; }
        .receipt-header { display: flex; justify-content: space-between; align-items: center; padding-bottom: 14px; border-bottom: 1px solid var(--border-color); margin-bottom: 16px; }
        .receipt-header h4 { font-size: 1.15rem; color: #FFF; }
        .price-tag { font-size: 1.4rem; color: var(--primary); font-weight: 800; }
        .receipt-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; font-size: 0.9rem; }
        .receipt-item { display: flex; flex-direction: column; gap: 4px; }
        .r-label { font-size: 0.78rem; color: var(--text-muted); }
        .r-val { color: #FFF; font-weight: 600; }
        .step-actions { display: flex; justify-content: flex-end; gap: 12px; }
      `}</style>
    </div>
  );
};
