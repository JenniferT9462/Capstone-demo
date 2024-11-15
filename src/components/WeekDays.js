

export default function WeekDays() {
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return (
        <div>
        
          {daysOfWeek.map((day) => (
            <span key={day}>{day}</span>
          ))}
        </div>
    );
}