

export default function DaysGrid({daysInMonth, firstDayOfMonth, currentDate, currentMonth, currentYear, onDayClick}) {
    return (
        <div>
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
              onClick={() => onDayClick(day + 1)}
            >
              {day + 1}
            </span>
          ))}
        </div>
    );
}