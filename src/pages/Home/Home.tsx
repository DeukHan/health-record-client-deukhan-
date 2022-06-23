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

import { eventStoreContext } from "./envet-store";

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
    let title = prompt("추가할 이벤트를 입력하세요.");
    const calendarApi = selectInfo.view.calendar;
    calendarApi.unselect();
    eventStore.addEvent(selectInfo, title);
  }

  function handleEventChange(changeInfo: EventChangeArg) {
    eventStore.changeEvent(changeInfo);
  }

  return (
    <div className="Home">
      <div className="Home-main">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: "prev,next",
            center: "title",
            //right: "dayGridMonth,timeGridWeek,timeGridDay",
            right: "myCustomButton today",
          }}
          buttonText={{
            today: '오늘',
            month: '월별',
            week: '주별',
            day: '일별',
          }}
          customButtons={{
            myCustomButton: {
              text: "출석체크",
              click: () => {
                alert("출석체크 되었습니다.")
              }
            }
          }}           
          initialView="dayGridMonth"
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          weekends={eventStore.weekendsVisible}
          events={eventStore.events.slice()}
          select={handleDateSelect}
          eventContent={renderEventContent}
          eventClick={handleEventClick}
          eventChange={handleEventChange}
        />
      </div>
    </div>
  );
});

function renderEventContent(eventContent: EventContentArg) {
  return (
    <>
      <b>{eventContent.timeText}</b>
      <i>{eventContent.event.title}</i>
    </>
  );
}

export default Home;