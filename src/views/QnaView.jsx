import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { HelpCircle, Plus, CheckCircle2, Clock, MessageSquare } from 'lucide-react';

export const QnaView = () => {
  const { user } = useApp();
  const [questions, setQuestions] = useState([
    {
      id: 'q-101',
      author: '마루맘',
      dogName: '마루 (포메라니안)',
      category: '소리 짖음',
      title: '현관 도어벨 소리만 나면 미친 듯이 짖어요 ㅠㅠ 교정 방법이 궁금합니다!',
      content: '밖에서 소리가 나거나 벨이 울리면 문 앞으로 달려가서 크게 짖습니다. 간식으로 달래도 소용이 없는데 방문 훈련 전에 집에서 시도해볼 수 있는 팁이 있을까요?',
      date: '2026-09-15',
      status: '답변완료',
      answer: {
        trainerName: '강성훈 헤드 트레이너',
        text: '안녕하세요 마루 보호자님! 현관 벨소리는 강아지에게 [경계 신호]로 인식됩니다. 먼저 도어벨 소리를 휴대폰으로 녹음한 뒤, 아주 작은 소리로 틀어주면서 동시에 고기 간식을 제공하는 [도어벨 탈감작+긍정 강화] 훈련을 진행해 보세요. 소리에 대한 반응을 완벽히 잡기 위해서는 1회 방문 훈련(15만원) 세션에서 매트 피신(Mat Stay) 기법을 함께 배우시는 것을 추천합니다.'
      }
    },
    {
      id: 'q-102',
      author: '리트리버러버',
      dogName: '코코 (골든 리트리버)',
      category: '산책 당김',
      title: '산책할 때 앞만 보고 너무 세게 줄을 당겨서 팔이 너무 아픕니다.',
      content: '1살 반 리트리버인데 힘이 너무 세서 산책 갈 때마다 당겨집니다. 멈춰 서기 훈련도 해봤는데 효과가 없네요.',
      date: '2026-09-16',
      status: '답변대기중',
      answer: null
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [category, setCategory] = useState('소리 짖음');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newItem = {
      id: `q-${Date.now()}`,
      author: user.name || '보호자님',
      dogName: '내 강아지',
      category,
      title: newTitle,
      content: newContent,
      date: new Date().toISOString().split('T')[0],
      status: '답변대기중',
      answer: null
    };

    setQuestions([newItem, ...questions]);
    setShowModal(false);
    setNewTitle('');
    setNewContent('');
    alert('질문이 등록되었습니다! 전문 훈련사가 답변을 작성해 드립니다.');
  };

  return (
    <div className="qna-view container">
      <div className="qna-header">
        <div>
          <h2>❓ 회원 1:1 Q&A 질문 게시판</h2>
          <p>반려견 행동 고민을 질문하고 전문 훈련사의 맞춤 피드백을 받아보세요.</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          <Plus size={18} /> 질문 작성하기
        </button>
      </div>

      <div className="questions-list">
        {questions.map((q) => (
          <div key={q.id} className="qna-card glass-card">
            <div className="qna-top">
              <span className={`badge ${q.status === '답변완료' ? 'badge-green' : 'badge-orange'}`}>
                {q.status}
              </span>
              <span className="qna-meta">{q.date} · {q.author} ({q.dogName})</span>
            </div>
            <h3 className="qna-title">{q.title}</h3>
            <p className="qna-content">{q.content}</p>

            {q.answer && (
              <div className="trainer-answer-box">
                <span className="answer-author">🎓 {q.answer.trainerName}의 답변</span>
                <p className="answer-text">{q.answer.text}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content glass-card">
            <h3>❓ 훈련사 1:1 질문 작성</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">질문 제목</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="예: 벨 소리만 나면 짖어요"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">카테고리</label>
                <select
                  className="form-select"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="소리 짖음">소리 짖음</option>
                  <option value="분리불안">분리불안</option>
                  <option value="산책 당김">산책 당김</option>
                  <option value="배변 실수">배변 실수</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">구체적인 상황 설명</label>
                <textarea
                  className="form-textarea"
                  rows={4}
                  placeholder="강아지가 어떤 행동을 보이는지 상세히 적어주세요."
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  required
                />
              </div>
              <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
                <button type="button" className="btn btn-secondary btn-full" onClick={() => setShowModal(false)}>취소</button>
                <button type="submit" className="btn btn-primary btn-full">등록하기</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style jsx>{`
        .qna-view { padding-top: 30px; padding-bottom: 60px; max-width: 800px; }
        .qna-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
        .qna-header h2 { color: #FFF; font-size: 1.8rem; }
        .qna-header p { color: var(--text-muted); font-size: 0.9rem; }
        .questions-list { display: flex; flex-direction: column; gap: 16px; }
        .qna-card { padding: 20px; }
        .qna-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; }
        .qna-meta { font-size: 0.8rem; color: var(--text-muted); }
        .qna-title { color: #FFF; font-size: 1.15rem; margin-bottom: 8px; }
        .qna-content { color: var(--text-muted); font-size: 0.9rem; line-height: 1.5; }
        .trainer-answer-box { background: rgba(139, 92, 246, 0.1); border: 1px solid rgba(139, 92, 246, 0.3); padding: 14px; border-radius: 12px; margin-top: 14px; }
        .answer-author { color: #A78BFA; font-weight: bold; font-size: 0.85rem; }
        .answer-text { color: #FFF; font-size: 0.88rem; margin-top: 4px; line-height: 1.5; }
      `}</style>
    </div>
  );
};
