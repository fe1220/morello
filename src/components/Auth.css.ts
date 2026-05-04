import { style } from '@vanilla-extract/css';
import { vars, glass } from '../styles/theme.css';

export const authContainer = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '80vh',
  padding: vars.space.lg,
});

export const authCard = style({
  ...glass,
  padding: vars.space.xl,
  borderRadius: vars.radius.xl,
  width: '100%',
  maxWidth: '400px',
  textAlign: 'center',
});

export const input = style({
  width: '100%',
  padding: vars.space.md,
  borderRadius: vars.radius.md,
  border: `1px solid ${vars.color.border}`,
  backgroundColor: 'rgba(255, 255, 255, 0.5)',
  fontSize: '1rem',
  marginBottom: vars.space.md,
  outline: 'none',
  selectors: {
    '&:focus': {
      borderColor: vars.color.primary,
      backgroundColor: 'white',
    }
  }
});

export const button = style({
  width: '100%',
  padding: vars.space.md,
  borderRadius: vars.radius.md,
  border: 'none',
  backgroundColor: vars.color.primary,
  color: 'white',
  fontSize: '1rem',
  fontWeight: 600,
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  selectors: {
    '&:hover': {
      filter: 'brightness(1.1)',
      transform: 'translateY(-1px)',
    },
    '&:disabled': {
      opacity: 0.5,
      cursor: 'not-allowed',
    }
  }
});
