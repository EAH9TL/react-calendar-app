import { useDispatch, useSelector } from "react-redux";
import {
  onAddNewEvent,
  onDeleteEvent,
  onSetActiveEvent,
  onUpdateEvent,
} from "../store/calendar/calendarSlice";

export const useCalendarStore = () => {
  const { events, activeEvent } = useSelector((state) => state.calendar);
  const dispatch = useDispatch();

  const setActiveEvent = (calendarEvent) => {
    dispatch(onSetActiveEvent(calendarEvent));
  };

  const startSavingEvent = async (calendarEvent) => {
    //TODO mandar información al backend

    // Todo bien
    if (calendarEvent._id) {
      // actualizando
      dispatch(onUpdateEvent({ ...calendarEvent }));
    } else {
      // creando
      dispatch(onAddNewEvent({ ...calendarEvent, _id: new Date().getHours() }));
    }
  };

  const startDeletingEvent = async () => {
    // llegar al backend

    //eliminar evento del store
    dispatch(onDeleteEvent());
  };

  return {
    //* Properties
    events,
    activeEvent,
    //* Methods
    setActiveEvent,
    startSavingEvent,
    startDeletingEvent,
  };
};
