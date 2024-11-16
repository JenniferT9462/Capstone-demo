import { useState } from "react";

//Import icons used for navigation
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";


//import built-in functions from date-fns
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay } from "date-fns";



export default function TestCalendar() {
  

  //Set selectedDate to current date`
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState([
    { id: 1, date: new Date(), title: "Team Meeting" },
    { id: 2, date: new Date(), title: "Submit Project" },
  ]);

  console.log("Events:", events)

  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(selectedDate),
    end: endOfMonth(selectedDate),
  });

  console.log("Days in Current Month:", daysInMonth);

  const todos = [
    { id: 1, title: "Buy groceries", completed: false },
    { id: 2, title: "Write blog post", completed: true },
  ];

  console.log("TODOs:", todos);

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 p-4">
      {/* Calendar Section */}
      <div className="flex-grow">
        <h1 className="text-2xl font-bold mb-4">Calendar</h1>
        {/* Month/Year Navigation */}
        <div className="flex items-center space-x-28">
          <div className="inline-flex space-x-2">
            <h2>{format(firstDayOfMonth, "MMMM yyyy")} ,</h2>
          </div>
          <div>
              <button onClick={onPrevMonth}>
                <FaArrowLeft size={14} />
              </button>
              <button onClick={onNextMonth}>
                <FaArrowRight size={14} />
              </button>
          </div>
        </div>
        <div className="grid grid-cols-7 gap-2 text-center">
          {/* Weekdays Header */}
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="font-medium text-gray-500">
              {day}
            </div>
          ))}
          {/* Days of the Month */}
          {daysInMonth.map((date) => (
            <div
              key={date}
              className={`p-2 border rounded-lg cursor-pointer ${
                isSameDay(date, selectedDate) ? "bg-blue-500 text-white" : "hover:bg-gray-100"
              }`}
              onClick={() => handleDateClick(date)}
            >
              {format(date, "d")}
            </div>
          ))}
        </div>
      </div>

      {/* Sidebar Section */}
      <div className="w-full md:w-1/3">
        {/* Events Section */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Events</h2>
          <ul className="space-y-2">
            {events
              .filter((event) => isSameDay(event.date, selectedDate))
              .map((event) => (
                <li
                  key={event.id}
                  className="p-3 bg-blue-100 rounded-lg shadow-md text-blue-800"
                >
                  {event.title}
                </li>
              ))}
            {events.filter((event) => isSameDay(event.date, selectedDate)).length === 0 && (
              <p className="text-gray-500">No events for this day.</p>
            )}
          </ul>
        </div>

        {/* Todos Section */}
        <div>
          <h2 className="text-xl font-semibold mb-2">To-Dos</h2>
          <ul className="space-y-2">
            {todos.map((todo) => (
              <li
                key={todo.id}
                className={`p-3 rounded-lg shadow-md ${
                  todo.completed
                    ? "bg-green-100 text-green-800"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {todo.title}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};


