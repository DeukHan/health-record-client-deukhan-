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

# React 프로젝트에 FullCalendar모듈 설치
npm install --save @fullcalendar/react @fullcalendar/core @fullcalendar/daygrid

#Home.js에 fullcalendar import 및 사용
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
<FullCalendar 
  defaultView="dayGridMonth" 
  plugins={[ dayGridPlugin ]}
/>
