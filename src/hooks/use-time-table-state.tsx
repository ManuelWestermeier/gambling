import { EventInput } from "@fullcalendar/core/index.js";
import { Dispatch, useState } from "react";
import useLocalStorage from "use-local-storage";

export default function useTimeTableState(): [
  EventInput[],
  Dispatch<EventInput[]>
] {
  const [events, setEvents] = useState<EventInput[]>(
    // "time-table-state-events",
    [{ title: "First Day", start: new Date(), end: new Date(), backgroundColor:"rgba(0,0,0,0.5)" }]
  );

  return [events, setEvents];
}