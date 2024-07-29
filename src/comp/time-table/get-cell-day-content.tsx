import { DayCellContentArg } from "@fullcalendar/core/index.js";
// a custom render function
export function getCellDayContent(day: DayCellContentArg) {
  return (
    <div
      className={
        day.isPast ? "past-day" : day.isFuture ? "future-day" : "current-day"
      }
    >
      {`${day.dayNumberText} ${day.view.title}`}
    </div>
  );
}