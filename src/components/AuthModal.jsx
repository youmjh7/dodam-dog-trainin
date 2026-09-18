import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, User, Mail, Lock, Phone, Dog, ShieldCheck, CheckCircle2, 
  MapPin, Gift, Eye, EyeOff, ChevronRight, ChevronLeft, Check, Sparkles
} from 'lucide-react';

export const AuthModal = () => {
  const { authModalOpen, setAuthModalOpen, user, setUser, setPets, setActivePetId } = useApp();
  
  // Tab: 'signup' or 'login'
  const [isLoginMode, setIsLoginMode] = useState(false);
  
  // Multi-step for Signup: 1 (계정 정보), 2 (반려견 프로필), 3 (약관 & 완료)
  const [step, setStep] = useState(1);
  
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    // SMS verification
    smsCodeSent: false,
    smsCode: '',
    smsVerified: false,
    // Pet Info
    dogName: '',
    dogBreed: '포메라니안',
    dogCustomBreed: '',
    dogGender: 'male_neutered', // 'male', 'male_neutered', 'female', 'female_neutered'
    dogAge: '2', // years/months
    trainingConcerns: ['짖음/분리불안'], // array of selected concern tags
    // Address
    address: '',
    addressDetail: '',
    // Terms
    agreeAll: false,
    agreeTerms: false,
    agreePrivacy: false,
    agreeLocation: false,
    agreeMarketing: true,
  });

  // UI state
  const [showPassword, setShowPassword] = useState(false);
  const [emailChecked, setEmailChecked] = useState(false);

  if (!authModalOpen) return null;

  // Pre-defined popular breeds
  const breedOptions = [
    '포메라니안', '말티즈', '토이푸들', '비숑 프리제', '시바견', 
    '진돗개', '골든리트리버', '치와와', '닥스훈트', '웰시코기', '믹스견', '직접 입력'
  ];

  // Training concern options
  const concernOptions = [
    { id: '짖음/분리불안', label: '🛑 짖음 & 분리불안' },
    { id: '배변 훈련', label: '💩 배변 훈련' },
    { id: '산책 줄당김', label: '🐕 산책 줄당김' },
    { id: '입질/공격성', label: '⚠️ 입질 & 공격성' },
    { id: '기본 예절/사회성', label: '🎓 기본 예절 & 사회성' },
    { id: '슬개골/건강관리', label: '🦴 슬개골/건강케어' }
  ];

  const handleToggleConcern = (concernId) => {
    setFormData((prev) => {
      const exists = prev.trainingConcerns.includes(concernId);
      const updated = exists 
        ? prev.trainingConcerns.filter(c => c !== concernId)
        : [...prev.trainingConcerns, concernId];
      return { ...prev, trainingConcerns: updated };
    });
  };

  const handleAgreeAllToggle = () => {
    const nextVal = !formData.agreeAll;
    setFormData((prev) => ({
      ...prev,
      agreeAll: nextVal,
      agreeTerms: nextVal,
      agreePrivacy: nextVal,
      agreeLocation: nextVal,
      agreeMarketing: nextVal,
    }));
  };

  const handleCheckEmailDuplicate = () => {
    if (!formData.email || !formData.email.includes('@')) {
      alert('올바른 이메일 주소를 입력해 주세요.');
      return;
    }
    setEmailChecked(true);
    alert('✅ 사용 가능한 이메일 주소입니다.');
  };

  const handleSendSms = () => {
    if (!formData.phone || formData.phone.length < 10) {
      alert('올바른 휴대폰 번호를 입력해 주세요.');
      return;
    }
    setFormData(prev => ({ ...prev, smsCodeSent: true }));
    alert('📱 인증번호가 발송되었습니다. [테스트 인증번호: 1234]');
  };

  const handleVerifySms = () => {
    if (formData.smsCode === '1234' || formData.smsCode.length === 4) {
      setFormData(prev => ({ ...prev, smsVerified: true }));
      alert('✅ 휴대폰 본인 인증이 완료되었습니다!');
    } else {
      alert('❌ 인증번호가 일치하지 않습니다. (테스트 번호: 1234)');
    }
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    if (step === 1) {
      if (!formData.name.trim()) {
        alert('보호자 이름을 입력해 주세요.');
        return;
      }
      if (!formData.email.trim() || !formData.email.includes('@')) {
        alert('올바른 이메일을 입력해 주세요.');
        return;
      }
      if (!formData.password || formData.password.length < 6) {
        alert('비밀번호는 6자리 이상이어야 합니다.');
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        alert('비밀번호 확인이 일치하지 않습니다.');
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (!formData.dogName.trim()) {
        alert('반려견 이름을 입력해 주세요.');
        return;
      }
      setStep(3);
    }
  };

  const handleSubmitSignup = (e) => {
    e.preventDefault();
    if (!formData.agreeTerms || !formData.agreePrivacy) {
      alert('필수 약관 항목(서비스 이용약관, 개인정보 수집)에 동의해야 가입이 가능합니다.');
      return;
    }

    const finalBreed = formData.dogBreed === '직접 입력' ? (formData.dogCustomBreed || '믹스견') : formData.dogBreed;

    // Add pet to pet list if pet name specified
    if (formData.dogName.trim()) {
      const newPet = {
        id: `pet-${Date.now()}`,
        name: formData.dogName.trim(),
        breed: finalBreed,
        age: `${formData.dogAge}살`,
        gender: formData.dogGender.includes('female') ? '암컷' : '수컷',
        isNeutered: formData.dogGender.includes('neutered'),
        image: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=300&auto=format&fit=crop&q=80',
        weight: '4.5kg',
        concerns: formData.trainingConcerns.join(', ')
      };

      setPets((prev) => [newPet, ...prev]);
      setActivePetId(newPet.id);
    }

    // Update user state
    setUser((prev) => ({
      ...prev,
      name: formData.name || '신규 보호자',
      email: formData.email,
      phone: formData.phone || '010-0000-0000',
      isLoggedIn: true,
      hasWelcomeCoupon: true
    }));

    alert(`🎉 [도담 회원가입 완료!]\n\n${formData.name} 보호자님 환영합니다!`);
    setAuthModalOpen(false);
  };

  const handleSubmitLogin = (e) => {
    e.preventDefault();
    if (!formData.email.trim()) {
      alert('이메일 주소를 입력해 주세요.');
      return;
    }

    setUser((prev) => ({
      ...prev,
      name: formData.name || '김보호자',
      email: formData.email,
      isLoggedIn: true
    }));

    alert('🔑 도담 서비스에 성공적으로 로그인 되었습니다!');
    setAuthModalOpen(false);
  };

  const handleSocialLogin = (provider) => {
    const providerName = provider === 'kakao' ? '카카오' : provider === 'naver' ? '네이버' : '구글';
    setUser((prev) => ({
      ...prev,
      name: `${providerName} 보호자`,
      email: `${provider}_user@dodam.kr`,
      isLoggedIn: true
    }));

    alert(`🎉 ${providerName} 간편 가입 완료!`);
    setAuthModalOpen(false);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content auth-modal glass-card">
        {/* Modal Header */}
        <div className="modal-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div className="header-title" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div className="title-icon-badge">
              <Dog size={22} color="#FF6B00" />
            </div>
            <div>
              <h3 className="auth-header-h3">
                {isLoginMode ? '도담 로그인' : '도담 멤버십 회원가입'}
              </h3>
              <p className="auth-header-sub">1:1 맞춤 방문 훈련 & 스마트 반려견 케어</p>
            </div>
          </div>
          <button className="close-btn" onClick={() => setAuthModalOpen(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
            <X size={20} />
          </button>
        </div>

        {/* Promo Benefit Banner */}
        {!isLoginMode && (
          <div className="signup-benefit-banner">
            <span>✨ 도담 1:1 맞춤 방문 훈련 서비스 회원 가입</span>
          </div>
        )}

        {/* Mode Switcher Tabs */}
        <div className="auth-tabs">
          <button
            type="button"
            className={`auth-tab ${!isLoginMode ? 'active' : ''}`}
            onClick={() => { setIsLoginMode(false); setStep(1); }}
          >
            <Sparkles size={14} /> 신규 회원가입 (쿠폰혜택)
          </button>
          <button
            type="button"
            className={`auth-tab ${isLoginMode ? 'active' : ''}`}
            onClick={() => setIsLoginMode(true)}
          >
            <User size={14} /> 기존 회원 로그인
          </button>
        </div>



        {/* LOGIN FORM */}
        {isLoginMode ? (
          <form onSubmit={handleSubmitLogin} className="auth-form">
            <div className="form-group">
              <label className="form-label"><Mail size={14} /> 이메일 주소 *</label>
              <input
                type="email"
                className="form-input"
                placeholder="example@dodam.pe.kr"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label"><Lock size={14} /> 비밀번호 *</label>
              <div className="password-input-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="form-input"
                  placeholder="비밀번호 입력"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                />
                <button
                  type="button"
                  className="toggle-pw-btn"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button type="submit" className="btn btn-primary btn-lg btn-full auth-submit-btn">
              🔑 로그인하기
            </button>
          </form>
        ) : (
          /* MULTI-STEP SIGNUP FORM */
          <div className="signup-wizard-wrapper">
            {/* Step Progress Bar */}
            <div className="step-indicator">
              <div className={`step-item ${step >= 1 ? 'active' : ''} ${step > 1 ? 'completed' : ''}`}>
                <span className="step-num">{step > 1 ? <Check size={12} /> : '1'}</span>
                <span className="step-txt">계정 정보</span>
              </div>
              <div className="step-line"></div>
              <div className={`step-item ${step >= 2 ? 'active' : ''} ${step > 2 ? 'completed' : ''}`}>
                <span className="step-num">{step > 2 ? <Check size={12} /> : '2'}</span>
                <span className="step-txt">반려견 프로필</span>
              </div>
              <div className="step-line"></div>
              <div className={`step-item ${step >= 3 ? 'active' : ''}`}>
                <span className="step-num">3</span>
                <span className="step-txt">약관 동의</span>
              </div>
            </div>

            {/* STEP 1: ACCOUNT INFO */}
            {step === 1 && (
              <form onSubmit={handleNextStep} className="auth-form">
                <div className="form-group">
                  <label className="form-label"><User size={14} /> 보호자 성함 *</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="예: 홍길동"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label"><Mail size={14} /> 이메일 주소 *</label>
                  <div className="input-with-action">
                    <input
                      type="email"
                      className="form-input"
                      placeholder="example@dodam.pe.kr"
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                        setEmailChecked(false);
                      }}
                      required
                    />
                    <button
                      type="button"
                      className="btn btn-secondary btn-sm input-action-btn"
                      onClick={handleCheckEmailDuplicate}
                    >
                      {emailChecked ? '✓ 확인됨' : '중복확인'}
                    </button>
                  </div>
                </div>

                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label"><Lock size={14} /> 비밀번호 *</label>
                    <input
                      type="password"
                      className="form-input"
                      placeholder="6자리 이상"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">비밀번호 확인 *</label>
                    <input
                      type="password"
                      className="form-input"
                      placeholder="비밀번호 재입력"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      required
                    />
                  </div>
                </div>
                {formData.password && formData.confirmPassword && (
                  <div className={`form-hint ${formData.password === formData.confirmPassword ? 'success' : 'error'}`}>
                    {formData.password === formData.confirmPassword 
                      ? '✓ 비밀번호가 일치합니다.' 
                      : '✕ 비밀번호가 일치하지 않습니다.'}
                  </div>
                )}

                <div className="form-group">
                  <label className="form-label"><Phone size={14} /> 휴대폰 번호 (선택/인증)</label>
                  <div className="input-with-action">
                    <input
                      type="tel"
                      className="form-input"
                      placeholder="010-0000-0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                    <button
                      type="button"
                      className="btn btn-secondary btn-sm input-action-btn"
                      onClick={handleSendSms}
                    >
                      {formData.smsCodeSent ? '재발송' : '인증발송'}
                    </button>
                  </div>
                </div>

                {formData.smsCodeSent && !formData.smsVerified && (
                  <div className="form-group sms-verify-box">
                    <div className="input-with-action">
                      <input
                        type="text"
                        className="form-input"
                        placeholder="인증번호 4자리 (1234)"
                        value={formData.smsCode}
                        onChange={(e) => setFormData({ ...formData, smsCode: e.target.value })}
                      />
                      <button
                        type="button"
                        className="btn btn-primary btn-sm input-action-btn"
                        onClick={handleVerifySms}
                      >
                        확인
                      </button>
                    </div>
                  </div>
                )}
                {formData.smsVerified && (
                  <div className="form-hint success">✓ 휴대폰 본인 인증이 완료되었습니다.</div>
                )}

                <button type="submit" className="btn btn-primary btn-lg btn-full wizard-next-btn">
                  다음 단계: 반려견 프로필 입력 <ChevronRight size={16} />
                </button>
              </form>
            )}

            {/* STEP 2: PET PROFILE */}
            {step === 2 && (
              <form onSubmit={handleNextStep} className="auth-form">
                <div className="form-group">
                  <label className="form-label"><Dog size={14} color="#FF6B00" /> 반려견 이름 *</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="예: 마루, 뽀삐, 초코"
                    value={formData.dogName}
                    onChange={(e) => setFormData({ ...formData, dogName: e.target.value })}
                    required
                  />
                </div>

                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">견종 선택 *</label>
                    <select
                      className="form-select"
                      value={formData.dogBreed}
                      onChange={(e) => setFormData({ ...formData, dogBreed: e.target.value })}
                    >
                      {breedOptions.map(b => <option key={b} value={b}>{b}</option>)}
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">나이 (살)</label>
                    <input
                      type="number"
                      className="form-input"
                      placeholder="예: 2"
                      value={formData.dogAge}
                      onChange={(e) => setFormData({ ...formData, dogAge: e.target.value })}
                    />
                  </div>
                </div>

                {formData.dogBreed === '직접 입력' && (
                  <div className="form-group">
                    <label className="form-label">견종 직접 입력</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="견종 이름을 입력해 주세요"
                      value={formData.dogCustomBreed}
                      onChange={(e) => setFormData({ ...formData, dogCustomBreed: e.target.value })}
                    />
                  </div>
                )}

                <div className="form-group">
                  <label className="form-label">성별 및 중성화 여부</label>
                  <div className="gender-btn-group">
                    {[
                      { id: 'male_neutered', label: '♂️ 수컷 (중성화 O)' },
                      { id: 'male', label: '♂️ 수컷 (중성화 X)' },
                      { id: 'female_neutered', label: '♀️ 암컷 (중성화 O)' },
                      { id: 'female', label: '♀️ 암컷 (중성화 X)' },
                    ].map(g => (
                      <button
                        key={g.id}
                        type="button"
                        className={`gender-chip ${formData.dogGender === g.id ? 'active' : ''}`}
                        onClick={() => setFormData({ ...formData, dogGender: g.id })}
                      >
                        {g.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">주된 훈련 고민 (다중 선택)</label>
                  <div className="concern-chips">
                    {concernOptions.map(c => {
                      const isSelected = formData.trainingConcerns.includes(c.id);
                      return (
                        <button
                          key={c.id}
                          type="button"
                          className={`concern-chip ${isSelected ? 'active' : ''}`}
                          onClick={() => handleToggleConcern(c.id)}
                        >
                          {c.label} {isSelected && '✓'}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="wizard-btn-group">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setStep(1)}
                  >
                    <ChevronLeft size={16} /> 이전
                  </button>
                  <button type="submit" className="btn btn-primary wizard-flex-btn">
                    다음 단계: 약관 동의 <ChevronRight size={16} />
                  </button>
                </div>
              </form>
            )}

            {/* STEP 3: TERMS & SUBMIT */}
            {step === 3 && (
              <form onSubmit={handleSubmitSignup} className="auth-form">
                <div className="form-group">
                  <label className="form-label"><MapPin size={14} /> 자택 주소 (방문 훈련용/선택)</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="예: 경기도 안산시 상록구 광덕산안길 12"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  />
                </div>

                {/* Terms Checkboxes */}
                <div className="terms-box">
                  <label className="terms-row agree-all">
                    <input
                      type="checkbox"
                      checked={formData.agreeAll}
                      onChange={handleAgreeAllToggle}
                    />
                    <span className="agree-all-txt">전체 약관 및 혜택 수신 동의</span>
                  </label>
                  <div className="terms-divider"></div>
                  <label className="terms-row">
                    <input
                      type="checkbox"
                      checked={formData.agreeTerms}
                      onChange={(e) => setFormData({ ...formData, agreeTerms: e.target.checked })}
                      required
                    />
                    <span>[필수] 도담 이용약관 동의</span>
                  </label>
                  <label className="terms-row">
                    <input
                      type="checkbox"
                      checked={formData.agreePrivacy}
                      onChange={(e) => setFormData({ ...formData, agreePrivacy: e.target.checked })}
                      required
                    />
                    <span>[필수] 개인정보 수집 및 이용 동의</span>
                  </label>
                  <label className="terms-row">
                    <input
                      type="checkbox"
                      checked={formData.agreeLocation}
                      onChange={(e) => setFormData({ ...formData, agreeLocation: e.target.checked })}
                    />
                    <span>[선택] 위치기반 방문 훈련 서비스 이용 동의</span>
                  </label>
                  <label className="terms-row">
                    <input
                      type="checkbox"
                      checked={formData.agreeMarketing}
                      onChange={(e) => setFormData({ ...formData, agreeMarketing: e.target.checked })}
                    />
                    <span>[선택] 15,000원 쿠폰 및 이벤트 마케팅 수신 동의</span>
                  </label>
                </div>

                <div className="wizard-btn-group">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setStep(2)}
                  >
                    <ChevronLeft size={16} /> 이전
                  </button>
                  <button type="submit" className="btn btn-primary wizard-flex-btn btn-lg">
                    🎉 회원가입 완료 및 쿠폰받기
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>

      <style jsx>{`
        .auth-modal {
          max-width: 480px;
          width: 100%;
        }

        .auth-header-h3 {
          color: #FFF;
          font-size: 1.25rem;
          font-weight: 800;
          margin: 0;
        }

        .auth-header-sub {
          font-size: 0.75rem;
          color: var(--text-muted);
          margin-top: 2px;
        }

        .title-icon-badge {
          width: 38px;
          height: 38px;
          border-radius: 10px;
          background: rgba(255, 107, 0, 0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .signup-benefit-banner {
          background: linear-gradient(135deg, rgba(255, 107, 0, 0.2) 0%, rgba(245, 158, 11, 0.15) 100%);
          border: 1px solid rgba(255, 107, 0, 0.3);
          border-radius: var(--radius-md);
          padding: 10px 14px;
          font-size: 0.82rem;
          color: #FF8800;
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 16px;
        }

        .signup-benefit-banner strong {
          color: #FFF;
          text-decoration: underline;
        }

        .auth-tabs {
          display: flex;
          background: rgba(255, 255, 255, 0.05);
          border-radius: var(--radius-md);
          padding: 4px;
          margin-bottom: 16px;
          gap: 4px;
        }

        .auth-tab {
          flex: 1;
          padding: 9px 12px;
          border: none;
          background: none;
          color: var(--text-muted);
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
          border-radius: var(--radius-sm);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          transition: all 0.2s;
        }

        .auth-tab.active {
          background: linear-gradient(135deg, var(--primary) 0%, #FF8800 100%);
          color: #FFFFFF;
          font-weight: 700;
          box-shadow: 0 4px 12px rgba(255, 107, 0, 0.25);
        }



        /* Step Progress Indicator */
        .step-indicator {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          padding: 10px 16px;
          margin-bottom: 16px;
        }

        .step-item {
          display: flex;
          align-items: center;
          gap: 6px;
          opacity: 0.45;
          transition: all 0.2s;
        }

        .step-item.active {
          opacity: 1;
        }

        .step-num {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.1);
          color: #FFF;
          font-size: 0.72rem;
          font-weight: bold;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .step-item.active .step-num {
          background: var(--primary);
        }

        .step-item.completed .step-num {
          background: #10B981;
        }

        .step-txt {
          font-size: 0.8rem;
          font-weight: 600;
          color: #FFF;
        }

        .step-line {
          flex: 1;
          height: 1px;
          background: var(--border-color);
          margin: 0 8px;
        }

        .auth-form {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }

        .password-input-wrapper {
          position: relative;
        }

        .toggle-pw-btn {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
        }

        .input-with-action {
          display: flex;
          gap: 8px;
        }

        .input-action-btn {
          white-space: nowrap;
          flex-shrink: 0;
        }

        .form-hint {
          font-size: 0.78rem;
          margin-top: -6px;
        }
        .form-hint.success { color: #34D399; }
        .form-hint.error { color: #EF4444; }

        .gender-btn-group {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 6px;
        }

        .gender-chip {
          padding: 8px 10px;
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--border-color);
          color: var(--text-muted);
          font-size: 0.78rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.15s;
          text-align: center;
        }

        .gender-chip.active {
          background: rgba(255, 107, 0, 0.15);
          border-color: var(--primary);
          color: #FFF;
        }

        .concern-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }

        .concern-chip {
          padding: 6px 10px;
          border-radius: 99px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--border-color);
          color: var(--text-muted);
          font-size: 0.76rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.15s;
        }

        .concern-chip.active {
          background: rgba(16, 185, 129, 0.18);
          border-color: #10B981;
          color: #34D399;
        }

        .wizard-btn-group {
          display: flex;
          gap: 10px;
          margin-top: 10px;
        }

        .wizard-flex-btn {
          flex: 1;
        }

        .terms-box {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          padding: 14px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .terms-row {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.82rem;
          color: var(--text-muted);
          cursor: pointer;
        }

        .agree-all {
          color: #FFF;
          font-weight: bold;
          font-size: 0.88rem;
        }

        .terms-divider {
          height: 1px;
          background: var(--border-color);
        }
      `}</style>
    </div>
  );
};
