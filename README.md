# ATC 2024 Web team repo ⚒️
<pre>
🔆 2024 ATC topic: "🐘코끼리를 냉장고에 넣는 방법"

ATC에 관한 모든 것을 아카이빙하는 <b>인터랙티브 웹.</b>
</pre>

### 🖇️ URL

> 배포용 : https://2024atc.vercel.app/  (후에 도메인 구매 예정)

> 개발용 : https://art2024-dev.netlify.app/


### 애플리케이션 실행 방법

```
npm run dev
```


### 협업 방식

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


### Directory structure
```
📦src
 ┣ 📂app : Nextjs 컨벤션에 따라 생성해주는 페이지
 ┃ ┣ 📂about : '/about' 경로에 생성하는 페이지
 ┃ ┃ ┗ 📜page.js
 ┃ ┣ 📂api // Nextjs 컨벤션에 따라 생성해주는 api
 ┃ ┃ ┗ 📜.gitkeep
 ┃ ┣ 📂archive : '/archive' 경로에 생성하는 페이지
 ┃ ┃ ┗ 📜page.js
 ┃ ┣ 📂credit : '/credit' 경로에 생성하는 페이지
 ┃ ┃ ┗ 📜page.js
 ┃ ┣ 📂map : map 페이지
 ┃ ┃ ┗ 📜page.js
 ┃ ┣ 📂onboard : '/onbonard' 경로에 생성하는 페이지
 ┃ ┃ ┣ 📜layout.js
 ┃ ┃ ┗ 📜page.js
 ┃ ┣ 📂program  : '/program' 경로에 생성하는 페이지
 ┃ ┃ ┗ 📜page.js
 ┃ ┣ 📂work : '/work' 경로에 생성하는 페이지
 ┃ ┃ ┣ 📂[id] '/work/[id]' 경로 (이때 id는 프로젝트 아이디를 가리키는 문자열)에 생성하는 페이지
 ┃ ┃ ┃ ┗ 📜page.js
 ┃ ┃ ┗ 📜page.js
 ┃ ┣ 📜layout.js
 ┃ ┗ 📜page.js
 ┣ 📂hooks : 리액트 훅 모음 (useBlabla.js)
 ┣ 📂lib : 외부 라이브러리 연결
 ┣ 📂models :  데이터 베이스의 모델 스키마 모음
 ┣ 📂style : 전역 스타일 모음
 ┗ 📂utils : 유틸리티 함수들 (데이터 처리, 문자열 처리와 같은 범용적인 함수들 모음)
 ```