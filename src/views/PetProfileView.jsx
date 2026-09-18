import React from 'react';
import { useApp } from '../context/AppContext';
import { Dog, Plus, Edit, Calendar, ShieldCheck, Tag, Heart, Award, Sparkles, CheckCircle2 } from 'lucide-react';

export const PetProfileView = () => {
  const { pets, activePet, setActivePetId, setPetModalOpen, setEditingPet, bookings, aiStudioPhotos, user } = useApp();

  return (
    <div className="pet-profile-view container">
      {/* Profile Header */}
      <div className="profile-header glass-card">
        <div className="user-info-row">
          <div className="user-avatar-badge">
            <Dog size={28} color="#FF6B00" />
          </div>
          <div className="user-text">
            <h3>{user.name} 보호자님</h3>
            <span className="user-email">{user.email} · {user.phone}</span>
          </div>
          <div className="user-membership-badge">
            {user.pawPassActive ? (
              <span className="badge badge-purple font-heading">👑 PawPass VIP 회원</span>
            ) : (
              <span className="badge badge-orange font-heading">일반 회원</span>
            )}
          </div>
        </div>
      </div>

      {/* Pet Selector Cards */}
      <div className="section-title-row">
        <h3>🐶 나의 반려견 리스트 ({pets.length})</h3>
        <button
          className="btn btn-secondary btn-sm"
          onClick={() => {
            setEditingPet(null);
            setPetModalOpen(true);
          }}
        >
          <Plus size={16} /> 새 반려견 추가
        </button>
      </div>

      <div className="pets-grid">
        {pets.map((pet) => {
          const isSelected = pet.id === activePet.id;
          return (
            <div
              key={pet.id}
              className={`pet-card glass-card ${isSelected ? 'selected' : ''}`}
              onClick={() => setActivePetId(pet.id)}
            >
              <div className="pet-card-top">
                <img src={pet.image} alt={pet.name} className="pet-img" />
                <div className="pet-main-info">
                  <div className="name-row">
                    <h4>{pet.name}</h4>
                    <span className="pet-breed-chip">{pet.breed}</span>
                  </div>
                  <span className="pet-sub-details">
                    {pet.age} · {pet.weight} · {pet.gender}
                  </span>
                </div>
                <button
                  className="edit-pet-btn"
                  title="프로필 수정"
                  onClick={(e) => {
                    e.stopPropagation();
                    setEditingPet(pet);
                    setPetModalOpen(true);
                  }}
                >
                  <Edit size={16} />
                </button>
              </div>

              {/* Training Progress Meter */}
              <div className="progress-box">
                <div className="progress-labels">
                  <span>훈련 행동 개선도</span>
                  <span className="progress-val">{pet.trainingProgress}%</span>
                </div>
                <div className="progress-bar-bg">
                  <div
                    className="progress-bar-fill"
                    style={{ width: `${pet.trainingProgress}%` }}
                  />
                </div>
              </div>

              {/* Behavior Tags */}
              <div className="pet-tags-list">
                {pet.tags.map((tag, idx) => (
                  <span key={idx} className="badge badge-orange">{tag}</span>
                ))}
              </div>

              {pet.notes && (
                <p className="pet-notes-snippet">📝 {pet.notes}</p>
              )}
            </div>
          );
        })}
      </div>

      {/* Bookings & Receipts History */}
      <div className="history-section">
        <h3>📅 방문 훈련 예약 내역 ({bookings.length})</h3>
        {bookings.length === 0 ? (
          <div className="empty-box glass-card">
            <p>아직 진행된 방문 훈련 예약이 없습니다.</p>
          </div>
        ) : (
          <div className="bookings-list">
            {bookings.map((bk) => (
              <div key={bk.id} className="booking-record-card glass-card">
                <div className="bk-status-row">
                  <span className="badge badge-green">
                    <CheckCircle2 size={12} /> {bk.status}
                  </span>
                  <span className="bk-id">예약번호 #{bk.id}</span>
                </div>
                <div className="bk-main">
                  <h4>{bk.programName}</h4>
                  <span className="bk-price">{(bk.price || 150000).toLocaleString()}원</span>
                </div>
                <div className="bk-details-grid">
                  <div><span>담당 훈련사:</span> {bk.trainerName}</div>
                  <div><span>방문 일시:</span> {bk.date} ({bk.timeSlot})</div>
                  <div><span>방문 장소:</span> {bk.address}</div>
                  <div><span>결제 수단:</span> {bk.paymentMethod || '카카오페이'}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <style jsx>{`
        .pet-profile-view {
          padding-top: 30px;
          padding-bottom: 60px;
        }

        .profile-header {
          padding: 24px;
          margin-bottom: 30px;
        }

        .user-info-row {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .user-avatar-badge {
          width: 52px;
          height: 52px;
          border-radius: 50%;
          background: rgba(255, 107, 0, 0.15);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .user-text h3 {
          font-size: 1.25rem;
          color: #FFFFFF;
        }

        .user-email {
          font-size: 0.85rem;
          color: var(--text-muted);
        }

        .user-membership-badge {
          margin-left: auto;
        }

        .section-title-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }

        .section-title-row h3, .history-section h3 {
          font-size: 1.2rem;
          color: #FFFFFF;
        }

        .pets-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
          margin-bottom: 40px;
        }

        @media (max-width: 768px) {
          .pets-grid {
            grid-template-columns: 1fr;
          }
        }

        .pet-card {
          padding: 20px;
          cursor: pointer;
          border: 1px solid var(--border-color);
          transition: all var(--transition-fast);
        }

        .pet-card.selected {
          border-color: var(--primary);
          box-shadow: 0 0 20px rgba(255, 107, 0, 0.15);
        }

        .pet-card-top {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 16px;
        }

        .pet-img {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          object-fit: cover;
        }

        .pet-main-info {
          flex: 1;
        }

        .name-row {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .name-row h4 {
          font-size: 1.15rem;
          color: #FFFFFF;
        }

        .pet-breed-chip {
          font-size: 0.75rem;
          background: rgba(255, 255, 255, 0.08);
          padding: 2px 8px;
          border-radius: 99px;
          color: var(--text-muted);
        }

        .pet-sub-details {
          font-size: 0.8rem;
          color: var(--text-muted);
        }

        .edit-pet-btn {
          background: rgba(255, 255, 255, 0.08);
          border: none;
          color: var(--text-muted);
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }

        .progress-box {
          margin-bottom: 14px;
        }

        .progress-labels {
          display: flex;
          justify-content: space-between;
          font-size: 0.78rem;
          color: var(--text-muted);
          margin-bottom: 4px;
        }

        .progress-val {
          color: var(--primary);
          font-weight: 700;
        }

        .progress-bar-bg {
          height: 8px;
          background: rgba(255, 255, 255, 0.08);
          border-radius: 99px;
          overflow: hidden;
        }

        .progress-bar-fill {
          height: 100%;
          background: linear-gradient(90deg, var(--primary) 0%, var(--secondary) 100%);
          border-radius: 99px;
        }

        .pet-tags-list {
          display: flex;
          flex-wrap: wrap;
          gap: 4px;
          margin-bottom: 10px;
        }

        .pet-notes-snippet {
          font-size: 0.8rem;
          color: var(--text-muted);
          background: rgba(0, 0, 0, 0.2);
          padding: 8px 12px;
          border-radius: var(--radius-sm);
        }

        .bookings-list {
          display: flex;
          flex-direction: column;
          gap: 14px;
          margin-top: 16px;
        }

        .booking-record-card {
          padding: 20px;
        }

        .bk-status-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
        }

        .bk-id {
          font-size: 0.78rem;
          color: var(--text-muted);
        }

        .bk-main {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }

        .bk-main h4 {
          font-size: 1.1rem;
          color: #FFFFFF;
        }

        .bk-price {
          font-size: 1.15rem;
          font-weight: 800;
          color: var(--primary);
        }

        .bk-details-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
          font-size: 0.85rem;
          color: var(--text-muted);
          border-top: 1px dashed var(--border-color);
          padding-top: 12px;
        }

        .bk-details-grid span {
          color: #FFFFFF;
        }
      `}</style>
    </div>
  );
};
