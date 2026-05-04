import { style, keyframes } from '@vanilla-extract/css';
import { vars, glass } from '../styles/theme.css';

const fadeIn = keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 },
});

const slideUp = keyframes({
  from: { transform: 'translateY(20px)', opacity: 0 },
  to: { transform: 'translateY(0)', opacity: 1 },
});

export const overlay = style({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(8px)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1000,
  animation: `${fadeIn} 0.2s ease-out`,
});

export const modalContent = style({
  ...glass,
  width: '94%',
  maxWidth: '400px', // 더 콤팩트하게
  padding: vars.space.md, // 패딩 줄임 (lg -> md)
  borderRadius: '24px', // 훨씬 더 둥글게
  backgroundColor: 'rgba(255, 255, 255, 0.3)',
  backdropFilter: 'blur(24px) saturate(200%)',
  border: '1px solid rgba(255, 255, 255, 0.4)',
  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.05)',
  animation: `${slideUp} 0.3s ease-out`,
  '@media': {
    'screen and (max-width: 768px)': {
      width: '96%',
      padding: vars.space.md,
      borderRadius: '20px',
    }
  }
});

export const title = style({
  display: 'none', // 타이틀 완전 제거
});

export const form = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space.md, // 폼 간격 소폭 축소
});

export const label = style({
  display: 'block', // 블록 요소로 변경하여 여백 활성화
  fontSize: '0.8rem',
  fontWeight: 700,
  color: 'rgba(15, 23, 42, 0.6)',
  marginBottom: '6px',
  marginLeft: '4px',
});

export const input = style({
  width: '100%',
  padding: '10px 14px', // 패딩 축소로 더 컴팩트하게
  borderRadius: '12px',
  border: '1px solid rgba(255, 255, 255, 0.5)',
  backgroundColor: 'rgba(255, 255, 255, 0.6)',
  fontSize: '0.95rem', // 폰트 크기 소폭 축소
  fontFamily: 'inherit',
  outline: 'none',
  transition: 'all 0.2s ease',
  color: vars.color.text,
  ':focus': {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderColor: vars.color.primary,
    boxShadow: `0 0 0 4px rgba(56, 189, 248, 0.1)`,
  },
  '::placeholder': {
    color: 'rgba(0, 0, 0, 0.2)',
  }
});

export const textarea = style([
  input,
  {
    minHeight: '80px', // 높이 축소
    resize: 'vertical',
  },
]);

export const buttonGroup = style({
  display: 'flex',
  justifyContent: 'flex-end',
  gap: vars.space.md,
  marginTop: vars.space.xs, // 여백 최소화 (md -> xs)
});

export const submitButton = style({
  padding: `8px ${vars.space.lg}`, // 버튼도 컴팩트하게
  borderRadius: '10px',
  backgroundColor: vars.color.primary,
  color: 'white',
  border: 'none',
  fontWeight: 600,
  fontSize: '0.9rem',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  ':hover': {
    filter: 'brightness(1.1)',
    transform: 'translateY(-1px)',
  },
  ':disabled': {
    opacity: 0.5,
    cursor: 'not-allowed',
    filter: 'none',
    transform: 'none',
  }
});

export const cancelButton = style({
  padding: `8px ${vars.space.lg}`,
  borderRadius: '10px',
  backgroundColor: 'transparent',
  color: '#64748b',
  border: `1px solid ${vars.color.border}`,
  fontWeight: 600,
  fontSize: '0.9rem',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  ':hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },
});
