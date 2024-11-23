import React from "react";
import CalendarHeading from "./CalendarHeading";
import WeekDays from "./WeekDays";
import DaysGrid from "./DaysGrid";
import EventForm from "./EventForm";
import EventsList from "./EventsList";
import TodoForm from "../TodoForm";
import SideBar from "../SideBar";
// import { monthsOfYear, daysOfWeek } from "./constants";
import { useState, useEffect } from "react";

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
  const handleEventSubmit = async () => {
    const newEvent = {
      id: editingEvent ? editingEvent.id : Date.now(),
      date: selectedDate,
      time: `${eventTime.hours}:${eventTime.minutes}`,
      text: eventText,
    };
    console.log(newEvent);
    const updatedEvents = editingEvent
      ? events.map((event) => (event.id === editingEvent.id ? newEvent : event))
      : [...events, newEvent];

    try {
      const response = await fetch("/api/saveEvent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newEvent),
      });
      if (response.ok) {
        setEvents(updatedEvents);
        setShowEventPopup(false);
        setEditingEvent(null);
        setEventText("");
        setEventTime({ hours: "00", minutes: "00" });
      } else {
        console.error("Failed to save event:", await response.text());
      }
    } catch (error) {
      console.error("Failed to save event:", error);
    }
  };

  // Fetch events from the API
  const fetchEvents = async () => {
    try {
      const response = await fetch("/api/getEvents");
      if (!response.ok) {
        throw new Error("Failed to fetch events");
      }
      const data = await response.json();
      console.log("Raw events data:", data.events); // Log raw data
      const parsedEvents = data.events.map((event) => ({
        ...event,
        date: new Date(event.date), // Convert date strings back to Date objects
      }));
      setEvents(parsedEvents);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  // Fetch events on component mount
  useEffect(() => {
    fetchEvents();
  }, []);

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
    // { id: 1, title: "Buy groceries", completed: false },
    // { id: 2, title: "Finish Project", completed: true },
  ]);
  // Fetch events from the API
  const fetchTodos = async () => {
    try {
      const response = await fetch("/api/getTodos");
      if (!response.ok) {
        throw new Error("Failed to fetch todos");
      }
      const data = await response.json();
      console.log("Raw todos data:", data.todos); // Log raw data
      const parsedTodos = data.todos.map((todo) => ({
        ...todo,
        date: new Date(todo.date), // Convert date strings back to Date objects
      }));
      setTodos(parsedTodos);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  // Fetch events on component mount
  useEffect(() => {
    fetchTodos();
  }, []);

  //Functions that handle add, edit and toggle completion
  // const handleAddTodo = (title) => {
  //   const newTodo = { id: Date.now(), title, completed: false };
  //   setTodos([...todos, newTodo]);
  // };
  const handleAddTodo = (newTodo) => {
    setTodos((prevTodos) => [...prevTodos, newTodo]);
  };

  const handleToggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  console.log("Events:", events);
  console.log("Todos:", todos);

  return (
    <div className="ml-12">
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
        </div>
        <EventsList
            events={events}
            onEdit={handleEditEvent}
            onDelete={handleEventDelete}
          />
        <div className="flex space-x-10">
          
          <TodoForm onAddTodo={handleAddTodo} />
          <SideBar
            events={events}
            todos={todos}
            onToggleTodo={handleToggleTodo}
            onDeleteTodo={handleDeleteTodo}
          />
        </div>
      </div>
    </div>
  );
}
