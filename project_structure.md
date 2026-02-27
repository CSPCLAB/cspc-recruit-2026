# 📂 프로젝트 구조 및 기능 상세 분석

현재 `cspc-recruit` 프로젝트는 **Next.js 14+ (App Router)** 기반으로 구축되었으며, 별도의 백엔드 서버 없이 **API Routes**와 **Supabase**를 활용한 **Modern Serverless Fullstack** 구조입니다.

---

## 🏗️ 1. 전체 프로젝트 구조

```
cspc-recruit/
├── 📁 app/                 # 핵심 로직 (페이지, API, 컴포넌트 등)
│   ├── 📁 api/             # 백엔드 API 엔드포인트 (서버리스 함수)
│   ├── 📁 lib/             # 유틸리티 및 라이브러리 설정 (Supabase 클라이언트 등)
│   ├── layout.tsx         # 전역 레이아웃
│   └── page.tsx           # 메인 페이지
├── 📜 middleware.ts        # 미들웨어 (요청 가로채기, 리다이렉트)
├── 📜 .env.local           # 환경 변수 (API Key 등)
└── 📜 ...                  # 설정 파일들
```

---

## 🚀 2. 주요 기능 및 데이터 흐름 (Feature Flows)

### 2-1. 지원서 제출 프로세스 (User Flow)
사용자가 지원서를 작성하고 제출하는 핵심 기능입니다.

```mermaid
sequenceDiagram
    participant User as 사용자 (브라우저)
    participant Page as 지원 페이지 (/apply)
    participant API as 백엔드 API (/api/applications/submit)
    participant DB as Supabase (PostgreSQL)

    User->>Page: 1. 지원서 작성 및 제출 버튼 클릭
    Page->>API: 2. POST 요청 (JSON 데이터 전송)
    API->>API: 3. 데이터 검증 (필수값 체크)
    API->>DB: 4. 지원자 정보 저장 (insert)
    alt 성공
        DB-->>API: 저장된 데이터 반환
        API-->>Page: 200 OK (성공 메시지)
        Page-->>User: "제출되었습니다!" 알림 및 완료 화면
    else 실패 (중복 지원 등)
        DB-->>API: 에러 발생 (Unique Key Violation)
        API-->>Page: 409 Conflict (이미 지원한 학번)
        Page-->>User: 에러 메시지 표시
    end
```

### 2-2. 관리자 로그인 및 접근 제어 (Auth Flow)
관리자 페이지(`/admin`) 접근 시 인증을 처리하는 흐름입니다.

```mermaid
sequenceDiagram
    participant Admin as 관리자
    participant Middleware as 미들웨어 (middleware.ts)
    participant Page as 로그인 페이지 (/login)
    participant Auth as Supabase Auth

    Admin->>Middleware: 1. /admin/dashboard 접근 시도
    Middleware->>Auth: 2. 현재 로그인 세션 확인 (getUser)
    alt 로그인 안 됨
        Auth-->>Middleware: 세션 없음 (null)
        Middleware-->>Admin: 3. /login 페이지로 리다이렉트
        Admin->>Page: 4. 아이디/비번 입력 후 로그인 시도
        Page->>Auth: 5. 로그인 요청 (signInWithPassword)
        Auth-->>Page: 6. 성공 시 세션 쿠키 발급
        Page-->>Admin: 7. /admin/dashboard로 이동
    else 이미 로그인 됨
        Auth-->>Middleware: 유효한 세션 있음
        Middleware-->>Admin: 8. 페이지 통과 (접속 허용)
    end
```

### 2-3. 지원자 관리 프로세스 (Admin Flow)
관리자가 지원자 목록을 확인하고 합격/불합격 처리를 하는 흐름입니다.

```mermaid
sequenceDiagram
    participant Admin as 관리자 (대시보드)
    participant API as 백엔드 API (/api/admin/...)
    participant DB as Supabase (Applicants Table)

    Admin->>API: 1. 지원자 목록 요청 (GET /applications)
    API->>DB: 2. 전체 지원자 데이터 조회 (select *)
    DB-->>API: 3. 데이터 반환
    API-->>Admin: 4. JSON 데이터 전달 -> 화면에 목록 렌더링

    Admin->>API: 5. 특정 지원자 합격 처리 (PATCH /status)
    API->>DB: 6. 해당 지원자 status 'passed'로 업데이트
    DB-->>API: 7. 업데이트 결과 반환
    API-->>Admin: 8. 200 OK -> UI 업데이트 (합격 표시)
```

---

## ⚖️ 3. 아키텍처 비교: 현재 방식 vs 전통적 백엔드 방식

| 구분 | **현재 방식 (Next.js + Supabase)** | **전통적 방식 (React + Spring/Node)** |
| :--- | :--- | :--- |
| **구조** | **Monolithic (일체형)**<br>프론트와 백엔드 코드가 하나의 프로젝트에 존재. (Next.js) | **Decoupled (분리형)**<br>프론트 서버(React)와 백엔드 서버(Spring)가 물리적으로 분리됨. |
| **서버 형태** | **Serverless (서버리스)**<br>요청 있을 때만 함수가 실행됨. (Vercel 관리) | **Always On (상시 가동)**<br>EC2 같은 서버에 24시간 프로세스가 떠 있음. |
| **개발 생산성** | **매우 높음 (🚀)**<br>API 하나 만들 때 파일 하나만 추가하면 끝. 타입 공유(TypeScript) 용이. | **보통**<br>API 정의서(Swagger) 만들고, 프론트/백엔드 각각 코드 작성 및 통신 맞춤 필요. |
| **비용** | **사용량 기반 (Pay-as-you-go)**<br>트래픽 없으면 0원. (트래픽 터지면 비용 급증 가능) | **고정 비용**<br>접속자 없어도 서버 켜 둔 시간만큼 비용 발생. |
| **배포 편의성** | **통합 배포**<br>`git push` 한 번이면 프론트+백엔드 동시 배포. | **개별 배포**<br>프론트, 백엔드 따로 빌드하고 배포해야 함. (파이프라인 복잡) |

### ✅ 요약: 왜 이 구조인가?
*   **리크루팅 사이트 특성상**: 특정 기간에만 트래픽이 폭주하고 평소엔 조용합니다. 상시 서버를 켜두는 것보다 **필요할 때만 리소스를 쓰는 서버리스 방식**이 비용과 관리 면에서 압도적으로 유리합니다.
*   **개발 효율성**: 혼자서 프론트부터 DB까지 빠르게 구축하고 수정하기 최적의 구조입니다.
