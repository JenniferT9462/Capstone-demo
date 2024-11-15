//Import icons used for navigation

import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { monthsOfYear } from "./constraints.js";



//Month and Year Navigation
export default function CalendarHeading({ currentYear, onPrevMonth, onNextMonth, currentMonth }) {
    console.log("Current Month in CalendarHeading:", currentMonth);
    return (
        <div className="flex items-center space-x-28">
          <div className="inline-flex space-x-2">
            <h2>{monthsOfYear[currentMonth]},</h2>
            <h2>{currentYear}</h2>
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
    );
    
}
