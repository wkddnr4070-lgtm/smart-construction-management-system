# Smart Construction Management System (PoC)

도시가스 공사관리 플랫폼의 단계별 PoC 프로젝트입니다.

## 완료된 범위

### 1단계
- Next.js(App Router) + TypeScript + Tailwind CSS 초기 구성
- 공통 레이아웃(상단 헤더 + 좌측 네비게이션)
- 더미 데이터 기반 공사현황 대시보드

### 2단계
- 협력사 제출 포털(`/submissions`) 구현
  - 공사자료 입력 폼 + 파일 추가/삭제
  - 임시저장/제출 처리
  - 필수값 및 필수 첨부 검증
  - 제출 내역 정렬 테이블

### 3단계 (이번 반영)
- 공사계획 등록 화면(`/projects`) 구현
  - 공사 등록 폼 + 목록 조회
  - mock/supabase-rest 전환 가능한 저장소 레이어(`project-repository`) 도입
- Supabase 기반 확장을 위한 구성 추가
  - `.env.example` (Supabase URL/KEY)
  - `supabase/schema.sql` (프로젝트/제출/파일/워크플로우/메일/AI분석 테이블)
  - 데이터소스 모드 분기(`mock`, `supabase-rest`)

## 실행 방법
```bash
npm install
npm run dev
```

브라우저에서 `http://localhost:3000` 접속

## 참고
- 현재 환경에서 npm registry 접근 정책으로 인해 `npm install`이 403으로 실패할 수 있습니다.
- 로컬 개발 PC 또는 권한이 허용된 CI 환경에서는 정상 설치 후 실행 가능합니다.

## 다음 단계(4단계)
- 승인 워크플로우 상태 변경 화면/로직 구현
- 문서 생성 템플릿 매핑(착공계/기성계/준공계)
- 메일 발송 준비 화면 + 발송 이력 저장
- 대시보드 집계 로직을 실데이터 기준으로 전환
