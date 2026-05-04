import { createGlobalTheme, globalStyle } from '@vanilla-extract/css';

export const vars = createGlobalTheme(':root', {
  color: {
    background: 'linear-gradient(135deg, #e0f2fe 0%, #ccfbf1 100%)',
    surface: 'rgba(255, 255, 255, 0.4)',
    primary: '#0ea5e9',
    secondary: '#2dd4bf',
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    text: '#0f172a',
    textMuted: '#475569',
    border: 'rgba(255, 255, 255, 0.5)',
  },
  space: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
  },
  radius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '20px',
  },
  shadow: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
    lg: '0 12px 48px 0 rgba(31, 38, 135, 0.2)',
  }
});

globalStyle('html, body', {
  margin: 0,
  padding: 0,
  background: vars.color.background,
  backgroundAttachment: 'fixed',
  color: vars.color.text,
  fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif',
  minHeight: '100vh',
});

globalStyle('*', {
  boxSizing: 'border-box',
});

export const glass = {
  backdropFilter: 'blur(16px) saturate(180%)',
  backgroundColor: vars.color.surface,
  border: `1px solid ${vars.color.border}`,
  boxShadow: vars.shadow.md,
};
