# 홈페이지 와이어프레임 제작 지침서 v4

> 기반 킷: TechPilot - Wireframe Kit (Figma Community)
> 기준 해상도: 1440px (Desktop)
> 아이콘: Lucide Icons (24px, Line 2px)
> 컬러: 그레이스케일 전용 (Black / Gray / White)
> 코드 레퍼런스: wireframe-reference.html 참조

---

## 🔴 최우선 원칙: 기획안 UI 지시를 그대로 구현한다

### 우선순위

```
1순위 — 기획안의 "UI:" 항목 (레이아웃, 열 수, 슬라이드 수, 캐러셀 여부 등)
2순위 — 기획안의 콘텐츠 (카드 수, 항목 수, 카피 전문)
3순위 — 인벤토리 68개 (UI 지시가 없을 때만 참고)
```

기획안에 "슬라이드 3장"이라고 적혀있으면 **슬라이드 3장을 만든다.**
기획안에 "5열 카드"라고 적혀있으면 **5열 카드를 만든다.**
기획안에 "캐러셀"이라고 적혀있으면 **캐러셀을 만든다.**
인벤토리에 비슷한 스타일이 없어도, **기획안 지시대로 직접 만든다.**

### 기획안 읽는 법

기획안의 각 섹션에는 아래 정보가 포함된다:

```
섹션 N: [섹션 제목]
──────────────────
목적: [이 섹션의 역할]
UI: [★ 레이아웃 지시 — 반드시 따를 것]
헤드카피: [h1/h2 텍스트]
서브카피: [설명 텍스트]
콘텐츠: [카드, 항목 등 구체 내용 — 빠짐없이 모두 포함]
CTA: [버튼 텍스트 + 링크 대상]
마이크로카피: [버튼 아래 작은 텍스트]
```

**"UI:" 항목이 핵심이다.** 여기 적힌 대로 구현한다.

---

## ⚠️ 실제 오답/정답 예시

아래는 실제 기획안과 잘못된 출력의 비교다. 같은 실수를 반복하지 말 것.

### 예시 1: 슬라이드 — 가장 치명적인 오류

```
기획안 UI: "풀스크린 이미지 배경 + 자동 전환 슬라이드 3장 (4~5초 간격 + 수동 도트 네비게이션)"
         슬라이드 1: 타이틀 A / 서브텍스트 A
         슬라이드 2: 타이틀 B / 서브텍스트 B
         슬라이드 3: 타이틀 C / 서브텍스트 C + CTA + 마이크로카피
```

**❌ 잘못된 출력:** Hero 01 좌우분할로 변환, 슬라이드 1 카피만 사용, 슬라이드 2·3 카피 통째로 누락
```html
<!-- ❌ 이렇게 하면 안 된다 -->
<section class="hero-split">
  <div class="hero-split-inner">
    <div>
      <h1>슬라이드 1 타이틀만</h1>
      <p>슬라이드 1 서브텍스트만</p>
    </div>
    <div class="img-placeholder">...</div>
  </div>
</section>
```

**✅ 올바른 출력:** 실제 슬라이드 3장 캐러셀 (JS 자동전환 + 도트네비)
```html
<!-- ✅ 이렇게 해야 한다 -->
<section class="hero-slider">
  <div class="slider-track">
    <!-- 슬라이드 1 -->
    <div class="slide active" style="background:var(--bg-dark);">
      <div class="img-placeholder-fullscreen"><i data-lucide="image"></i></div>
      <div class="slide-content">
        <p class="slide-sub">서브텍스트 A</p>
        <h1 class="slide-title">타이틀 A</h1>
      </div>
    </div>
    <!-- 슬라이드 2 — 반드시 포함 -->
    <div class="slide" style="background:var(--bg-dark);">
      <div class="img-placeholder-fullscreen"><i data-lucide="image"></i></div>
      <div class="slide-content">
        <p class="slide-sub">서브텍스트 B</p>
        <h1 class="slide-title">타이틀 B</h1>
      </div>
    </div>
    <!-- 슬라이드 3 — 반드시 포함 -->
    <div class="slide" style="background:var(--bg-dark);">
      <div class="img-placeholder-fullscreen"><i data-lucide="image"></i></div>
      <div class="slide-content">
        <p class="slide-sub">서브텍스트 C</p>
        <h1 class="slide-title">타이틀 C</h1>
        <a href="#" class="btn btn-primary">CTA 버튼</a>
        <p class="microcopy">마이크로카피</p>
      </div>
    </div>
  </div>
  <!-- 도트 네비게이션 -->
  <div class="slider-dots">
    <button class="dot active"></button>
    <button class="dot"></button>
    <button class="dot"></button>
  </div>
  <!-- 좌우 화살표 -->
  <button class="slider-prev"><i data-lucide="chevron-left"></i></button>
  <button class="slider-next"><i data-lucide="chevron-right"></i></button>
</section>
<!-- + JS: 4~5초 자동전환, 도트 클릭, 좌우 버튼 -->
```

