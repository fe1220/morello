import { style } from '@vanilla-extract/css';
import { vars } from './styles/theme.css';

export const appContainer = style({
  maxWidth: '1200px',
  margin: '0 auto',
  padding: vars.space.xl,
  '@media': {
    'screen and (max-width: 768px)': {
      padding: vars.space.md,
    }
  }
});

export const header = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: vars.space.xl,
  '@media': {
    'screen and (max-width: 768px)': {
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: vars.space.md,
    }
  }
});

export const nav = style({
  display: 'flex',
  gap: vars.space.md,
  '@media': {
    'screen and (max-width: 768px)': {
      width: '100%',
      overflowX: 'auto',
      paddingBottom: vars.space.xs,
    }
  }
});

export const navItem = style({
  padding: `${vars.space.sm} ${vars.space.md}`,
  borderRadius: vars.radius.md,
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  backgroundColor: 'transparent',
  border: 'none',
  color: vars.color.textMuted,
  fontWeight: 600,
  selectors: {
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.5)',
      color: vars.color.primary,
    }
  }
});

export const navActive = style({
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
  color: vars.color.primary,
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
});
