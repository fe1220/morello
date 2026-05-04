import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import * as styles from './Auth.css';
import { vars } from '../styles/theme.css';

export const Auth: React.FC = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const { signIn, setGuestMode } = useAuth();

  React.useEffect(() => {
    // URL 해시에서 에러 확인
    const hash = window.location.hash;
    if (hash && hash.includes('error=')) {
      const params = new URLSearchParams(hash.replace('#', ''));
      const errorMsg = params.get('error_description') || '인증에 실패했습니다.';
      setMessage(`오류: ${errorMsg}`);
      // 해시 제거 (사용자에게 반복 노출 방지)
      window.history.replaceState(null, '', window.location.pathname);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      await signIn(email);
      setMessage('체크! 이메일로 매직 링크가 발송되었습니다.');
    } catch (error: any) {
      setMessage(`오류 발생: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.authCard}>
        <h2 style={{ marginBottom: '8px' }}>🌊 Morello 시작하기</h2>
        <p style={{ color: '#64748b', marginBottom: '24px', fontSize: '0.9rem' }}>
          이메일을 입력하면 기기 간 동기화가 시작됩니다.
        </p>
        <form onSubmit={handleLogin}>
          <input
            className={styles.input}
            type="email"
            placeholder="이메일 주소를 입력하세요"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button className={styles.button} type="submit" disabled={loading}>
            {loading ? '발송 중...' : '매직 링크 발송'}
          </button>
        </form>
        
        <div style={{ margin: '20px 0', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ flex: 1, height: '1px', backgroundColor: '#e2e8f0' }} />
          <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>또는</span>
          <div style={{ flex: 1, height: '1px', backgroundColor: '#e2e8f0' }} />
        </div>

        <button 
          className={styles.button} 
          style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)', color: vars.color.text, border: `1px solid ${vars.color.border}` }}
          onClick={() => setGuestMode(true)}
        >
          로그인 없이 시작하기
        </button>
        {message && (
          <p style={{ marginTop: '16px', fontSize: '0.85rem', color: message.includes('오류') ? '#ef4444' : '#10b981' }}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
};