### 예시 2: 열 수

```
기획안 UI: "카드형 5열 (PC) / 2열 그리드 스와이프 (모바일)"
```

**❌ 잘못:** `grid-template-columns: repeat(3, 1fr)` 로 3열 + 나머지 2열 분리
**✅ 올바름:** `grid-template-columns: repeat(5, 1fr)` 로 정확히 5열

```css
/* ✅ 기획안이 5열이면 5열 */
.menu-grid { 
  display: grid; 
  grid-template-columns: repeat(5, 1fr); 
  gap: 24px; 
}
@media (max-width: 768px) {
  .menu-grid { grid-template-columns: repeat(2, 1fr); }
}
```

### 예시 3: 캐러셀

```
기획안 UI: "가로 스와이프 캐러셀 (3~6장)"
```

**❌ 잘못:** 정적 3열 그리드로 대체
**✅ 올바름:** overflow-x: auto 가로 스크롤 또는 JS 캐러셀

```css
/* ✅ 캐러셀이면 캐러셀 */
.carousel-track {
  display: flex;
  gap: 24px;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  padding-bottom: 16px;
}
.carousel-card {
  min-width: 320px;
  flex-shrink: 0;
  scroll-snap-align: start;
}
```

### 예시 4: 가로 스텝바

```
기획안 UI: "가로 스텝바 (PC 4단계) / 수직 타임라인 (모바일)"
```

**❌ 잘못:** 세로 스텝 리스트 (Left 04)
**✅ 올바름:** PC에서 가로 4열, 모바일에서 세로

```css
/* ✅ 가로 스텝바 */
.process-steps {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 32px;
  text-align: center;
}
@media (max-width: 768px) {
  .process-steps { grid-template-columns: 1fr; text-align: left; }
}
```

### 예시 5: 없는 섹션 추가 금지

```
기획안: 섹션 1~7까지 총 7개
```

**❌ 잘못:** 섹션 7 뒤에 footer-cta 섹션을 임의로 추가
**✅ 올바름:** 기획안의 섹션만 구현. 푸터 CTA는 파일 00의 푸터 기획에 포함된 경우에만.

### 예시 6: 유채색 배경 변환

```
기획안 UI: "보라색 배경 풀 와이드 밴드"
```

**✅ 와이어프레임 변환:** `background: var(--bg-dark)` + 흰색 텍스트
(와이어프레임은 그레이스케일이므로, 유채색 배경은 다크 배경으로 대체)

### 예시 7: CTA별 개별 마이크로카피

```
기획안:
  CTA 1: "카카오톡 견적 상담" — 마이크로카피: "30분 이내 회신 · 세금계산서 발행 가능"
  CTA 2: "전화 문의 [대표번호]" — 마이크로카피: "평일 9시~18시"
```

**❌ 잘못:** 마이크로카피를 하나로 합치거나 누락
**✅ 올바름:** 각 CTA 아래에 개별 마이크로카피 배치

```html
<div class="cta-group">
  <div class="cta-item">
    <a href="#" class="btn btn-primary">카카오톡 견적 상담</a>
    <p class="microcopy">30분 이내 회신 · 세금계산서 발행 가능</p>
  </div>
  <div class="cta-item">
    <a href="tel:000" class="btn btn-secondary">전화 문의</a>
    <p class="microcopy">평일 9시~18시</p>
  </div>
</div>
```

---

## 기획안 UI → 와이어프레임 변환 규칙

