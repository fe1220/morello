import { style } from '@vanilla-extract/css';
import { vars, glass } from '../styles/theme.css';

export const card = style({
  ...glass,
  padding: vars.space.md,
  borderRadius: vars.radius.md,
  borderLeft: `4px solid ${vars.color.secondary}`,
  '@media': {
    'screen and (max-width: 768px)': {
      padding: vars.space.sm,
    }
  }
});

export const company = style({
  fontSize: '1rem',
  fontWeight: 700,
  color: vars.color.text,
});

export const position = style({
  fontSize: '0.85rem',
  color: vars.color.textMuted,
  marginBottom: vars.space.sm,
});

export const badge = style({
  fontSize: '0.75rem',
  padding: '2px 8px',
  borderRadius: vars.radius.sm,
  fontWeight: 600,
});

export const statusColors = {
  pending: style({ backgroundColor: 'rgba(148, 163, 184, 0.2)', color: '#64748b' }),
  applied: style({ backgroundColor: 'rgba(56, 189, 248, 0.2)', color: '#0284c7' }),
  interviewing: style({ backgroundColor: 'rgba(129, 140, 248, 0.2)', color: '#4f46e5' }),
  ended: style({ backgroundColor: 'rgba(248, 113, 113, 0.2)', color: '#dc2626' }),
  passed: style({ backgroundColor: 'rgba(74, 222, 128, 0.2)', color: '#059669' }),
};
