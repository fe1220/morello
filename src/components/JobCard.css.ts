import { style } from '@vanilla-extract/css';
import { vars, glass } from '../styles/theme.css';

export const card = style({
  ...glass,
  padding: vars.space.md,
  borderRadius: vars.radius.xl,
  display: 'flex',
  flexDirection: 'column',
  gap: '2px',
  border: '1px solid rgba(255, 255, 255, 0.4)', // 왼쪽 선 대신 전체 테두리 연하게
  transition: 'all 0.2s ease',
  '@media': {
    'screen and (max-width: 768px)': {
      padding: vars.space.sm,
    }
  }
});

// 상태별 파스텔 배경색 정의
export const cardStatusBg = {
  pending: style({ backgroundColor: 'rgba(241, 245, 249, 0.6)' }),   // 연한 그레이/블루
  applied: style({ backgroundColor: 'rgba(224, 242, 254, 0.6)' }),   // 연한 하늘색
  interviewing: style({ backgroundColor: 'rgba(238, 242, 255, 0.6)' }), // 연한 보라색
  ended: style({ backgroundColor: 'rgba(255, 241, 242, 0.6)' }),           // 연한 핑크
  passed: style({ backgroundColor: 'rgba(240, 253, 244, 0.6)' }),    // 연한 초록색
};

export const header = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

export const company = style({
  fontSize: '1.1rem',
  fontWeight: 700,
  color: vars.color.text,
  margin: 0,
  lineHeight: 1.2,
});

export const positionWrapper = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.space.xs,
  marginBottom: '2px',
});

export const position = style({
  fontSize: '0.9rem',
  color: '#64748b',
  fontWeight: 500,
  margin: 0,
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
  padding: '6px 10px', // 패딩 소폭 조정
  borderRadius: vars.radius.md,
  whiteSpace: 'nowrap', // 한 줄 유지
  overflow: 'hidden', // 넘치는 내용 숨김
  textOverflow: 'ellipsis', // 말줄임표 적용
  margin: 0,
  marginTop: '6px', // 간격 소폭 축소
  width: '100%',
  border: '1px solid rgba(0, 0, 0, 0.02)',
});

export const deleteButton = style({
  background: 'none',
  border: 'none',
  color: '#cbd5e1', // 연한 회색
  cursor: 'pointer',
  padding: '4px',
  borderRadius: vars.radius.sm,
  transition: 'all 0.2s ease',
  ':hover': {
    backgroundColor: 'rgba(239, 68, 68, 0.05)',
    color: '#94a3b8',
  },
});

export const footer = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: vars.space.sm, // 간격 줄임 (md -> sm)
  paddingTop: vars.space.sm,
  borderTop: `1px solid rgba(0, 0, 0, 0.05)`,
});

export const statusBadge = style({
  fontSize: '0.75rem',
  fontWeight: 700,
  padding: '2px 8px',
  borderRadius: '12px',
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
