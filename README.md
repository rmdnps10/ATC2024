# ATC 2024 Web team repo ⚒️

<pre>
🔆 2024 ATC topic: "🐘코끼리를 냉장고에 넣는 방법"

ATC에 관한 모든 것을 아카이빙하는 <b>인터랙티브 웹.</b>
</pre>

### 🖇️ URL

> 배포용 : https://2024atc.vercel.app/ (후에 도메인 구매 예정)

> 개발용 : https://art2024-dev.netlify.app/

> Wireframe : [figma link](https://www.figma.com/design/Gg3Kl9xJ9zcpAwbfrF21td/atc_%EC%99%80%EC%9D%B4%EC%96%B4%ED%94%84%EB%A0%88%EC%9E%84?node-id=507-1000&t=Gp1D3eMwsQq6L9Fh-1)

## 애플리케이션 실행 방법

```
npm run dev
```

## 협업 방식

1. 깃허브에 이슈를 등록한다.
2. 해당 이슈를 트래킹하는 브랜치를 등록한다.

ᚼ **브랜치명 컨벤션**

```
sprint/각자맡은페이지#이슈번호

ex) sprint/about-page#2
```

3. 로컬 환경에서 작업을 이어카며 커밋을 이어간다.

✓ **커밋 컨벤션**

```
🔥Feat: 새로운 기능 추가
🔥Design: CSS 등 사용자 UI 디자인 변경
🔥Fix: 버그 수정
🔥Style: 코드 포맷 변경 (예: 세미콜론 누락 등), 기능의 변화 없음
🔥Refactor: 코드 리팩토링 (기능 변경 없이 코드 구조 개선)
🔥Chore: 자잘한 부분의 작업 (파일 이동, 파일명 변경, 새로운 패키지 다운로드, import, export)
!BREAKING CHANGE: API와 같은 커다란 변경
!HOTFIX: 급하게 치명적인 버그를 수정
Comment: 주석 추가 및 변경
Docs: 문서 수정
Test: 테스트 코드 또는 빌드 관련 설정 변경, production 코드 변화 없음
```

## Directory structure

```
📦public
 ┣ 📂icon  : 프로젝트에 쓰일 아이콘 
 ┃ ┗ 📜.gitkeep
 ┣ 📂images : 프로젝트 쓰일 그래픽, 이미지, 후에 
 ┃ ┗ 📜.gitkeep
 ┗ 📂logo : 로고 (회사 로고, atc 로고, 그 이 이것저것)
 ┃ ┗ 📜atc-logo.svg
 📦src
 ┣ 📂app : Nextjs 컨벤션에 따라 생성해주는 페이지
 ┃ ┣ 📂(main)
 ┃ ┃ ┣ 📂about : '/about' 경로에 생성하는 페이지
 ┃ ┃ ┃ ┣ 📜page.js
 ┃ ┃ ┃ ┗ 📜page.module.css
 ┃ ┃ ┣ 📂archive : '/archive' 경로에 생성하는 페이지
 ┃ ┃ ┃ ┗ 📜page.js
 ┃ ┃ ┣ 📂credit : '/credit' 경로에 생성하는 페이지
 ┃ ┃ ┃ ┗ 📜page.js
 ┃ ┃ ┣ 📂map : '/map' 경로에 생성하는 페이지
 ┃ ┃ ┃ ┗ 📜page.js
 ┃ ┃ ┣ 📂program : '/program' 경로에 생성하는 페이지
 ┃ ┃ ┃ ┗ 📜page.js
 ┃ ┃ ┣ 📂work : '/work' 경로에 생성하는 페이지
 ┃ ┃ ┃ ┣ 📂[id] : '/work/[id]' 경로 (이때 id는 프로젝트 아이디를 가리키는 문자열)에 생성하는 페이지
 ┃ ┃ ┃ ┃ ┗ 📜page.js
 ┃ ┃ ┃ ┗ 📜page.js
 ┃ ┃ ┣ 📜Header.js : Header 컴포넌트
 ┃ ┃ ┣ 📜Header.module.css : Header 컴포넌트의 module css
 ┃ ┃ ┣ 📜layout.js
 ┃ ┃ ┗ 📜page.js
 ┃ ┣ 📂(onboard)
 ┃ ┃ ┣ 📂onboard
 ┃ ┃ ┃ ┗ 📜page.js
 ┃ ┃ ┗ 📜layout.js
 ┃ ┗ 📂api : Nextjs 컨벤션에 따라 생성해주는 api
 ┣ 📂hooks : 리액트 훅 모음 (useBlabla~~.js)
 ┣ 📂lib : 외부 라이브러리 연결
 ┣ 📂models :  데이터 베이스의 모델 스키마 모음
 ┣ 📂style : 전역 스타일 모음
 ┗ 📂utils : 유틸리티 함수들 (데이터 처리, 문자열 처리와 같은 범용적인 함수들 모음)
```

## 🚨개발 컨벤션

- 각자 맡은 페이지 폴더 하위에서, 각자가 맡은 페이지 마크업(UI 구현)을 page.js에서 진행

- css 스타일링은 module.css 방식으로 진행하며, `page.module.css` (🚨컨벤션)를 page.js 와 같은 파일 depth에서 정의.

  -  <a href="https://react.vlpt.us/styling/02-css-module.html">css module 사용방식</a> 참고

- page.js의 양이 너무 많을 경우 <b>분리할 수 있음!</b> 그러나, page.js 파일을 지우는 게 아니라, 컴포넌트 조각들을 생성하여 page.js에서 한번에 import 해줘야함.

    - 예를 들어서 About 페이지의 양이 너무 많은경우 page.js와 같은 파일 depth에서 About1, About2, About3.js 컴포넌트를 생성하고 page.js에서 한번에 import하여

```js
import About1 from "./About1";
import About2 from "./About1";
import About3 from "./About1";
export default function AboutPage() {
  return (
    <main>
      <About1 />
      <About2 />
      <About3 />
    </main>
  );
}
```

이런 식으로 적용함.
- `page.js`의 적용하는 module.css -> `page.module.css` 이름으로 설정
- 컴포넌트 조각들에 적용하는 module.css의 경우 `컴포넌트이름.module.css` (🚨컨벤션) 이름으로 설정함

</pre>

### 🫦 HTML/CSS 스타일 컨벤션

- [Google HTML/CSS Style Guide](https://google.github.io/styleguide/htmlcssguide.html)
- 마크업할 때 시멘틱 태그 사용할 수 있는 부분은 최대한 활용

  - `<section>` , `<article>`, `<p>`, `<main>` , `<ul>`, `<li>` 등등..
  - 📄 [시멘틱 태그가 뭔가요](https://yozm.wishket.com/magazine/detail/2495/)
  
- css 속성 선언 순서

```
1. display - 표시
2. overflow - 넘침
3. float - 흐름
4. position - 위치
5. z-index - 정렬
6. width & height - 크기
7. margin & padding - 간격
8. border - 보더
9. font - 폰트(축약형 사용시)
10. font-style - 폰트스타일(font-style: bold; 축약형 비사용시)
11. font-variant - 폰트 소문자, 대문자(font-variant: small-caps; 축약형 비사용시)
12. font-weight - 폰트굵기(font-weight: bold; 축약형 비사용시)
13. font-size - 폰트 사이즈(font-size: 14px; 축약형 비사용시)
14. line-height - 폰트 행간높이(line-height: 1.5; 축약형 비사용시)
15. font-family - 폰트(font-family:'굴림', Gulim, sans-serif; 축약형 비사용시)
16. background - 배경
17. etc(기타) - color, text-decoration, text-indent, clear...
```
- 컴포넌트 조각들에 적용하는 module.css의 경우 `컴포넌트이름.module.css` (🚨컨벤션) 이름으로 설정함
- 피그마 와이어프레임에서 사용되는 폰트는 외부에서 (눈누, 구글폰트) 가져오지않기 ❌,  일단은 font-family 설정하지 않고 기본폰트 사용하기. (디자인팀에서 폰트 확정되면 그때 로컬 폰트로 프로젝트 안에서 다운받아서 가져올거임)

### JS 컨벤션

- [js 스타일 가이드](https://github.com/tipjs/javascript-style-guide)
- 컴포넌트는 `export default function`로 내보내기


### 중요!!

만약에 개발하다가 컨벤션이 필요한 거 같은 부분, 애매한 부분이 있다면
디스코드로 언제든 질문
(답장 빠름)
