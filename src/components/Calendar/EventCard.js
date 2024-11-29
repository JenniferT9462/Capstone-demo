//Icons for edit btn and delete btn on the event cards
import { AiFillEdit } from "react-icons/ai";
import { BiMessageSquareX } from "react-icons/bi";
import { monthsOfYear } from "./constraints.js"; 

//Displays an individual event and provides options to edit or delete.
export default function EventCard({ event, onEdit, onDelete }) {
  return (
    <div className="w-1/2 h-28 bg-[#d12cf6] p-6 rounded-xl flex items-center mb-8">
      <div className="flex flex-col items-center w-1/4 border-r border-white/50">
        <div className="text-[clamp(.6rem,1.4vw,1.6rem)]">
          {`
            ${monthsOfYear[event.date.getMonth()]} 
            ${event.date.getDate()}, 
            ${event.date.getFullYear()}
          `}
        </div>
        <div className="text-[clamp(1rem,1.5vw,2rem)] leading-8 font-bold">{event.time}</div>
      </div>
      <div className="text-[clamp(1.2rem,1vw,1.4rem)] leading-8 w-[70%] px-12 pl-4 break-words">
            {event.text}
      </div>
      <div className="event-buttons">
        <button onClick={() => onEdit(event)}><AiFillEdit /></button>
  	    <button onClick={() => onDelete(event.id)}><BiMessageSquareX /></button>
      </div>
    </div>
  );
}
