# Health Record Application

## Environment

CRA(create-react-app) 을 이용하여 typescript 를 셋팅 후 필요한 모듈을 설치해야 한다. 

```sh
# CRA 을 이용한 Typescrip 설정하기
npx create-react-app . --template typescript

# bootstrap 모듈 설치
npm i react-bootstrap bootstrap

# http 통신을 위한 모듈 설치
npm i axios http-proxy-middleware

# router 모듈 설치
npm i react-router-dom @types/react-router-dom

```

## Attendance check 기능 구현

```sh
# React 프로젝트에 FullCalendar모듈 설치
npm install --save @fullcalendar/react @fullcalendar/core @fullcalendar/daygrid

```

```sh
#Home.js에 fullcalendar import 및 사용
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'

<FullCalendar 
  defaultView="dayGridMonth" 
  plugins={[ dayGridPlugin ]}
/>

```
TypeScipt에서는 FullCalendar의 defaultView기능을 사용할 수 없어 JavaScipt로 변경하게 됨.
<img width="746" alt="image" src="https://user-images.githubusercontent.com/104338516/173835478-6694d745-d4b1-4bdb-ae38-49605c4d81ff.png">

기본 달력이 적용된 화면
<img width="1438" alt="image" src="https://user-images.githubusercontent.com/104338516/173836625-bb5e8df4-ce87-4b57-950b-e3cd2b51180e.png">
