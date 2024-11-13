import React from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { AiFillEdit } from "react-icons/ai";
import { BiMessageSquareX } from "react-icons/bi";
import { useState } from "react";

export default function Calendar() {
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const monthsOfYear = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const currentDate = new Date();
  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());
  const [selectedDate, setSelectedDate] = useState(currentDate);
  const [showEventPopup, setShowEventPopup] = useState(false);

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

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

  const handleDayClick = (day) => {
    const clickedDate = new Date(currentYear, currentMonth, day);
    const today = new Date();

    if (clickedDate >= today || isSameDay(clickedDate, today)) {
        setSelectedDate(clickedDate)
        setShowEventPopup(true)
    }
  }

  const isSameDay = (date1, date2) => {
    return (
        date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate() 
    )
  }
//   console.log(daysInMonth, firstDayOfMonth);
  return (
    <div className="calendar-app">
      <div className="calendar">
        <div className="heading">
          <h1 className="text-4xl">Calendar</h1>
        </div>
        <div className="nav-date">
          <h2 className="month">{monthsOfYear[currentMonth]},</h2>
          <h2 className="year">{currentYear}</h2>
          <div className="buttons">
            <button onClick={prevMonth}>
              <FaArrowLeft size={14} />
            </button>
            <button onClick={nextMonth}>
              <FaArrowRight size={14} />
            </button>
          </div>
        </div>
        <div className="week-days">
          {daysOfWeek.map((day) => (
            <span key={day}>{day}</span>
          ))}
        </div>
        <div className="days">
          {[...Array(firstDayOfMonth).keys()].map((_, index) => (
            <span key={`empty-${index}`} />
          ))}
          {[...Array(daysInMonth).keys()].map((day) => (
            <span
              key={day + 1}
              className={
                day + 1 === currentDate.getDate() &&
                currentMonth === currentDate.getMonth() &&
                currentYear === currentDate.getFullYear()
                  ? "current-day"
                  : ""
              }
              onClick={() => handleDayClick(day + 1)}
            >
              {day + 1}
            </span>
          ))}
        </div>
      </div>
      <div className="events">
        {showEventPopup && (
            <div className="event-popup">
            <div className="time-input">
              <div className="event-popup-time">Time</div>
              <input
                type="number"
                name="hours"
                min={0}
                max={24}
                className="hours"
              />
              <input
                type="number"
                name="minutes"
                min={0}
                max={60}
                className="minutes"
              />
            </div>
            <textarea placeholder="Enter Event Text (Maximum 60 Characters)"></textarea>
            <button className="event-popup-btn">Add Event</button>
            <button className="close-event-popup" onClick={() => setShowEventPopup(false)}>
              <AiOutlineClose size={18} />
            </button>
          </div>
        )}
        
        <div className="event">
          <div className="event-date-wrapper">
            <div className="event-date">Nov 13, 2024</div>
            <div className="event-time">12:30</div>
          </div>
          <div className="event-text">Meeting with John</div>
          <div className="event-buttons">
            <button className="edit-btn">
              <AiFillEdit /> {/* Edit icon */}
            </button>
            <button className="X-icon-btn">
              <BiMessageSquareX /> {/* Message with X icon */}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
