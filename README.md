# 🌊 Morello

개인 생산성 관리와 취업 준비 현황을 한눈에 관리할 수 있는 프리미엄 칸반 대시보드입니다.  
밝고 청량한 **수영장 테마(Bright Pool Theme)**와 **글래스모피즘(Glassmorphism)** 디자인이 적용되어 기분 좋은 작업 환경을 제공합니다.

## ✨ 주요 기능

### 1. 생산성 대시보드 (Task Management)
- **칸반 시스템**: '할 일', '진행 중', '완료' 3단계 작업 관리.
- **실시간 타이머**: '진행 중' 작업에 대한 미디어 플레이어 스타일 UI 및 소요 시간 실시간 계산.
- **기록**: 완료된 작업의 최종 소요 시간 자동 저장.

### 2. 취업 현황 보드 (Job Hunt Tracker)
- **전형 단계 최적화**: 원티드(Wanted) 기준을 참고한 5단계 관리 (관심/준비, 서류접수, 면접진행, 종료/불합격, 합격).
- **빠른 업데이트**: 원클릭으로 채용 전형 상태 변경 가능.

### 3. 멀티 디바이스 동기화 (Sync Across Devices)
- **Supabase 연동**: 모든 데이터가 클라우드에 실시간 저장되어 PC, 모바일, 태블릿 어디서든 확인 가능합니다.
- **매직 링크 인증**: 이메일만으로 간편하고 안전하게 로그인할 수 있습니다.

### 4. 반응형 레이아웃 (Responsive Design)
- 데스크탑뿐만 아니라 모바일에서도 쾌적하게 사용할 수 있는 반응형 UI를 제공합니다.

## 🛠 기술 스택 (Tech Stack)

- **Frontend**: React, Vite, TypeScript
- **Styling**: Vanilla Extract (Zero-runtime CSS-in-TS)
- **Backend/Auth**: Supabase (PostgreSQL, GoTrue)
- **Icons**: Lucide React
- **Deployment**: Vercel

## 🚀 시작하기

### 환경 변수 설정
`.env` 파일을 생성하고 아래 정보를 입력합니다:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 설치 및 실행
```bash
npm install
npm run dev
```

### 데이터베이스 설정
Supabase SQL Editor에서 제공된 `supabase_setup.sql` 스크립트를 실행하여 테이블과 RLS 정책을 설정합니다.

---
Made with ❤️ for Personal Productivity.