기획안은 완성 디자인 기준으로 작성되어 있으므로, 그레이스케일 와이어프레임으로 변환 시:

### 이미지/배경 변환
| 기획안 | 와이어프레임 |
|---|---|
| "풀스크린 이미지 배경" | `background: var(--bg-dark)` + 풀스크린 `img-placeholder` 아이콘 |
| "배경: OO 사진" | 다크 배경 + 이미지 플레이스홀더 |
| "대형 이미지" | `img-placeholder` + `aspect-ratio` |

### 유채색 변환
| 기획안 | 와이어프레임 |
|---|---|
| "보라색/파란색/컬러 배경" | `background: var(--bg-dark)` + 흰색 텍스트 |
| "따뜻한 크림톤" | `background: var(--bg-light)` |

### 인터랙션 — 반드시 실제 구현
| 기획안 | 와이어프레임 |
|---|---|
| "슬라이드 N장 자동 전환" | **JS 캐러셀**: 자동전환 + 도트네비 + 좌우버튼 |
| "캐러셀", "스와이프" | **CSS/JS**: overflow-x 스크롤 또는 JS 캐러셀 |
| "아코디언" | **JS**: 클릭 토글 |
| "탭 전환" | **JS**: 탭 클릭 → 패널 전환 |

### 레이아웃 — 기획안 열 수 그대로
| 기획안 | 와이어프레임 |
|---|---|
| "N열 카드" | `grid-template-columns: repeat(N, 1fr)` |
| "가로 스텝바 4단계" | 가로 4열 grid, 모바일에서 세로 |
| "좌측 이미지 + 우측 텍스트" | 2열 그리드 (이미지 좌 / 텍스트 우) |

### 카피 — 빠짐없이 전부
| 기획안 | 와이어프레임 |
|---|---|
| 헤드카피 | `<h1>` 또는 `<h2>` |
| 서브카피 | `<p>` .section-desc |
| 슬라이드별 카피 | **모든 슬라이드에 각각 적용** |
| CTA 버튼 텍스트 | `.btn` 텍스트 그대로 |
| 마이크로카피 | 버튼 아래 작은 텍스트 (13px, --text-light) |
| 콘텐츠 항목 N개 | **정확히 N개** 모두 구현 |

---

## 기획안 입력 구조

리건님이 전달하는 기획안은 아래 순서로 구성됨:

### 파일 00 — 사이트맵 + 헤더 + 푸터 (전역 공통)
- 사이트맵: 메뉴 구조, P-코드, URL slug
- 헤더: PC/모바일/스크롤 동작
- 푸터: CTA영역, 본문, 하단
- 글로벌 전환 요소: 플로팅CTA, 팝업, 공통 신뢰배지
- SEO 공통 설정

### 파일 01~N — 페이지별 바디
- 페이지당 1개 파일
- 섹션별: 목적/헤드카피/서브카피/CTA/마이크로카피/콘텐츠구성/UI/비주얼방향

### 파일 99 — 전환 설계서
- 전환 퍼널, CTA 매핑, 이탈방지, 내부링킹맵

---

## 와이어프레임 출력 구조

### 1단계: 공통 요소 먼저 제작

파일 00을 받으면:
```
[A] 헤더 코드 — Nav 스타일 + PC메뉴 + 모바일 햄버거 + sticky
[B] 푸터 코드 — Footer 스타일 + CTA영역 + 본문 + 하단
[C] 공통 CSS/JS
```
→ 헤더+푸터 빈 껍데기 HTML 출력 → 확인 후 다음

### 2단계: 페이지별 바디 제작

파일 01~N을 받으면:
```
[페이지 HTML] = 공통 헤더 + 해당 페이지 바디 + 공통 푸터
```
→ 완전한 단일 HTML 파일 (CSS/JS 인라인)

### 작업 순서
```
파일 00 → 헤더+푸터 → 확인
파일 01 → P01-홈.html → 확인
파일 02 → P02-소개.html → 확인
... 반복
```

---

## ⛔ 절대 금지 사항

