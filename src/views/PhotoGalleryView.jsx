import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Image, Heart, Plus, Sparkles } from 'lucide-react';

export const PhotoGalleryView = () => {
  const { activePet, user } = useApp();

  const [photos, setPhotos] = useState([
    {
      id: 'photo-1',
      author: '마루맘',
      dogName: '마루',
      breed: '포메라니안',
      imageUrl: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=600&q=80',
      caption: '오늘 산책 다녀와서 신나게 웃고 있는 마루입니다! 🐾❤️',
      likes: 24,
      date: '2026-09-15'
    },
    {
      id: 'photo-2',
      author: '코코아빠',
      dogName: '코코',
      breed: '골든 리트리버',
      imageUrl: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=600&q=80',
      caption: '잔디밭에서 원반던지기 노는 코코! 날씨가 너무 좋았어요',
      likes: 38,
      date: '2026-09-14'
    },
    {
      id: 'photo-3',
      author: '멍선생매니아',
      dogName: '초코',
      breed: '푸들',
      imageUrl: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=600&q=80',
      caption: '새 미용 하고 견생샷 건졌어요 ㅎㅎ 귀엽나요?',
      likes: 45,
      date: '2026-09-16'
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [caption, setCaption] = useState('');
  const [imageUrl, setImageUrl] = useState(activePet?.image || 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=600&q=80');

  const handleAdd = (e) => {
    e.preventDefault();
    if (!caption.trim()) return;

    const newP = {
      id: `photo-${Date.now()}`,
      author: user.name || '보호자님',
      dogName: activePet.name,
      breed: activePet.breed,
      imageUrl,
      caption,
      likes: 1,
      date: new Date().toISOString().split('T')[0]
    };

    setPhotos([newP, ...photos]);
    setShowModal(false);
    setCaption('');
    alert('우리 강아지 사진이 자랑 포토 갤러리에 추가되었습니다!');
  };

  const handleLike = (id) => {
    setPhotos(photos.map((p) => (p.id === id ? { ...p, likes: p.likes + 1 } : p)));
  };

  return (
    <div className="photo-gallery-view container">
      <div className="gallery-header">
        <div>
          <h2>📸 우리 강아지 포토 갤러리</h2>
          <p>사랑스러운 댕댕이 사진을 자랑하고 다른 보호자분들과 하트를 주고받아 보세요!</p>
        </div>
        <button className="btn btn-accent" onClick={() => setShowModal(true)}>
          <Plus size={18} /> 강아지 사진 올리기
        </button>
      </div>

      <div className="photos-grid">
        {photos.map((p) => (
          <div key={p.id} className="photo-card glass-card">
            <img src={p.imageUrl} alt={p.dogName} className="photo-img" />
            <div className="photo-body">
              <div className="photo-top">
                <h4>🐶 {p.dogName} ({p.breed})</h4>
                <span className="photo-author">by {p.author}</span>
              </div>
              <p className="photo-caption">{p.caption}</p>
              <div className="photo-footer">
                <button className="like-btn" onClick={() => handleLike(p.id)}>
                  ❤️ 좋아요 {p.likes}
                </button>
                <span className="photo-date">{p.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content glass-card">
            <h3>📸 우리 강아지 사진 올리기</h3>
            <form onSubmit={handleAdd}>
              <div className="form-group">
                <label className="form-label">사진 이미지 URL</label>
                <input
                  type="text"
                  className="form-input"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="form-label">자랑글 / 설명</label>
                <textarea
                  className="form-textarea"
                  rows={3}
                  placeholder="우리 아이의 귀여운 모습이나 자랑거리를 써주세요!"
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  required
                />
              </div>
              <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
                <button type="button" className="btn btn-secondary btn-full" onClick={() => setShowModal(false)}>취소</button>
                <button type="submit" className="btn btn-accent btn-full">갤러리에 공유하기</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style jsx>{`
        .photo-gallery-view { padding-top: 30px; padding-bottom: 60px; }
        .gallery-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
        .gallery-header h2 { color: #FFF; font-size: 1.8rem; }
        .gallery-header p { color: var(--text-muted); font-size: 0.9rem; }
        .photos-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 20px; }
        .photo-card { padding: 0; overflow: hidden; }
        .photo-img { width: 100%; height: 240px; object-fit: cover; }
        .photo-body { padding: 16px; }
        .photo-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
        .photo-top h4 { color: #FFF; font-size: 1.05rem; }
        .photo-author { font-size: 0.75rem; color: var(--text-muted); }
        .photo-caption { color: var(--text-muted); font-size: 0.88rem; margin-bottom: 14px; line-height: 1.4; }
        .photo-footer { display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border-color); padding-top: 10px; }
        .like-btn { background: rgba(255, 107, 0, 0.15); border: none; color: #FF8800; padding: 6px 12px; border-radius: 20px; cursor: pointer; font-size: 0.85rem; font-weight: bold; }
        .photo-date { font-size: 0.75rem; color: var(--text-muted); }
      `}</style>
    </div>
  );
};
