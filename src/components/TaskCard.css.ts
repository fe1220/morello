import { style, keyframes } from '@vanilla-extract/css';
import { vars, glass } from '../styles/theme.css';

export const card = style({
  ...glass,
  padding: vars.space.md,
  borderRadius: vars.radius.xl,
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
  border: '1px solid rgba(255, 255, 255, 0.4)',
  transition: 'all 0.2s ease',
  ':hover': {
    transform: 'translateY(-2px)',
    boxShadow: vars.shadow.md,
  }
});

// 상태별 파스텔 배경색 정의
export const cardStatusBg = {
  todo: style({ backgroundColor: 'rgba(241, 245, 249, 0.6)' }),
  doing: style({ backgroundColor: 'rgba(224, 242, 254, 0.6)' }),
  done: style({ backgroundColor: 'rgba(240, 253, 244, 0.6)' }),
};

export const header = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  gap: vars.space.sm,
});

export const titleWrapper = style({
  display: 'flex',
  alignItems: 'flex-start',
  gap: '4px',
  flex: 1,
});

export const dragHandle = style({
  color: '#cbd5e1',
  cursor: 'grab',
  padding: '2px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: '2px',
  ':active': {
    cursor: 'grabbing',
  },
  ':hover': {
    color: '#94a3b8',
  }
});

export const title = style({
  fontSize: '0.9rem',
  fontWeight: 500,
  color: vars.color.text,
  margin: 0,
  lineHeight: 1.3,
  cursor: 'text', // 편집 가능함을 암시
});

export const editInput = style({
  fontSize: '0.9rem',
  fontWeight: 500,
  color: vars.color.text,
  border: 'none',
  borderBottom: `1px solid ${vars.color.primary}`,
  backgroundColor: 'transparent',
  padding: '0',
  margin: '0',
  width: '100%',
  outline: 'none',
  fontFamily: 'inherit',
});

export const timerSection = style({
  display: 'flex',
  alignItems: 'center',
  marginTop: '2px',
});

export const timeText = style({
  fontFamily: 'monospace',
  fontSize: '0.85rem',
  fontWeight: 700,
  color: vars.color.primary,
  backgroundColor: 'rgba(255, 255, 255, 0.3)',
  padding: '2px 8px',
  borderRadius: '4px',
});

export const controls = style({
  display: 'flex',
  gap: '4px',
});

export const iconButton = style({
  background: 'none',
  border: 'none',
  color: '#94a3b8',
  cursor: 'pointer',
  padding: '4px',
  borderRadius: vars.radius.sm,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'all 0.2s ease',
  ':hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    color: vars.color.text,
  }
});

export const timerButton = style([
  iconButton,
  {
    backgroundColor: 'rgba(56, 189, 248, 0.1)',
    color: vars.color.primary,
    ':hover': {
      backgroundColor: 'rgba(56, 189, 248, 0.2)',
    },
  },
]);

export const doneButton = style([
  iconButton,
  {
    color: '#10b981',
    ':hover': {
      backgroundColor: 'rgba(16, 185, 129, 0.1)',
    },
  },
]);

export const deleteButton = style([
  iconButton,
  {
    color: '#cbd5e1', 
    ':hover': {
      backgroundColor: 'rgba(239, 68, 68, 0.05)',
      color: '#94a3b8',
    },
  },
]);

export const active = style({
  color: vars.color.success,
  animation: 'pulse 2s infinite',
});

const pulse = keyframes({
  '0%': { opacity: 1 },
  '50%': { opacity: 0.5 },
  '100%': { opacity: 1 },
});
