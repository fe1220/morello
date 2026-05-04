import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import * as styles from './Auth.css';

export const Auth: React.FC = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const { signIn } = useAuth();

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
        {message && (
          <p style={{ marginTop: '16px', fontSize: '0.85rem', color: message.includes('오류') ? '#ef4444' : '#10b981' }}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
};
