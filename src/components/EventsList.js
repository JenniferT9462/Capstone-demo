import EventCard from "./EventCard";


export default function EventsList({ events, onEdit, onDelete }) {
    return (
        <div>
            <h2>Events</h2>
            {events.map((event, index) => (
  	        <EventCard key={event.id} event={event} onEdit={onEdit} onDelete={onDelete} />
	        ))}
        </div>
    );
}