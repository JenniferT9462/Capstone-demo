//Icons for edit btn and delete btn on the event cards
import { AiFillEdit } from "react-icons/ai";
import { BiMessageSquareX } from "react-icons/bi";
import { monthsOfYear } from "./constraints.js"; 

//Displays an individual event and provides options to edit or delete.
export default function EventCard({ event, onEdit, onDelete }) {
  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2x">
      <div className="md:flex">
        <div className="p-4">
          {`
            ${monthsOfYear[event.date.getMonth()]} 
            ${event.date.getDate()}, 
            ${event.date.getFullYear()}
          `}
        </div>
        <div>{event.time}</div>
      </div>
      <div className="event-text">
            {event.text}
      </div>
      <div className="event-buttons">
        <button onClick={() => onEdit(event)}><AiFillEdit /></button>
  	    <button onClick={() => onDelete(event.id)}><BiMessageSquareX /></button>
      </div>
    </div>
  );
}
