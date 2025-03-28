import { CalendarEvent, CalendarModal, FabAddNew, Navbar } from "../";
import { Calendar } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { localizer, getMessagesES } from "../../helpers";
import { useState } from "react";
import { useUiStore, useCalendarStore } from "../../hooks";
import { FabDelete } from "../components/FabDelete";

export const CalendarPage = () => {
  const { events, activeEvent, setActiveEvent } = useCalendarStore();
  const { openDateModal, isDateModalOpen } = useUiStore();
  const [lastView, setLastView] = useState(
    localStorage.getItem("view") || "week"
  );

  const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
      backGroundColor: "#347CF7",
      borderRadius: "0px",
      opacity: 0.8,
      color: "white",
    };
    return {
      style,
    };
  };

  const onDoubleClick = (event) => {
    openDateModal();
  };

  const onSelect = (event) => {
    setActiveEvent(event);
  };

  const onViewChange = (event) => {
    localStorage.setItem("view", event);
    setLastView(event);
    console.log({ viewChange: event });
  };

  return (
    <>
      <Navbar />
      <Calendar
        culture="es"
        messages={getMessagesES()}
        defaultView={lastView}
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 800, marginRight: 5, marginLeft: 5 }}
        eventPropGetter={eventStyleGetter}
        components={{ event: CalendarEvent }}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelect}
        onView={onViewChange}
      />
      <CalendarModal />
      <FabAddNew />
      {(activeEvent !== null && !isDateModalOpen) && <FabDelete />}
    </>
  );
};
