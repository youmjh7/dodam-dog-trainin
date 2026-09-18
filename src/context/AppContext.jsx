import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const initialPets = [
  {
    id: 'pet-1',
    name: '마루',
    breed: '포메라니안',
    age: '2살',
    weight: '3.4kg',
    gender: '수컷 (중성화)',
    completedSessions: 1,
    image: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=600&q=80',
    tags: ['분리불안', '외부 소리 짖음', '산책 당김'],
    trainingProgress: 68,
    vaccination: '5차 접종 완료 (광견병 완료)',
    notes: '손님이 올 때 벨소리에 예민하게 짖고 현관문으로 달려듭니다.'
  },
  {
    id: 'pet-2',
    name: '코코',
    breed: '골든 리트리버',
    age: '1살 6개월',
    weight: '24kg',
    gender: '암컷',
    completedSessions: 0,
    image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=600&q=80',
    tags: ['배변 실수', '입질/장난치기'],
    trainingProgress: 42,
    vaccination: '접종 완료',
    notes: '산책 시 다른 강아지를 보면 반가워서 강하게 줄을 당깁니다.'
  }
];

export const initialTrainers = [
  {
    id: 'tr-1',
    name: '강성훈 헤드 트레이너',
    title: '반려견 행동교정 1급 / 12년 경력',
    rating: 4.98,
    reviewsCount: 342,
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80',
    specialties: ['1:1 방문 훈련', '공격성 교정', '분리불안 케어'],
    bio: 'EBS 펫 행동 분석 자문위원 출신. 보호자와 반려견이 서로 신뢰하며 행복하게 동행할 수 있도록 맞춤형 긍정 강화 솔루션을 제공합니다.'
  },
  {
    id: 'tr-2',
    name: '이수진 수석 훈련사',
    title: '퍼피 교육 & 소형견 행동 전문가',
    rating: 4.95,
    reviewsCount: 218,
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    specialties: ['퍼피 맘 케어', '배변/산책 훈련', '소리 적응'],
    bio: '소형견의 섬세한 심리를 이해하는 1:1 맞춰진 부드러운 핸들링 전문가. 어릴 때 바른 습관을 잡아주는 골든타임 훈련을 책임집니다.'
  },
  {
    id: 'tr-3',
    name: '박진우 대형견 전문가',
    title: '경찰견/대형견 훈련 자격보유',
    rating: 4.97,
    reviewsCount: 189,
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80',
    specialties: ['대형견 제어', '산책 리드줄 트레이닝', '사회화 세션'],
    bio: '대형견 및 활동량이 많은 중형견의 리드줄 제어와 타인/타견과의 평화로운 산책 트레이닝 전문.'
  }
];

