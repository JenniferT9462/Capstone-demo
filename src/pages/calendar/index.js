import CalendarApp from "@/components/CalendarApp";

import TestCalendar from "@/components/TestCalendar";


export default function CalendarPage() {
    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-500">
            {/* <CalendarApp/> */}
            <div className="min-h-screen bg-gray-50">
                <TestCalendar />
            </div>
        </div>
    );  
}