### 🔴 기획안 관련 금지 (가장 중요)
- **기획안의 UI 지시를 인벤토리 스타일로 대체 금지** — 슬라이드→좌우분할, 5열→3열, 캐러셀→그리드 등
- **기획안의 카피를 누락 금지** — 슬라이드 2·3, 카드 4·5 등 반드시 전부 포함
- **기획안에 없는 섹션을 임의 추가 금지**
- **기획안의 섹션 순서 변경 금지**
- **기획안의 열 수, 카드 수, 항목 수 변경 금지**

### CSS 관련 금지
- `linear-gradient()` — 그라데이션 금지
- `backdrop-filter` — blur 효과 금지
- `rgba()` 오버레이 — 이미지 위 반투명 레이어 금지
- `box-shadow`는 `--shadow-sm`과 `--shadow-md`만 허용
- `transform: scale()` 호버 금지

### 디자인 패턴 금지
- 이모지 금지 — Lucide Icons만
- 카드에 이미지+텍스트 오버레이 금지
- 벤토 그리드 금지

### 컬러 금지
- 유채색 일절 금지
- 흰색 텍스트는 다크 배경 위에서만

---

## 와이어프레임 디자인 원칙

### 핵심 톤
- 깨끗하고 플랫한 와이어프레임, 장식 최소화, 구조 중심

