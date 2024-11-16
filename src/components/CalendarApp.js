import React from "react";
import CalendarHeading from "./CalendarHeading";
import WeekDays from "./WeekDays";
import DaysGrid from "./DaysGrid";
import EventForm from "./EventForm";
import EventsList from "./EventsList";
import SideBar from "./SideBar";
// import { monthsOfYear, daysOfWeek } from "./constants";
import { useState } from "react";

export default function CalendarApp() {
  //State and logic:
  //Getting current date and setting it in a currentDate variable
  const currentDate = new Date();
  //Setting state for current month and current year
  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());

  //Functions for previous month and next month for the arrow buttons
  const prevMonth = () => {
    setCurrentMonth((prevMonth) => (prevMonth === 0 ? 11 : prevMonth - 1));
    setCurrentYear((prevYear) =>
      currentMonth === 0 ? prevYear - 1 : prevYear
    );
  };

  const nextMonth = () => {
    setCurrentMonth((prevMonth) => (prevMonth === 11 ? 0 : prevMonth + 1));
    setCurrentYear((prevYear) =>
      currentMonth === 11 ? prevYear + 1 : prevYear
    );
  };

  // console.log("Current Month in CalendarApp:", currentMonth);

  //Week days
  //Static component without state or logic needed

  //DaysGrid
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  //When a day is clicked
  const [selectedDate, setSelectedDate] = useState(currentDate);

  //State for showing the event form
  const [showEventPopup, setShowEventPopup] = useState(false);

  const handleDayClick = (day) => {
    const clickedDate = new Date(currentYear, currentMonth, day);
    const today = new Date();

    if (clickedDate >= today || isSameDay(clickedDate, today)) {
      setSelectedDate(clickedDate);
      setShowEventPopup(true);
      setEventTime({ hours: "00", minutes: "00" });
      setEventText("");
      setEditingEvent(null);
    }
    console.log("Day has been clicked");
  };

  //Handle close popup
  const handleClosePopup = () => {
    setShowEventPopup(false);
    setSelectedDate(null);
  };

  //Allows users to click the same day
  const isSameDay = (date1, date2) => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };

  const [events, setEvents] = useState([]);
  const [eventTime, setEventTime] = useState({ hours: "00", minutes: "00" });
  const [eventText, setEventText] = useState("");
  const [editingEvent, setEditingEvent] = useState(null);

  // Function to handle event submission
  const handleEventSubmit = () => {
    const newEvent = {
      id: editingEvent ? editingEvent.id : Date.now(),
      date: selectedDate,
      time: `${eventTime.hours}:${eventTime.minutes}`,
      text: eventText,
    };

    const updatedEvents = editingEvent
      ? events.map((event) => (event.id === editingEvent.id ? newEvent : event))
      : [...events, newEvent];

      setEvents(updatedEvents);
      setShowEventPopup(false);
      setEditingEvent(null);
      setEventText("");
      setEventTime({ hours: "00", minutes: "00" });
  };

  // Functions for editing and deleting events
  const handleEditEvent = (event) => {
    setSelectedDate(new Date(event.date));
    setEventText(event.text);
    setEventTime({
      hours: event.time.split(":")[0],
      minutes: event.time.split(":")[1],
    });
    setEditingEvent(event);
    setShowEventPopup(true);
  };

  const handleEventDelete = (eventId) => {
    setEvents(events.filter((event) => event.id !== eventId));
  };

  //Todos section logic
  const [todos, setTodos] = useState([
    { id: 1, title: "Buy groceries", completed: false },
    { id: 2, title: "Finish Project", completed: true },
  ]);

  //Functions that handle add, edit and toggle completion
  const handleAddTodo = (title) => {
    const newTodo = { id: Date.now(), title, completed: false };
    setTodos([...todos, newTodo]);
  };

  const handleToggleTodo = (id) => {
    setTodos(
      todos.map((todo) => todo.id === id ? { ...todo, completed: !todo.completed } : todo
    )
   );
  };

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  };


  

  return (
    <div>
      <div className="py-2">
        <h1 className="text-4xl">Calendar</h1>
        {/* All components needed for Calendar */}
        <div className="border-2 rounded-md inline-block w-fit">
          <CalendarHeading
            currentYear={currentYear}
            currentMonth={currentMonth}
            onPrevMonth={prevMonth}
            onNextMonth={nextMonth}
          />
          <WeekDays />
          <DaysGrid
            daysInMonth={daysInMonth}
            firstDayOfMonth={firstDayOfMonth}
            currentDate={currentDate}
            currentMonth={currentMonth}
            currentYear={currentYear}
            onDayClick={handleDayClick}
          />
        </div>
        {showEventPopup && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <EventForm
              eventTime={eventTime}
              setEventTime={setEventTime}
              eventText={eventText}
              setEventText={setEventText}
              onClose={handleClosePopup}
              selectedDate={selectedDate}
              editingEvent={editingEvent}
              onSubmit={handleEventSubmit}
              
            />
          </div>
        )}
        <EventsList
          events={events}
          onEdit={handleEditEvent}
          onDelete={handleEventDelete}
        />
      </div>
        <SideBar
          events={events}
          todos={todos}
          onToggleTodo={handleToggleTodo}
          onDeleteTodo={handleDeleteTodo}
          />
    </div>
  );
}
