import React from "react";
import CalendarHeading from "./CalendarHeading";
import WeekDays from './WeekDays';
import DaysGrid from './DaysGrid';
import EventForm from "./EventForm";
// import EventsList from './EventsList';
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

      console.log("Current Month in CalendarApp:", currentMonth);

      //Week days
      //Static component without state or logic needed

    //DaysGrid
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

    //When a day is clicked
    const [selectedDate, setSelectedDate] = useState(currentDate);
    const handleDayClick = (day) => {
        const clickedDate = new Date(currentYear, currentMonth, day);
        const today = new Date();
    
        if (clickedDate >= today || isSameDay(clickedDate, today)) {
          setSelectedDate(clickedDate);
        //   setShowEventPopup(true);
        //   setEventTime({ hours: "00", minutes: "00" });
        //   setEventText("");
        //   setEditingEvent(null);
        }
        console.log('Day has been clicked')
      };

    //Allows users to click the same day
    const isSameDay = (date1, date2) => {
        return (
          date1.getFullYear() === date2.getFullYear() &&
          date1.getMonth() === date2.getMonth() &&
          date1.getDate() === date2.getDate()
        );
      };
    
      


    return (
        <div>
            <div className="py-2">
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
                
                <EventForm />
  	            {/* <EventsList ... /> */}            
            </div>
        </div>
    );
}
