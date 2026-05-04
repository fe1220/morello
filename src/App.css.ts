import { style } from '@vanilla-extract/css';
import { vars } from './styles/theme.css';

export const container = style({
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
      gap: vars.space.md,
    }
  }
});

export const logo = style({
  fontSize: '1.5rem',
  fontWeight: 800,
  color: vars.color.text,
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
});

export const nav = style({
  display: 'flex',
  gap: vars.space.sm,
  backgroundColor: 'rgba(255, 255, 255, 0.3)',
  padding: '4px',
  borderRadius: '12px',
  backdropFilter: 'blur(10px)',
});

export const navItem = style({
  padding: '8px 16px',
  borderRadius: '8px',
  border: 'none',
  backgroundColor: 'transparent',
  color: vars.color.textMuted,
  fontWeight: 600,
  fontSize: '0.9rem',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  display: 'flex',
  alignItems: 'center',
  ':hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    color: vars.color.primary,
  }
});

export const activeNav = style({
  backgroundColor: 'white',
  color: vars.color.primary,
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
});

export const main = style({
  marginTop: vars.space.lg,
});

export const title = style({
  fontSize: '2rem',
  fontWeight: 800,
  marginBottom: vars.space.xl,
  color: vars.color.text,
  letterSpacing: '-0.02em',
});

export const board = style({
  display: 'flex',
  gap: vars.space.lg,
  overflowX: 'auto',
  paddingBottom: vars.space.md,
  minHeight: '70vh',
  alignItems: 'flex-start',
  scrollSnapType: 'x proximity',
  '::-webkit-scrollbar': {
    height: '6px',
  },
  '::-webkit-scrollbar-thumb': {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: '10px',
  }
});

export const column = style({
  minWidth: '320px',
  flex: '0 0 320px',
  backgroundColor: 'rgba(255, 255, 255, 0.2)',
  borderRadius: '20px',
  padding: vars.space.md,
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space.md,
  transition: 'all 0.3s ease',
  scrollSnapAlign: 'start',
  '@media': {
    'screen and (max-width: 768px)': {
      minWidth: '280px',
      flex: '0 0 280px',
    }
  }
});

export const columnDraggingOver = style({
  backgroundColor: 'rgba(255, 255, 255, 0.4)',
  boxShadow: 'inset 0 0 0 2px rgba(56, 189, 248, 0.2)',
});

export const columnHeader = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingBottom: vars.space.xs,
});

export const columnTitle = style({
  fontSize: '1rem',
  fontWeight: 700,
  color: vars.color.text,
  margin: 0,
});

export const count = style({
  fontSize: '0.75rem',
  fontWeight: 700,
  backgroundColor: 'rgba(0, 0, 0, 0.05)',
  padding: '2px 8px',
  borderRadius: '10px',
  color: vars.color.textMuted,
});

export const addButton = style({
  width: '100%',
  padding: vars.space.sm,
  borderRadius: '12px',
  border: '2px dashed rgba(0, 0, 0, 0.1)',
  backgroundColor: 'rgba(255, 255, 255, 0.3)',
  color: vars.color.textMuted,
  fontWeight: 600,
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  ':hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderColor: vars.color.primary,
    color: vars.color.primary,
  }
});

export const cardList = style({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100px',
});
