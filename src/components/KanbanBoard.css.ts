import { style } from '@vanilla-extract/css';
import { vars, glass } from '../styles/theme.css';

export const boardContainer = style({
  display: 'flex',
  gap: vars.space.lg,
  padding: vars.space.lg,
  overflowX: 'auto',
  minHeight: 'calc(100vh - 120px)',
  '@media': {
    'screen and (max-width: 768px)': {
      flexDirection: 'column',
      padding: vars.space.md,
      gap: vars.space.md,
    }
  }
});

export const column = style({
  flex: 1,
  minWidth: '300px',
  maxWidth: '400px',
  backgroundColor: 'rgba(255, 255, 255, 0.25)',
  backdropFilter: 'blur(8px)',
  borderRadius: vars.radius.lg,
  padding: vars.space.md,
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space.md,
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.03)',
  '@media': {
    'screen and (max-width: 768px)': {
      minWidth: '100%',
      maxWidth: '100%',
    }
  }
});

export const columnHeader = style({
  fontSize: '1.1rem',
  fontWeight: 600,
  color: vars.color.text,
  marginBottom: vars.space.sm,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

export const columnCount = style({
  fontSize: '0.8rem',
  backgroundColor: vars.color.border,
  padding: '2px 8px',
  borderRadius: vars.radius.sm,
  color: vars.color.textMuted,
});

export const addButton = style({
  width: '100%',
  padding: vars.space.sm,
  backgroundColor: 'transparent',
  border: `1px dashed ${vars.color.border}`,
  borderRadius: vars.radius.md,
  color: vars.color.textMuted,
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  selectors: {
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      borderColor: vars.color.primary,
      color: vars.color.primary,
    }
  }
});
