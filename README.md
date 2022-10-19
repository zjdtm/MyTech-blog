# 테코몽 (Tech Communication Blog)

![테코몽](https://user-images.githubusercontent.com/35757620/195279963-b2716ff7-bc19-4ee7-ac2b-f3a8b1ca83f2.gif)

## 프로젝트 설명
하루 하루 공부했던 내용들을 정리하는 습관을 들이기 위해서 기술 블로그를 만들게 되었습니다. 다른 좋은
블로그 사이트도 있지만 내가 추가해보고 싶은 기능과 처음부터 다시 공부하겠다는 마음가짐으로 계획하게 되었습니다.
테코몽에 주요 기능들을 설명하자면
* 나만이 아닌 다른 사람들의 기술 블로그도 볼 수 있다.
* 마음에 드는 기술 블로그가 있다면 좋아요 기능을 넣어서 사이트 인기글에 등록 될 수 있다.
* 혼자서 공부하는 것이 아닌 서로 소통하는 환경을 만들어 내는 실시간 채팅 기능이 구현되어 있다.

## 흐름도 및 와이어프레임
https://www.figma.com/file/VdFqvp1yaHNDdWvI2fotJX/blog%EC%99%80%EC%9D%B4%EC%96%B4%ED%94%84%EB%A0%88%EC%9E%84?node-id=0%3A1

## 기술 스택
<div align="center">
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=white">
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white">
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=MongoDB&logoColor=white">
  <img src="https://img.shields.io/badge/Koa-33333D?style=for-the-badge&logo=Koa&logoColor=white">
  <img src="https://img.shields.io/badge/Redux-764ABC?style=for-the-badge&logo=Redux&logoColor=white">
</div>
  
### React를 사용한 이유!
>React는 사용자 인터페이스를 구축하기 위한 선언적이고 효율적이며 유연한 JavaScript 라이브러리입니다. “컴포넌트”라고 불리는 작고 고립된 코드의 파편을 이용하여 복잡한 UI를 구성하도록 돕습니다.  -React 자습서 중-

간단하게 요약하면 데이터가 변할때마다 기존에 있는 뷰를 없애고 새롭게 렌더링 하는 방식입니다.
바꿔야 할 데이터만 바꾸면 되는데 처음부터 다시 새롭게 만드는 방식이 더 비효율적이라고 생각할 수도 있지만 이는 사실 처음 렌더링 한 DOM과 새로운 DOM 을 비교해서 최적의 방법으로 업데이트 하는 것입니다.
이렇게 UI 업데이트를 더욱 쉽게 만들 수 있는 리액트를 선택한 이유입니다. 

### Node.js를 사용한 이유!
>Node.js®는 Chrome V8 JavaScript 엔진으로 빌드된 JavaScript 런타임입니다. - node.js 홈페이지 중-

Node.js는 자바스크립트를 활용해 서버를 개발 할 수 있는 장점을 가지고 있으며
Non-blocking I/O, 이벤트 루프, 단일 스레드 방식을 통해 높은 처리 성능을 가지고 있다.

### MongoDB를 사용한 이유!
> ● 문서 데이터 모델 - 데이터 작업을 위한 최상의 방법을 제시합니다.

> ● 분산 시스템 구성 - 원하는 곳에 데이터를 지능적으로 배치할 수 있습니다.

> ● 어디서나 자유롭게 실행할 수 있는 통합 경험 - 미래의 업무에서도 사용할 수 있으며 공급업체에 종속되지 않습니다.

MongoDB는 대표적인 NoSQL 데이터베이스로 RDBMS 보다 데이터 형식이 엄격하지 않게 유동적으로 데이터를 생성 할 수 있다는 장점을 가지고 있습니다.

### Express 대신 Koa를 사용한 이유!
>Koa는 웹 애플리케이션 및 API를 위한 더 작고, 표현력이 뛰어나고, 강력한 기반이 되는 것을 목표로 하는 Express 팀이 설계한 새로운 웹 프레임워크입니다

Express는 미들웨어, 라우팅, 템플릿, 파일 호스팅과 같이 여러 기능을 가지고 있지만
Koa는 미들웨어 기능만을 갖추고 있어서 내가 필요한 라이브러리만 추가할 수 있습니다 거기에 더해
async/await 비동기 방식을 사용할 때도 편하기 때문에 
Express 보다 더 가벼운 Koa를 선택하였습니다.

### 프로젝트 계획
|날짜|내용|기능|
| --- | --- | --- |
|2022-10-05 ~ 10-07|프로젝트 계획 구상||
|2022-10-11 ~ 10-13|흐름도 작성 및 와이어 프레임 구상||
|2022-10-13 ~ 10-15|백엔드 api(게시글 작성) 구현(Node.js mongoose, koa)||
|2022-10-15 ~ 10-19|프론트엔드 (navbar, slidebar, postlist) 구조 코딩||


