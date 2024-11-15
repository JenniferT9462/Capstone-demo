

export default function WeekDays() {
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return (
        <div className="flex space-x-4 p-2">
        
          {daysOfWeek.map((day) => (
            <span key={day}>{day}</span>
          ))}
        </div>
    );
}