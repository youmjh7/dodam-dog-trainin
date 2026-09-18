import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { X, Dog, Camera, Sparkles } from 'lucide-react';

export const PetModal = () => {
  const { petModalOpen, setPetModalOpen, editingPet, addPet, updatePet } = useApp();

  const [formData, setFormData] = useState({
    name: '',
    breed: '포메라니안',
    age: '1살',
    weight: '3.5kg',
    gender: '수컷 (중성화)',
    image: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=600&q=80',
    tags: ['분리불안', '소리 짖음'],
    vaccination: '접종 완료',
    notes: ''
  });

  useEffect(() => {
    if (editingPet) {
      setFormData(editingPet);
    } else {
      setFormData({
        name: '',
        breed: '포메라니안',
        age: '1살',
        weight: '3.5kg',
        gender: '수컷 (중성화)',
        image: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=600&q=80',
        tags: ['분리불안'],
        vaccination: '접종 완료',
        notes: ''
      });
    }
  }, [editingPet, petModalOpen]);

  if (!petModalOpen) return null;

  const availableTags = ['분리불안', '외부 소리 짖음', '산책 줄 당김', '배변 실수', '입질/장난치기', '공격성', '낯선 사람 경계'];

  const toggleTag = (tag) => {
    setFormData((prev) => {
      const exists = prev.tags.includes(tag);
      return {
        ...prev,
        tags: exists ? prev.tags.filter((t) => t !== tag) : [...prev.tags, tag]
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      alert('반려견 이름을 입력해주세요.');
      return;
    }

    if (editingPet) {
      updatePet(editingPet.id, formData);
    } else {
      addPet(formData);
    }

    setPetModalOpen(false);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content pet-modal">
        <div className="modal-header">
          <div className="header-title">
            <Dog size={22} color="#FF6B00" />
            <h3>{editingPet ? '반려견 프로필 수정' : '새 반려견 등록'}</h3>
          </div>
          <button className="close-btn" onClick={() => setPetModalOpen(false)}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Avatar Preview */}
          <div className="avatar-upload-box">
            <img src={formData.image} alt="preview" className="avatar-img" />
            <div className="avatar-info">
              <span className="avatar-label">프로필 이미지 URL</span>
              <input
                type="text"
                className="form-input form-input-sm"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              />
            </div>
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">이름 *</label>
              <input
                type="text"
                className="form-input"
                placeholder="예: 마루, 코코"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">견종 *</label>
              <input
                type="text"
                className="form-input"
                placeholder="예: 포메라니안, 리트리버"
                value={formData.breed}
                onChange={(e) => setFormData({ ...formData, breed: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="form-grid trio">
            <div className="form-group">
              <label className="form-label">나이</label>
              <input
                type="text"
                className="form-input"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="form-label">체중</label>
              <input
                type="text"
                className="form-input"
                value={formData.weight}
                onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="form-label">성별</label>
              <select
                className="form-select"
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
              >
                <option value="수컷 (중성화)">수컷 (중성화)</option>
                <option value="수컷">수컷</option>
                <option value="암컷 (중성화)">암컷 (중성화)</option>
                <option value="암컷">암컷</option>
              </select>
            </div>
          </div>

          {/* Behavior Tags */}
          <div className="form-group">
            <label className="form-label">주요 문제 행동 선택 (다중 선택)</label>
            <div className="tag-chips-grid">
              {availableTags.map((tag) => {
                const isSelected = formData.tags.includes(tag);
                return (
                  <button
                    key={tag}
                    type="button"
                    className={`tag-chip ${isSelected ? 'active' : ''}`}
                    onClick={() => toggleTag(tag)}
                  >
                    {isSelected ? '✓ ' : '+ '}{tag}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">참고사항 및 행동 설명</label>
            <textarea
              className="form-textarea"
              rows={2}
              placeholder="예: 벨 소리에 짖음이 심하고, 낯선 사람 방문 시 경계합니다."
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            />
          </div>

          <button type="submit" className="btn btn-primary btn-full btn-lg">
            {editingPet ? '수정 내용 저장' : '반려견 등록 완료'}
          </button>
        </form>
      </div>

      <style jsx>{`
        .pet-modal {
          max-width: 500px;
        }

        .avatar-upload-box {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 20px;
          background: rgba(255, 255, 255, 0.04);
          padding: 12px;
          border-radius: var(--radius-md);
        }

        .avatar-img {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid var(--primary);
        }

        .avatar-info {
          flex: 1;
        }

        .avatar-label {
          font-size: 0.75rem;
          color: var(--text-muted);
          display: block;
          margin-bottom: 4px;
        }

        .form-input-sm {
          padding: 6px 10px;
          font-size: 0.8rem;
        }

        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        .form-grid.trio {
          grid-template-columns: 1fr 1fr 1.2fr;
        }

        .tag-chips-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }

        .tag-chip {
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-full);
          padding: 5px 12px;
          font-size: 0.8rem;
          color: var(--text-muted);
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .tag-chip.active {
          background: rgba(255, 107, 0, 0.15);
          border-color: var(--primary);
          color: #FF8800;
          font-weight: 700;
        }
      `}</style>
    </div>
  );
};
