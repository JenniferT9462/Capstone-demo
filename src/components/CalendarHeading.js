//Import icons used for navigation

import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { monthsOfYear } from "./constraints.js";



//Month and Year Navigation
export default function CalendarHeading({ currentYear, onPrevMonth, onNextMonth, currentMonth }) {
    console.log("Current Month in CalendarHeading:", currentMonth);
    return (
        <div className='nav-date'>
          <h2 className="month">{monthsOfYear[currentMonth] || "Month"},</h2>
          <h2 className="year">{currentYear}</h2>
          <div className="buttons">
            <button onClick={onPrevMonth}>
              <FaArrowLeft size={14} />
            </button>
            <button onClick={onNextMonth}>
              <FaArrowRight size={14} />
            </button>
          </div>
        </div>
    );
    
}
