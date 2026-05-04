import { style, keyframes } from '@vanilla-extract/css';
import { vars, glass } from '../styles/theme.css';

export const card = style({
  ...glass,
  padding: vars.space.md,
  borderRadius: vars.radius.md,
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space.sm,
  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  selectors: {
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: vars.shadow.md,
    }
  }
});

export const title = style({
  fontSize: '1rem',
  fontWeight: 500,
  color: vars.color.text,
});

export const timerSection = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginTop: vars.space.sm,
  padding: `${vars.space.xs} ${vars.space.sm}`,
  backgroundColor: 'rgba(255, 255, 255, 0.5)',
  borderRadius: vars.radius.sm,
});

export const timeText = style({
  fontFamily: 'monospace',
  fontSize: '0.9rem',
  color: vars.color.primary,
});

export const controls = style({
  display: 'flex',
  gap: vars.space.xs,
});

export const iconButton = style({
  background: 'none',
  border: 'none',
  color: vars.color.textMuted,
  cursor: 'pointer',
  padding: vars.space.xs,
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'all 0.2s ease',
  selectors: {
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      color: vars.color.text,
    }
  }
});

export const active = style({
  color: vars.color.success,
  animation: 'pulse 2s infinite',
});

const pulse = keyframes({
  '0%': { opacity: 1 },
  '50%': { opacity: 0.5 },
  '100%': { opacity: 1 },
});
