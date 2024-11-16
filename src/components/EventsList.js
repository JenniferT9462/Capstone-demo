import EventCard from "./EventCard";


export default function EventsList({ events, onEdit, onDelete }) {
    return (
        <div className="w-2/3">
            <h2 className="text-3xl">Events</h2>
            {events.map((event, index) => (
  	        <EventCard key={event.id} event={event} onEdit={onEdit} onDelete={onDelete} />
	        ))}
        </div>
    );
}