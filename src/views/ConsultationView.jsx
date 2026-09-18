import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MessageSquare, Send, Paperclip, Video, Image as ImageIcon, Sparkles, CheckCircle, Calendar, Tag } from 'lucide-react';

export const ConsultationView = () => {
  const { chatMessages, sendChatMessage, activePet, setActiveTab } = useApp();
  const [inputText, setInputText] = useState('');
  const [selectedTag, setSelectedTag] = useState('외부 소리 짖음');
  const [attachedMedia, setAttachedMedia] = useState(null);

  const tags = ['외부 소리 짖음', '분리불안', '산책 당김', '배변 실수', '입질/장난치기'];

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputText.trim() && !attachedMedia) return;

    sendChatMessage(inputText, attachedMedia);
    setInputText('');
    setAttachedMedia(null);
  };

  const simulateMediaUpload = () => {
    setAttachedMedia({
      type: 'photo',
      url: activePet.image || 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=800&q=80',
      caption: `${activePet.name}의 행동 관찰 사진`
    });
  };

  return (
    <div className="consultation-view container">
      {/* View Title */}
      <div className="consult-header">
        <div className="header-info">
          <h2>1:1 영상 & 사진 챗 상담실</h2>
          <p>
            현재 <strong>{activePet.name}</strong>({activePet.breed})의 고민 행동을 사진이나 영상으로 전달해 주세요.
          </p>
        </div>
        <button
          className="btn btn-primary btn-sm"
          onClick={() => setActiveTab('booking')}
        >
          <Calendar size={16} /> 1회 방문 훈련 신청 (15만원)
        </button>
      </div>

      {/* Behavior Tag Selector */}
      <div className="tags-bar">
        <span className="tags-label"><Tag size={14} /> 문제 행동 주제:</span>
        <div className="tags-scroll">
          {tags.map((tag) => (
            <button
              key={tag}
              type="button"
              className={`tag-btn ${selectedTag === tag ? 'active' : ''}`}
              onClick={() => setSelectedTag(tag)}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Room Window */}
      <div className="chat-window glass-card">
        <div className="messages-area">
          {chatMessages.map((msg) => {
            const isUser = msg.sender === 'user';
            return (
              <div key={msg.id} className={`message-row ${isUser ? 'user' : 'trainer'}`}>
                {!isUser && (
                  <img src={msg.avatar} alt={msg.senderName} className="msg-avatar" />
                )}
                <div className="msg-bubble-group">
                  <div className="msg-info font-heading">
                    <span className="sender-name">{msg.senderName}</span>
                    <span className="msg-time">{msg.time}</span>
                  </div>

                  <div className={`msg-bubble ${isUser ? 'user-bubble' : 'trainer-bubble'}`}>
                    <p>{msg.text}</p>

                    {msg.media && (
                      <div className="msg-media-box">
                        <img src={msg.media.url} alt="attached media" className="msg-media-img" />
                        <span className="msg-media-caption">📷 {msg.media.caption}</span>
                      </div>
                    )}

                    {msg.adviceTags && (
                      <div className="msg-advice-tags">
                        {msg.adviceTags.map((t, idx) => (
                          <span key={idx} className="badge badge-purple">{t}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Input Form */}
        <form className="chat-input-bar" onSubmit={handleSend}>
          {attachedMedia && (
            <div className="attached-preview-chip">
              <span>📷 {attachedMedia.caption} 첨부됨</span>
              <button type="button" onClick={() => setAttachedMedia(null)}>✕</button>
            </div>
          )}

          <div className="input-group">
            <button
              type="button"
              className="attach-btn"
              title="사진/영상 첨부 시뮬레이션"
              onClick={simulateMediaUpload}
            >
              <Paperclip size={20} />
            </button>
            <input
              type="text"
              className="chat-input"
              placeholder={`${activePet.name}의 행동 및 상황에 대해 질문해주세요...`}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
            <button type="submit" className="send-btn">
              <Send size={18} />
            </button>
          </div>
        </form>
      </div>

      <style jsx>{`
        .consultation-view {
          padding-top: 30px;
          padding-bottom: 50px;
          max-width: 900px;
        }

        .consult-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
        }

        .consult-header h2 {
          font-size: 1.8rem;
          color: #FFFFFF;
        }

        .consult-header p {
          color: var(--text-muted);
          font-size: 0.9rem;
        }

        .tags-bar {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 16px;
        }

        .tags-label {
          font-size: 0.82rem;
          color: var(--text-muted);
          display: flex;
          align-items: center;
          gap: 4px;
          white-space: nowrap;
        }

        .tags-scroll {
          display: flex;
          gap: 8px;
          overflow-x: auto;
        }

        .tag-btn {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-full);
          padding: 4px 12px;
          font-size: 0.8rem;
          color: var(--text-muted);
          cursor: pointer;
          white-space: nowrap;
        }

        .tag-btn.active {
          background: rgba(255, 107, 0, 0.15);
          border-color: var(--primary);
          color: #FF8800;
          font-weight: 700;
        }

        .chat-window {
          display: flex;
          flex-direction: column;
          height: 600px;
          border-radius: var(--radius-lg);
          overflow: hidden;
        }

        .messages-area {
          flex: 1;
          padding: 24px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .message-row {
          display: flex;
          gap: 12px;
          max-width: 80%;
        }

        .message-row.user {
          align-self: flex-end;
          flex-direction: row-reverse;
        }

        .msg-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          object-fit: cover;
        }

        .msg-bubble-group {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .msg-info {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.75rem;
        }

        .message-row.user .msg-info {
          justify-content: flex-end;
        }

        .sender-name {
          color: #FFFFFF;
          font-weight: 700;
        }

        .msg-time {
          color: var(--text-muted);
        }

        .msg-bubble {
          padding: 14px 18px;
          border-radius: var(--radius-md);
          font-size: 0.92rem;
          line-height: 1.5;
        }

        .user-bubble {
          background: linear-gradient(135deg, var(--primary) 0%, #FF8800 100%);
          color: #FFFFFF;
          border-bottom-right-radius: 2px;
        }

        .trainer-bubble {
          background: rgba(30, 41, 59, 0.9);
          border: 1px solid var(--border-color);
          color: var(--text-main);
          border-bottom-left-radius: 2px;
        }

        .msg-media-box {
          margin-top: 10px;
          border-radius: var(--radius-md);
          overflow: hidden;
          max-width: 320px;
        }

        .msg-media-img {
          width: 100%;
          height: 180px;
          object-fit: cover;
        }

        .msg-media-caption {
          display: block;
          font-size: 0.75rem;
          background: rgba(0, 0, 0, 0.6);
          padding: 4px 8px;
          color: #FFFFFF;
        }

        .msg-advice-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-top: 10px;
        }

        .chat-input-bar {
          padding: 16px;
          background: #0F172A;
          border-top: 1px solid var(--border-color);
        }

        .attached-preview-chip {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(255, 107, 0, 0.15);
          color: #FF8800;
          padding: 4px 10px;
          border-radius: var(--radius-sm);
          font-size: 0.78rem;
          margin-bottom: 8px;
        }

        .attached-preview-chip button {
          background: none;
          border: none;
          color: #FF8800;
          cursor: pointer;
        }

        .input-group {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .attach-btn {
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid var(--border-color);
          color: var(--text-muted);
          width: 44px;
          height: 44px;
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }

        .chat-input {
          flex: 1;
          height: 44px;
          background: var(--bg-input);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          padding: 0 16px;
          color: #FFFFFF;
          outline: none;
        }

        .send-btn {
          width: 44px;
          height: 44px;
          background: var(--primary);
          border: none;
          border-radius: var(--radius-md);
          color: #FFFFFF;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};
