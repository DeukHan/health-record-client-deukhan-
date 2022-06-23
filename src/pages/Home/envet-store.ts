import { createContext } from "react";
import { observable, action, makeAutoObservable } from "mobx";
import { EventInput, DateSelectArg, EventChangeArg } from "@fullcalendar/react";

export class EventStore {

  constructor() {
    // observable: 추적 가능한 state 정의
    // action: state를 변경하는 메소드
    // computed: state와 캐시로부터 새로운 결과를 반환

    // makeObservable: action을 따로 설정해야 한다.
    // makeAutoObservable: 자동으로 action을 설정한다.

    // MobX 6 이상부터는 decorators(ex. @action, @observable 등)들이 적용되지 않고, 아래와 같이 makeObservable을 사용해야 한다.
    makeAutoObservable(this)
  }

  //@observable
  weekendsVisible = true;

  private eventGuid = 0;  //추가된 이벤트를 관리하기 위한 ID
                          //추후에는 DB에 저장된 마지막 ID+1을 기본값으로 설정해야 한다.

  //@observable
  events: EventInput[] = [
    // {
    //   id: this.createEventId(),
    //   title: "All-day event",
    //   start: new Date(),
    //   allDay: true,
    // },
    // {
    //   id: this.createEventId(),
    //   title: "Timed event",
    //   start: new Date(),
    //   allDay: false,
    // },
  ];

  getEvents(): EventInput[] {
    return this.events;
  }

  private createEventId() {
    return String(this.eventGuid++);
  }

  //@action
  addEvent(selectInfo: DateSelectArg, title: string | null) {
    this.events.push({
      id: this.createEventId(),
      title: title || "New Event",
      start: selectInfo.start,
      end: selectInfo.end,
      allDay: selectInfo.allDay,
    });

    console.log(this.events);
  }

  //@action
  deleteEvent(id: string) {
    this.events.splice(
      this.events.findIndex((e) => e.id === id),
      1
    );
  }

  //@action
  changeEvent(changeInfo: EventChangeArg) {
    const newEvent = changeInfo.event;
    const storedEvent = this.events.find((e) => e.id === changeInfo.event.id);
    if (storedEvent) {
      storedEvent.title = newEvent.title;
      storedEvent.allDay = newEvent.allDay;
      storedEvent.start = newEvent.start || storedEvent.start;
      storedEvent.end = newEvent.end || storedEvent.end;
    }
  }

  //@action
  toggleWeekends() {
    this.weekendsVisible = !this.weekendsVisible;
  }
}

export const eventStoreContext = createContext(new EventStore());
