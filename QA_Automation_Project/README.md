# QA Automation Project

[![Playwright E2E Tests](https://github.com/sjim25/portfolio/actions/workflows/playwright.yml/badge.svg)](https://github.com/sjim25/portfolio/actions/workflows/playwright.yml)

Playwright + TypeScript 기반 E2E 자동화 데모 프로젝트입니다. 외부 데모 사이트인 [Sauce Demo](https://www.saucedemo.com/)를 대상으로 POM, fixture, config, reporter, locator 전략, GitHub Actions CI 구성을 보여줍니다.

## 목차

- [프로젝트 핵심 요약](#프로젝트-핵심-요약)
- [프로젝트 개요](#프로젝트-개요)
- [품질 설계 포인트](#품질-설계-포인트)
- [기술 스택](#기술-스택)
- [프로젝트 구조](#프로젝트-구조)
- [설치 및 실행 방법](#설치-및-실행-방법)
- [테스트 케이스 요약](#테스트-케이스-요약)
- [설계 설명](#설계-설명)
- [CI 구성](#ci-구성)

## 프로젝트 핵심 요약

- 대상 서비스: [Sauce Demo](https://www.saucedemo.com/) 커머스 데모 사이트
- 테스트 범위: 로그인, 장바구니, 체크아웃 완료까지 이어지는 핵심 사용자 흐름
- 자동화 구조: Playwright + TypeScript + Page Object Model + Custom Fixture
- 품질 관점: 핵심 사용자 흐름 우선 검증, 테스트 독립성, Flaky Test 방지, 실패 분석 가능성
- CI 구성: GitHub Actions에서 TypeScript 검증과 Chromium, Firefox, WebKit 크로스 브라우저 E2E 테스트 실행

## 프로젝트 개요

이 프로젝트는 커머스 서비스의 핵심 사용자 흐름을 자동화한 QA 포트폴리오용 E2E 테스트 프레임워크입니다. 로그인, 상품 선택, 장바구니, 체크아웃 완료까지 이어지는 실제 사용자 시나리오를 Playwright로 검증하며, 테스트 유지보수성을 위해 Page Object Model과 custom fixture 구조를 적용했습니다.

주요 목적은 다음 역량을 보여주는 것입니다:

- E2E 테스트 시나리오 설계 및 자동화
- POM 기반 테스트 코드 구조화
- fixture를 활용한 테스트 의존성 관리
- 안정적인 locator 전략 적용
- reporter와 trace 기반 실패 분석 환경 구성
- GitHub Actions 기반 CI 실행 구성

## 품질 설계 포인트

Sauce Demo는 QA 자동화 학습과 포트폴리오에서 자주 사용되는 공개 데모 사이트입니다. 따라서 이 프로젝트는 단순히 Playwright 사용법을 보여주는 데 그치지 않고, 테스트의 안정성, 유지보수성, 실행 효율성을 함께 고려한 구조로 작성했습니다.

### 핵심 사용자 흐름 우선 검증

테스트 범위는 사용자가 실제 서비스에서 가장 중요하게 경험하는 로그인, 상품 선택, 장바구니, 체크아웃 완료 흐름을 중심으로 선정했습니다. 단순 화면 요소 확인보다 구매 여정이 끝까지 정상 동작하는지를 우선 검증해, 제한된 테스트 범위 안에서도 서비스 품질에 직접적인 영향을 주는 시나리오를 자동화했습니다.

### Flaky Test 방지 전략

네트워크 지연이나 비동기 렌더링으로 인한 Flaky Test를 줄이기 위해 하드 코딩된 `waitForTimeout` 사용을 배제했습니다. 대신 Playwright의 auto-waiting 동작과 `expect(locator).toBeVisible()`, `expect(locator).toHaveText()` 같은 웹 퍼스트 어설션을 사용해 요소가 실제로 검증 가능한 상태가 될 때까지 기다리도록 구성했습니다.

### 테스트 데이터 격리 및 실행 효율성

각 테스트는 독립적으로 로그인과 필요한 사전 조건을 구성하도록 작성했습니다. `TC-CHECKOUT-001`처럼 긴 E2E 시나리오는 실제 사용자 흐름 검증에 집중하고, 장바구니 추가/삭제 같은 기능 검증은 별도 테스트로 분리해 테스트 간 의존성을 최소화했습니다.

또한 Custom Fixture를 통해 Page Object 생성 책임을 공통화하고, 로그인이나 상품 추가 같은 반복 UI 액션은 POM 메서드로 모듈화했습니다. 이를 통해 테스트 코드의 중복을 줄이고, locator 또는 화면 구조 변경 시 수정 범위를 Page Object 내부로 제한할 수 있습니다.

### CI 실행 상태 표시

README 상단에 GitHub Actions Badge를 추가해 현재 E2E 테스트가 GitHub CI 환경에서 통과 중인지 직관적으로 확인할 수 있도록 했습니다. 이 프로젝트는 `sjim25/portfolio` 저장소의 하위 폴더에 위치하므로, workflow 파일은 GitHub가 인식할 수 있는 저장소 루트의 `.github/workflows/playwright.yml`에 두고 테스트 실행 위치만 `QA_Automation_Project`로 지정했습니다.

## 기술 스택

- Playwright Test
- TypeScript
- Page Object Model
- Custom fixtures
- GitHub Actions

## 프로젝트 구조

```text
portfolio/
├── .github/workflows/playwright.yml
└── QA_Automation_Project/
    ├── tests/
    │   ├── fixtures/
    │   │   └── test-fixtures.ts
    │   ├── pages/
    │   │   ├── cart-page.ts
    │   │   ├── checkout-page.ts
    │   │   ├── inventory-page.ts
    │   │   ├── login-page.ts
    │   │   └── product-utils.ts
    │   └── specs/
    │       ├── cart.spec.ts
    │       ├── checkout.spec.ts
    │       └── login.spec.ts
    ├── playwright.config.ts
    ├── package.json
    └── tsconfig.json
```

## 설치 및 실행 방법

### 설치

```bash
npm install
npx playwright install
```

### 전체 테스트 실행

```bash
npm run test:e2e
```

### Chromium Smoke Test

빠른 smoke test를 위해 Chromium만 실행할 수 있습니다:

```bash
npm run test:e2e:chromium
```

### 리포트 확인

HTML 리포트는 다음 명령어로 확인할 수 있습니다:

```bash
npm run report
```

## 테스트 케이스 요약

### `TC-LOGIN-001` 정상 로그인 검증

- 목적: 정상 계정으로 로그인했을 때 상품 목록 페이지에 진입할 수 있는지 검증합니다.
- 사전 조건: Sauce Demo 로그인 페이지에 접근 가능하고, `standard_user` 계정이 사용 가능합니다.
- 검증 포인트: 로그인 후 상품 목록 타이틀과 인벤토리 목록이 표시됩니다.

### `TC-LOGIN-002` 잠긴 계정 로그인 에러 검증

- 목적: 잠긴 계정으로 로그인 시도 시 사용자가 적절한 에러 메시지를 확인할 수 있는지 검증합니다.
- 사전 조건: Sauce Demo 로그인 페이지에 접근 가능하고, `locked_out_user` 계정이 사용 가능합니다.
- 검증 포인트: 로그인 실패 후 locked out 상태를 안내하는 에러 메시지가 표시됩니다.

### `TC-CART-001` 다중 상품 장바구니 추가 검증

- 목적: 사용자가 여러 상품을 장바구니에 담을 수 있고, 선택한 상품이 장바구니에 정확히 반영되는지 검증합니다.
- 사전 조건: 정상 계정으로 로그인해 상품 목록 페이지에 진입한 상태입니다.
- 검증 포인트: 장바구니 배지가 선택한 상품 수와 일치하고, 장바구니 페이지에서 선택한 상품명이 표시됩니다.

### `TC-CART-002` 장바구니 상품 삭제 검증

- 목적: 장바구니에 담긴 상품을 삭제했을 때 목록에서 제거되는지 검증합니다.
- 사전 조건: 정상 계정으로 로그인 후 특정 상품을 장바구니에 추가한 상태입니다.
- 검증 포인트: 삭제한 상품이 장바구니 목록에서 더 이상 표시되지 않습니다.

### `TC-CHECKOUT-001` 전체 체크아웃 흐름 검증

- 목적: 로그인부터 상품 선택, 장바구니 확인, 주문 정보 입력, 주문 완료까지 이어지는 핵심 구매 흐름을 검증합니다.
- 사전 조건: 정상 계정으로 로그인할 수 있고, 상품 목록에서 구매 대상 상품을 선택할 수 있습니다.
- 검증 포인트: 체크아웃 정보 입력 후 주문 개요가 표시되고, 최종 완료 메시지가 표시됩니다.

## 설계 설명

### POM

Page Object는 `tests/pages`에 위치합니다. 각 클래스는 하나의 페이지에서 사용하는 locator와 사용자 동작을 담당합니다:

- `LoginPage`: 로그인 폼 입력 및 로그인 에러 검증
- `InventoryPage`: 상품 목록, 정렬, 장바구니 추가, 장바구니 이동
- `CartPage`: 장바구니 상품 검증, 상품 삭제, 체크아웃 이동
- `CheckoutPage`: 사용자 정보 입력, 주문 개요 확인, 주문 완료 검증

### Fixture

`tests/fixtures/test-fixtures.ts`는 Playwright의 기본 `test`를 확장해 Page Object를 fixture로 제공합니다. 이를 통해 spec 파일에서 Page Object를 직접 생성하지 않고 주입받아 사용할 수 있습니다:

```ts
test('standard user can sign in', async ({ loginPage, inventoryPage }) => {
  await loginPage.open();
  await loginPage.login();
  await inventoryPage.expectLoaded();
});
```

### Locator 전략

이 프로젝트는 안정적인 요소 탐색 전략을 보여주기 위해 세 가지 locator 방식을 함께 사용합니다:

- Role locator: `page.getByRole('button', { name: 'Login' })`
- Text locator: `page.getByText('Products', { exact: true })`
- Test id locator: `page.getByTestId('username')`

Sauce Demo 사이트는 `data-test` 속성을 제공하므로, `playwright.config.ts`에서 `testIdAttribute: 'data-test'`를 설정했습니다.

### Config와 Reporter

`playwright.config.ts`에는 다음 실행 설정이 포함되어 있습니다:

- Sauce Demo 대상 `baseURL`
- Chromium, Firefox, WebKit 브라우저 프로젝트
- CI 환경을 고려한 retry와 worker 설정
- 실패 분석을 위한 trace, screenshot, video 저장 설정
- HTML, JSON, JUnit, GitHub reporter 예시

### CI 구성

`.github/workflows/playwright.yml`은 GitHub Actions에서 실행되는 CI 설정 파일입니다. 의존성 설치, Playwright 브라우저 설치, TypeScript 검증, E2E 테스트 실행, 테스트 리포트 업로드를 자동으로 수행합니다.

현재 저장소에서는 `QA_Automation_Project`가 하위 폴더이므로 workflow에 `working-directory: QA_Automation_Project`를 설정해 npm 명령이 올바른 프로젝트 위치에서 실행되도록 구성했습니다.

CI에서는 Chromium, Firefox, WebKit 프로젝트를 모두 실행해 동일한 핵심 사용자 흐름이 주요 브라우저 엔진에서도 유지되는지 확인합니다. 테스트 실패 시 HTML report, trace, screenshot, video 결과물을 artifact로 업로드해 실패 원인을 재현하고 분석할 수 있도록 했습니다.