export const initialChatMessages = [
  {
    id: 'msg-1',
    sender: 'trainer',
    senderName: '강성훈 훈련사',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=150&q=80',
    text: '안녕하세요 보호자님! 마루의 외부 소리 짖음 동영상을 올려주시면 타임라인별 행동 분석 피드백을 안내해 드리겠습니다.',
    time: '오전 10:15',
    media: null
  },
  {
    id: 'msg-2',
    sender: 'user',
    senderName: '나 (보호자)',
    text: '선생님! 어제 현관 밖 택배 소리에 마루가 크게 짖었던 상황을 촬영해봤어요.',
    time: '오전 10:30',
    media: {
      type: 'video',
      url: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=800&q=80',
      caption: '택배 소리 반응 동영상 (0:45)'
    }
  },
  {
    id: 'msg-3',
    sender: 'trainer',
    senderName: '강성훈 훈련사',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=150&q=80',
    text: '영상 잘 확인했습니다! 0:12초 지점을 보면 밖에서 발소리가 날 때 마루 귀가 먼저 뒤로 넘어간 뒤 짖음이 유발됩니다. 방문 훈련 시 도어벨 소리 탈감작 훈련과 매트 피신(Mat Stay) 기법을 1회 방문(15만원) 세션에서 직접 코칭해 드리겠습니다.',
    time: '오전 10:34',
    adviceTags: ['도어벨 탈감작', '매트 피신 훈련', '소리 간식 보상']
  }
];

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState({
    name: '김보호',
    email: 'puppy_lover@dodam.pe.kr',
    phone: '010-9876-5432',
    isLoggedIn: true,
    pawPassActive: false,
    pawPassExpireDate: null,
    aiCredits: 3,
    consultationTickets: 1
  });

  const [pets, setPets] = useState(() => {
    const saved = localStorage.getItem('pawcoach_pets');
    return saved ? JSON.parse(saved) : initialPets;
  });

  const [activePetId, setActivePetId] = useState('pet-1');

  const [bookings, setBookings] = useState(() => {
    const saved = localStorage.getItem('pawcoach_bookings');
    return saved ? JSON.parse(saved) : [
      {
        id: 'bk-101',
        programName: '1회 원포인트 방문 훈련',
        price: 150000,
        trainerName: '강성훈 헤드 트레이너',
        petName: '마루',
        date: '2026-09-22',
        timeSlot: '14:00 - 15:30',
        address: '서울시 강남구 테헤란로 123 멍멍빌딩 402호',
        status: '예약 확정',
        paidAt: '2026-09-15',
        paymentMethod: '카카오페이'
      }
    ];
  });

  const [chatMessages, setChatMessages] = useState(() => {
    const saved = localStorage.getItem('pawcoach_chat');
    return saved ? JSON.parse(saved) : initialChatMessages;
  });

  const [aiStudioPhotos, setAiStudioPhotos] = useState(() => {
    const saved = localStorage.getItem('pawcoach_ai_photos');
    return saved ? JSON.parse(saved) : [];
  });

  const [activeTab, setActiveTab] = useState('home');
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [petModalOpen, setPetModalOpen] = useState(false);
  const [editingPet, setEditingPet] = useState(null);
  
  // Payment Modal State
  const [paymentModalState, setPaymentModalState] = useState({
    isOpen: false,
    title: '',
    amount: 0,
    itemType: '', // 'visit_booking', 'pawpass', 'ai_credits', 'consultation_ticket'
    payload: null,
    onSuccess: null
  });

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('pawcoach_pets', JSON.stringify(pets));
  }, [pets]);

  useEffect(() => {
    localStorage.setItem('pawcoach_bookings', JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem('pawcoach_chat', JSON.stringify(chatMessages));
  }, [chatMessages]);

  useEffect(() => {
    localStorage.setItem('pawcoach_ai_photos', JSON.stringify(aiStudioPhotos));
  }, [aiStudioPhotos]);

  const activePet = pets.find((p) => p.id === activePetId) || pets[0];

  // Helper actions
  const addPet = (newPetData) => {
    const newId = `pet-${Date.now()}`;
    const createdPet = { id: newId, trainingProgress: 10, ...newPetData };
    setPets((prev) => [...prev, createdPet]);
    setActivePetId(newId);
  };

  const updatePet = (petId, updatedData) => {
    setPets((prev) => prev.map((p) => (p.id === petId ? { ...p, ...updatedData } : p)));
  };

  const addBooking = (bookingData) => {
    const newBooking = {
      id: `bk-${Math.floor(1000 + Math.random() * 9000)}`,
      status: '예약 확정',
      paidAt: new Date().toISOString().split('T')[0],
      ...bookingData
    };
    setBookings((prev) => [newBooking, ...prev]);
    return newBooking;
  };

  const sendChatMessage = (text, media = null) => {
    const newMsg = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      senderName: user.name,
      text,
      time: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' }),
      media
    };

    setChatMessages((prev) => [...prev, newMsg]);

    // Simulated Trainer/AI response after 1.5s
    setTimeout(() => {
      const autoResponse = {
        id: `msg-reply-${Date.now()}`,
        sender: 'trainer',
        senderName: 'PawCoach AI 훈련 매니저',
        avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=150&q=80',
        text: `[자동 행동 분석] 보내주신 ${media ? '영상/사진' : '질문'}을 분석하였습니다. ${activePet.name}(${activePet.breed})의 행동 특성에 맞춰 1:1 코칭 가이드를 전송해 드릴게요. 1회 방문 훈련(15만원) 신청 시 실제 훈련사가 댁으로 방문하여 현장 실습을 도와드립니다.`,
        time: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' }),
        adviceTags: ['행동 교정 팁', '긍정 강화 간식', '1회 15만원 방문상담 가능']
      };
      setChatMessages((prev) => [...prev, autoResponse]);
    }, 1500);
  };

  const addAiStudioPhoto = (photoObj) => {
    setAiStudioPhotos((prev) => [photoObj, ...prev]);
  };

  const openPaymentModal = ({ title, amount, itemType, payload, onSuccess }) => {
    setPaymentModalState({
      isOpen: true,
      title,
      amount,
      itemType,
      payload,
      onSuccess
    });
  };

  const closePaymentModal = () => {
    setPaymentModalState((prev) => ({ ...prev, isOpen: false }));
  };

  const completePayment = (paymentMethod) => {
    const { amount, itemType, payload, onSuccess } = paymentModalState;

    if (itemType === 'pawpass') {
      setUser((prev) => ({
        ...prev,
        pawPassActive: true,
        pawPassExpireDate: '2026-10-16',
        aiCredits: prev.aiCredits + 20
      }));
    } else if (itemType === 'ai_credits') {
      setUser((prev) => ({
        ...prev,
        aiCredits: prev.aiCredits + (payload?.credits || 10)
      }));
    } else if (itemType === 'visit_booking') {
      addBooking({
        ...payload,
        paymentMethod
      });
    }

    if (onSuccess) {
      onSuccess({ paymentMethod, amount });
    }

    closePaymentModal();
  };

  // Dog Apps State
  const [customApps, setCustomApps] = useState(() => {
    const saved = localStorage.getItem('pawcoach_custom_apps');
    return saved ? JSON.parse(saved) : [
      {
        id: 'app-1',
        title: '도담 1:1 방문 훈련 & 출장비 계산기',
        category: '훈련 & 케어',
        icon: 'C:/Users/yh119/.gemini/antigravity-ide/brain/d1190999-c97c-46b2-bc69-6a72f60c7688/dodam_mascot_seamless_1789574475756.jpg',
        description: '염정화 행동교정 전문가의 안산 출발 거리에 따른 1:1 방문 훈련 신청 및 투명 출장비 자동 계산기 앱',
        appUrl: '#booking',
        badge: '공식 앱',
        badgeColor: '#10B981',
        author: '염정화 행동교정 전문가',
        downloads: '1,240회',
        rating: 4.9,
        actionTab: 'booking'
      },
      {
        id: 'app-2',
        title: '도담 AI 강아지 테마 스튜디오',
        category: 'AI & 사진',
        icon: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=300&q=80',
        description: '우리 강아지 얼굴로 산타, 훈련사, 생일파티, 우주비행사 AI 컨셉 프로필 화보를 제작하는 스튜디오 앱',
        appUrl: '#ai-studio',
        badge: '인기',
        badgeColor: '#F59E0B',
        author: '도담 AI 랩',
        downloads: '3,890회',
        rating: 5.0,
        actionTab: 'ai-studio'
      },
      {
        id: 'app-3',
        title: '도담 1:1 훈련사 영상 챗 상담소',
        category: '1:1 행동 상담',
        icon: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=300&q=80',
        description: '소리 짖음, 분리불안 동영상을 훈련사에게 올리고 1:1 타임라인 피드백을 받는 영상 챗 앱',
        appUrl: '#consultation',
        badge: '추천',
        badgeColor: '#8B5CF6',
        author: '도담 행동클리닉',
        downloads: '2,150회',
        rating: 4.9,
        actionTab: 'consultation'
      },
      {
        id: 'app-4',
        title: '도담 강아지 건강 & 수제간식 레시피 가이드',
        category: '건강 & 영양',
        icon: 'https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?auto=format&fit=crop&w=300&q=80',
        description: '강아지가 먹으면 안 되는 금지 음식 사전과 건강 수제 간식 맞춤 영양 레시피 계산 앱',
        appUrl: '#treat-guide',
        badge: 'NEW',
        badgeColor: '#EF4444',
        author: '염정화 전문가 픽',
        downloads: '980회',
        rating: 4.8
      },
      {
        id: 'app-5',
        title: '우리 아이 훈련 성장 다이어리',
        category: '다이어리 & 기록',
        icon: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=300&q=80',
        description: '산책 시간, 배변 상태, 짖음 교정 훈련 기록을 한눈에 관리하는 차트 다이어리 앱',
        appUrl: '#diary',
        badge: 'NEW',
        badgeColor: '#06B6D4',
        author: '도담 소프트',
        downloads: '1,500회',
        rating: 4.9
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem('pawcoach_custom_apps', JSON.stringify(customApps));
  }, [customApps]);

  const addCustomApp = (newApp) => {
    setCustomApps((prev) => [
      {
        id: `app-${Date.now()}`,
        ...newApp
      },
      ...prev
    ]);
  };

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        pets,
        activePet,
        activePetId,
        setActivePetId,
        addPet,
        updatePet,
        bookings,
        addBooking,
        chatMessages,
        sendChatMessage,
        aiStudioPhotos,
        addAiStudioPhoto,
        customApps,
        addCustomApp,
        activeTab,
        setActiveTab,
        authModalOpen,
        setAuthModalOpen,
        petModalOpen,
        setPetModalOpen,
        editingPet,
        setEditingPet,
        paymentModalState,
        openPaymentModal,
        closePaymentModal,
        completePayment
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