### 섹션 배경 패턴
- 흰색(#FFFFFF)과 연회색(#F5F5F5) 번갈아 사용
- 다크 배경(#2D2D2D)은 CTA, Footer, 또는 기획안의 유채색 배경 변환 시에만
- 연속 같은 배경색 금지

### 이미지 플레이스홀더
```html
<div class="img-placeholder" style="aspect-ratio:4/3;">
  <i data-lucide="image"></i>
</div>
```
- 오버레이, 그라데이션 금지

### 카드 스타일
- `border: 1px solid var(--border-light)` + `border-radius: var(--radius-md)`
- 또는 배경색 차이로 구분

### 버튼 스타일
- Primary: 검은 배경 + 흰 텍스트
- Secondary: 흰 배경 + 검은 테두리
- 다크 배경 위: Primary → 흰 배경 + 검은 텍스트

### 아이콘
- Lucide Icons CDN만 (`<i data-lucide="icon-name"></i>`)
- 아이콘 박스: 48×48 bg-light 사각 또는 64×64 원형

---

## 컬러 시스템

```css
:root {
  --text-black: #1A1A1A;
  --text-dark: #333333;
  --text-gray: #666666;
  --text-light: #999999;
  --text-muted: #BCBCBC;
  --bg-white: #FFFFFF;
  --bg-light: #F5F5F5;
  --bg-dark: #2D2D2D;
  --bg-black: #1A1A1A;
  --border-light: #E0E0E0;
  --border-default: #D0D0D0;
  --placeholder-bg: #E0E0E0;
  --placeholder-icon: #BCBCBC;
  --radius-sm: 8px;
  --radius-md: 12px;
  --shadow-sm: 0 1px 3px rgba(0,0,0,0.08);
  --shadow-md: 0 4px 12px rgba(0,0,0,0.1);
}
```

---

## 섹션 인벤토리 (68개) — 기획안에 UI 지시가 없을 때만 참고

코드 패턴은 wireframe-reference.html 참조

### Navigation (15종)

| # | 레이아웃 | 배경 |
|---|---------|------|
| Nav 01 | 로고(좌) + 메뉴(중앙) + 프로필(우) | 밝은 |
| Nav 02 | 메뉴(좌) + 로고(중앙) + 프로필(우) | 밝은 |
| Nav 03 | 로고(좌) + 메뉴(중앙) + CTA버튼(우) | 밝은 |
| Nav 04 | 로고(좌) + 메뉴(중앙) + SignUp/Login(우) | 밝은 |
| Nav 05 | 로고(좌) + 메뉴(우측 정렬) | 밝은 |
| Nav 06 | 로고(좌) + 메뉴(중앙) + 햄버거(우) | 밝은 |
| Nav 07 | 로고(좌) + 햄버거(우) | 밝은 |
| Nav 08 | 로고(좌) + 메뉴(중앙) + Login(우) | 밝은 |
| Nav 09 | 로고(좌) + 검색바(중앙) + Login(우) | 밝은 |
| Nav 10 | 로고(좌) + 검색+Login(우) | 밝은 |
| Nav 11 | 로고(좌) + 메뉴(중앙) + 언어/Login(우) | 밝은 |
| Nav 12 | 로고+메뉴+언어/Login | 다크 |
| Nav 13 | 로고+메뉴+프로필 | 다크 |
| Nav 14 | 로고+메뉴+SignUp/Login | 다크 |
| Nav 15 | 로고(좌) + 메뉴 + 장바구니/프로필(우) | 밝은 |

### Hero (13종)

| # | 레이아웃 |
|---|---------|
| Hero 01 | 좌측 텍스트+버튼 / 우측 이미지 (1:1 분할) |
| Hero 02 | 좌측 텍스트+버튼 / 우측 이미지 + 하단 파트너 로고줄 |
| Hero 03 | 중앙 텍스트+버튼 + 하단 풀와이드 이미지 |
| Hero 04 | 중앙 텍스트+버튼 + 하단 2분할 이미지 |
| Hero 05 | 중앙 텍스트+버튼 + 하단 이미지 |
| Hero 06 | 중앙 텍스트+버튼 + 이미지 + 통계 수치 3열 |
| Hero 07 | 다크 배경 풀스크린 중앙 텍스트+버튼 |
| Hero 08 | 대형 타이틀 + 우측 이미지 |
| Hero 09 | 대형 타이틀 + 하단 이미지 |
| Hero 10 | 대형 대문자 타이틀 + CTA |
| Hero 11 | 대형 대문자 + 이미지 오버랩 |
| Hero 12 | 대형 대문자 + 우측 이미지 |
| Hero 13 | 대형 대문자 + 중앙 이미지 |

### Center Content (9종)

| # | 레이아웃 |
|---|---------|
| Center 01 | 중앙 제목 + 2열 (이미지+텍스트) 카드 |
| Center 02 | 중앙 제목 + 2x2 그리드 카드 |
| Center 03 | 중앙 제목 + 좌우 분할 텍스트 |
| Center 04 | 중앙 제목 + 3x2 카드 그리드 |
| Center 05 | 중앙 제목 + 단일 큰 이미지 |
| Center 06 | 중앙 제목 + 비디오 플레이어 |
| Center 07 | 중앙 제목 + 탭 네비게이션 |
| Center 08 | 중앙 제목 + 수평 스크롤 카드 |
| Center 09 | 중앙 제목 + 로고 그리드 |

### Left Content (5종)

| # | 레이아웃 |
|---|---------|
| Left 01 | 좌측 텍스트+CTA / 우측 이미지 |
| Left 02 | 좌측 아이콘리스트+CTA / 우측 이미지 |
| Left 03 | 중앙 제목 + 좌우 분할 (큰 이미지) |
| Left 04 | 중앙 제목 + 4단계 프로세스 스텝 |
| Left 05 | 중앙 제목 + 세로 카드 리스트 |

### Right Content (5종)

| # | 레이아웃 |
|---|---------|
| Right 01 | 좌측 이미지 / 우측 텍스트+CTA |
| Right 02 | 좌측 이미지 / 우측 아이콘리스트+CTA |
| Right 03 | 중앙 제목 + 좌우 분할 (큰 이미지) |
| Right 04 | 중앙 제목 + 4단계 프로세스 |
| Right 05 | 중앙 제목 + 세로 카드 리스트 |

### Feature (6종)

| # | 레이아웃 |
|---|---------|
| Feature 01 | 중앙 제목 + 3x2 아이콘 카드 그리드 |
| Feature 02 | 중앙 제목 + 4x2 아이콘 카드 그리드 |
| Feature 03 | 중앙 제목 + 4x2 텍스트 그리드 |
| Feature 04 | 중앙 제목 + 3열 카드 (구분선) |
| Feature 05 | 중앙 제목 + 3x2 텍스트 블록 |
| Feature 06 | 좌측 이미지 + 우측 세로 리스트 |

### Clients / Testimonials (8종)

| # | 레이아웃 |
|---|---------|
| Clients 01 | 큰 이미지 + 인용문 |
| Clients 02 | 가로 이미지 + 인용문 |
| Clients 03 | 중앙 인용문 + 프로필 (심플) |
| Clients 04 | 2열 프로필+후기 카드 |
| Clients 05 | 별점 + 2열 슬라이더 |
| Clients 06 | 다크 배경 강조 인용 카드 |
| Clients 07 | 가로 스크롤 후기 |
| Clients 08 | 가로 스크롤 작은 카드 |

### FAQs (4종)

| # | 레이아웃 |
|---|---------|
| FAQ 01 | 중앙 제목 + 아코디언 (닫힘) |
| FAQ 02 | 중앙 제목 + 아코디언 (열림 포함) |
| FAQ 03 | 좌측 제목 + 우측 아코디언 |
| FAQ 04 | 중앙 제목 + 2열 Q&A 그리드 |

### Call to Action (6종)

| # | 레이아웃 |
|---|---------|
| CTA 01 | 중앙 제목 + 버튼 (밝은 배경) |
| CTA 02 | 중앙 제목 + 2버튼 (밝은 배경) |
| CTA 03 | 다크 배경 / 좌측 텍스트+버튼 / 우측 이미지 |
| CTA 04 | 다크 배경 / 좌측 텍스트+2버튼 / 우측 이미지 |
| CTA 05 | 좌측 이미지 / 우측 텍스트+입력폼 |
| CTA 06 | 좌측 텍스트+입력폼 / 우측 이미지 |

### Footer (2종)

| # | 레이아웃 |
|---|---|
| Footer 01 | 밝은 배경 / 3-4열 링크+브랜드 |
| Footer 02 | 다크 배경 / 3-4열 링크+브랜드 |

---

## 코딩 규칙

### 파일 구조
- 각 페이지는 완전한 단일 HTML 파일 (CSS/JS 인라인)
- 파일명: P코드 기반 (예: P01-home.html)
- 헤더/푸터는 모든 페이지에 동일 복사

### HTML 뼈대
```html
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>기획안 SEO title</title>
  <meta name="description" content="기획안 meta description">
  <link href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css" rel="stylesheet">
  <script src="https://unpkg.com/lucide@latest"></script>
  <style>/* CSS */</style>
</head>
<body>
  <header class="nav">/* 공통 헤더 */</header>
  <main>
    <!-- 기획안 섹션만, 기획안 순서대로 -->
    <section>/* 기획안 섹션 1 */</section>
    <section>/* 기획안 섹션 2 */</section>
    ...
    <section>/* 기획안 섹션 N */</section>
    <!-- ⛔ 기획안에 없는 섹션 추가 금지 -->
  </main>
  <footer>/* 공통 푸터 */</footer>
  <script>
    lucide.createIcons();
    // 슬라이드, 캐러셀, 아코디언 등 JS
  </script>
</body>
</html>
```

### 반응형
- Desktop: 1440px (기본)
- Tablet: 768px
- Mobile: 375px
- 기획안에 모바일 레이아웃 지시가 있으면 그대로 따름

---

## 최종 체크리스트 — 코드 생성 후 반드시 확인

### 🔴 기획안 충실도 (최우선)
- [ ] 기획안의 모든 섹션이 빠짐없이 구현되었는가
- [ ] 기획안에 없는 섹션을 추가하지 않았는가
- [ ] 기획안의 UI 지시를 그대로 따랐는가 (열 수, 슬라이드 수, 캐러셀 등)
- [ ] 슬라이드가 N장이면 N장 모두 카피가 포함되었는가
- [ ] 카드가 N개이면 정확히 N개 있는가
- [ ] 기획안의 카피를 빠짐없이 적용했는가 (헤드/서브/CTA/마이크로)
- [ ] 기획안의 콘텐츠 항목을 하나도 누락하지 않았는가

### 스타일 준수
- [ ] gradient, backdrop-filter, rgba 오버레이 없는가
- [ ] 이모지 없는가 (Lucide Icons만)
- [ ] 유채색 없는가
- [ ] 이미지=회색 플레이스홀더인가
- [ ] 섹션 배경이 흰/회 번갈아 사용되는가
- [ ] 헤더/푸터가 공통 코드와 동일한가
- [ ] 반응형이 포함되어 있는가

### 인터랙션
- [ ] 슬라이드 → JS 자동전환 + 도트 + 좌우버튼 구현했는가
- [ ] 캐러셀 → 가로 스크롤 또는 JS 캐러셀 구현했는가
- [ ] 아코디언 → JS 토글 구현했는가
