

export default function DaysGrid({daysInMonth, firstDayOfMonth, currentDate, currentMonth, currentYear, onDayClick}) {
    return (
      <div className="w-full py-2">
        <div className="grid grid-cols-7 gap-x-6">
          {/* Empty slots for the days before the first day of the month */}
          {[...Array(firstDayOfMonth).keys()].map((_, index) => (
            <span key={`empty-${index}`}/>
          ))}
          {/* Days of the month */}
          {[...Array(daysInMonth).keys()].map((day) => (
            <span
              key={day + 1}
              className={
                day + 1 === currentDate.getDate() &&
                currentMonth === currentDate.getMonth() &&
                currentYear === currentDate.getFullYear()
                  ? "bg-white text-blue-600 rounded-md cursor-pointer"
                  : "cursor-pointer"
              }
              onClick={() => onDayClick(day + 1)}
            >
              {day + 1}
            </span>
          ))}
        </div>
      </div>
        
    )
  }
        
        
    
