import useTimeTableState from "../../hooks/use-time-table-state";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { getRrenderEventContent } from "./get-render-event-content";
import { useState } from "react";
import { getCellDayContent } from "./get-cell-day-content";
import "./index.css"

export default function TimeTable() {
  const [events, setEvents] = useTimeTableState();
  const [renderWeekends, setRenderWeekends] = useState<boolean>(true);

  return (
    <div>
      <header className="flex nav-header">
        <h1>Live Planner</h1>
        <button onClick={() => setRenderWeekends((old) => !old)}>
          {renderWeekends ? "No Weekends" : "Weekends"}
        </button>
      </header>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        weekends={renderWeekends}
        events={events}
        eventContent={getRrenderEventContent(events, setEvents)}
        dayCellContent={getCellDayContent}
      />
    </div>
  );
}
