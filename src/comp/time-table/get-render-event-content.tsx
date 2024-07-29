import { EventContentArg, EventInput } from "@fullcalendar/core/index.js";
import { Dispatch, MouseEvent } from "react";
// a custom render function
export function getRrenderEventContent(
  events: EventInput[],
  setEvents: Dispatch<EventInput[]>
) {
  return (eventInfo: EventContentArg) => {
    return (
      <div
        onMouseOver={(e: MouseEvent<HTMLDivElement>) =>
          e.nativeEvent.target?.scrollIntoView?.({ behavior: "smooth", block: "center" })
        }
      >
        event
        <b>{eventInfo.timeText}</b>
        <i>{eventInfo.event.title}</i>
        <button>BTN</button>
      </div>
    );
  };
}
