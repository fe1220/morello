import { style } from '@vanilla-extract/css';
import { vars, glass } from '../styles/theme.css';

export const card = style({
  ...glass,
  padding: vars.space.md,
  borderRadius: vars.radius.xl,
  display: 'flex',
  flexDirection: 'column',
  gap: '2px',
  border: '1px solid rgba(255, 255, 255, 0.4)',
  transition: 'all 0.2s ease',
  cursor: 'pointer',
  ':hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.08)',
    borderColor: 'rgba(255, 255, 255, 0.6)',
  },
  '@media': {
    'screen and (max-width: 768px)': {
      padding: vars.space.sm,
    }
  }
});

export const cardStatusBg = {
  pending: style({ backgroundColor: 'rgba(241, 245, 249, 0.6)' }),
  applied: style({ backgroundColor: 'rgba(224, 242, 254, 0.6)' }),
  interviewing: style({ backgroundColor: 'rgba(238, 242, 255, 0.6)' }),
  ended: style({ backgroundColor: 'rgba(255, 241, 242, 0.6)' }),
  passed: style({ backgroundColor: 'rgba(240, 253, 244, 0.6)' }),
};

export const header = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  gap: vars.space.sm,
});

export const headerLeft = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
});

export const companyWrapper = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.space.xs,
  flexWrap: 'wrap',
});

export const company = style({
  fontSize: '1.05rem',
  fontWeight: 700,
  color: vars.color.text,
  margin: 0,
  lineHeight: 1.2,
});

export const linkWrapper = style({
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
  marginLeft: 'auto',
  flexShrink: 0,
});

export const siteNameText = style({
  fontSize: '0.7rem',
  fontWeight: 600,
  color: vars.color.primary,
  opacity: 0.8,
});

export const positionWrapper = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.space.xs,
  marginBottom: '2px',
  minWidth: 0,
});

export const position = style({
  fontSize: '0.9rem',
  color: '#64748b',
  fontWeight: 500,
  margin: 0,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

export const linkIcon = style({
  color: vars.color.primary,
  display: 'flex',
  alignItems: 'center',
  opacity: 0.7,
  ':hover': {
    opacity: 1,
    filter: 'brightness(1.1)',
  },
});

export const memo = style({
  fontSize: '0.85rem',
  color: '#475569',
  backgroundColor: 'rgba(0, 0, 0, 0.02)',
  padding: '6px 10px',
  borderRadius: vars.radius.md,
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  margin: 0,
  marginTop: '6px',
  width: '100%',
  border: '1px solid rgba(0, 0, 0, 0.02)',
});

// Delete button moved to modal, keeping styles for other buttons if needed

export const footer = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: vars.space.sm,
  paddingTop: vars.space.sm,
  borderTop: `1px solid rgba(0, 0, 0, 0.05)`,
});

export const statusSelectWrapper = style({
  position: 'relative',
  display: 'inline-flex',
  alignItems: 'center',
});

export const statusSelect = style({
  appearance: 'none',
  fontSize: '0.75rem',
  fontWeight: 700,
  padding: '2px 24px 2px 8px',
  borderRadius: '12px',
  border: 'none',
  cursor: 'pointer',
  outline: 'none',
  transition: 'all 0.2s ease',
  ':hover': {
    filter: 'brightness(0.95)',
  },
});

export const selectIcon = style({
  position: 'absolute',
  right: '8px',
  pointerEvents: 'none',
  color: 'currentColor',
  opacity: 0.7,
});

export const date = style({
  fontSize: '0.75rem',
  color: '#94a3b8',
});

export const statusColors = {
  pending: style({ backgroundColor: 'rgba(148, 163, 184, 0.15)', color: '#64748b' }),
  applied: style({ backgroundColor: 'rgba(56, 189, 248, 0.15)', color: '#0284c7' }),
  interviewing: style({ backgroundColor: 'rgba(129, 140, 248, 0.15)', color: '#4f46e5' }),
  ended: style({ backgroundColor: 'rgba(248, 113, 113, 0.15)', color: '#dc2626' }),
  passed: style({ backgroundColor: 'rgba(74, 222, 128, 0.15)', color: '#059669' }),
};
