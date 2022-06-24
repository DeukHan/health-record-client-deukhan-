import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import FullCalendar, {
  EventContentArg,
  EventClickArg,
  DateSelectArg,
  EventChangeArg,
} from "@fullcalendar/react";

import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import resourceTimeGridPlugin from "@fullcalendar/resource-timegrid";
import { eventStoreContext } from "./envet-store";

import "@fullcalendar/common/main.css";
import "@fullcalendar/daygrid/main.css";

export const Home = observer(function Home() {
  const eventStore = useContext(eventStoreContext);

  function handleEventClick(clickInfo: EventClickArg) {
    if (
      window.confirm(
        `이벤트를 삭제 하시겠습니까? '${clickInfo.event.title}'`
      )
    ) {
      eventStore.deleteEvent(clickInfo.event.id);
    }
  }

  function handleDateSelect(selectInfo: DateSelectArg) {
    let title = prompt("추가 할 이벤트를 입력하세요.");
    if(title == null)
      return;
    const calendarApi = selectInfo.view.calendar;
    calendarApi.unselect();
    eventStore.addEvent(selectInfo, title);
  }

  function handleEventChange(changeInfo: EventChangeArg) {
    eventStore.changeEvent(changeInfo);
  }

  return (
    <div>
        <FullCalendar
          schedulerLicenseKey="GPL-My-Project-Is-Open-Source"
          ref={React.createRef()}
          aspectRatio= {1.35}
          height="auto"
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, resourceTimeGridPlugin]}
          headerToolbar={{
            left: "prev,next",
            center: "title",
            //right: "dayGridMonth,timeGridWeek,timeGridDay",
            right: "myAttendancecheck today",
          }}
          buttonText={{
            today: '오늘',
            month: '월별',
            week: '주별',
            day: '일별',
          }}
          customButtons={{
            myAttendancecheck: {
              text: "출석체크",
              click: () => {
                eventStore.addAttendancecheckEvent("출석");
              }
            }
          }}
          locale="ko"
          longPressDelay={30} //모바일에서 달력을 선택 했을 때, 딜레이가 길게되면 클릭이 잘 안되는 문제가 발생함. 
          initialView="dayGridMonth"
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={false}
          displayEventTime={true}
          weekends={eventStore.weekendsVisible}
          events={eventStore.events.slice()}
          select={handleDateSelect}
          eventContent={renderEventContent}
          eventClick={handleEventClick}
          eventChange={handleEventChange}
          // dayMaxEventRows={3}
        />
    </div>
  );
});

function renderEventContent(eventContent: EventContentArg) {
  console.log(eventContent);
  return (
    <>
      <b>{eventContent.timeText}</b>
      <i>{eventContent.event.title}</i>
    </>
  );
}

export default Home;