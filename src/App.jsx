import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { PaymentModal } from './components/PaymentModal';
import { PetModal } from './components/PetModal';
import { AuthModal } from './components/AuthModal';

import { HomeView } from './views/HomeView';
import { BookingView } from './views/BookingView';
import { ConsultationView } from './views/ConsultationView';
import { QnaView } from './views/QnaView';
import { PhotoGalleryView } from './views/PhotoGalleryView';
import { AiStudioView } from './views/AiStudioView';
import { MembershipView } from './views/MembershipView';
import { PetProfileView } from './views/PetProfileView';
import { AppStoreView } from './views/AppStoreView';

const MainContent = () => {
  const { activeTab } = useApp();

  return (
    <main className="main-content">
      {activeTab === 'home' && <HomeView />}
      {activeTab === 'booking' && <BookingView />}
      {activeTab === 'consultation' && <ConsultationView />}
      {activeTab === 'qna' && <QnaView />}
      {(activeTab === 'photoboard' || activeTab === 'photo-gallery') && <PhotoGalleryView />}
      {activeTab === 'ai-studio' && <AiStudioView />}
      {(activeTab === 'app-store' || activeTab === 'appstore') && <AppStoreView />}
      {activeTab === 'membership' && <MembershipView />}
      {(activeTab === 'pet-profile' || activeTab === 'profile') && <PetProfileView />}
    </main>
  );
};

export function App() {
  return (
    <AppProvider>
      <div className="app-container">
        <Header />
        <MainContent />
        <BottomNav />
        <PaymentModal />
        <PetModal />
        <AuthModal />
      </div>
    </AppProvider>
  );
}

export default App;
