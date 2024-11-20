import CalendarApp from "@/components/Calendar/CalendarApp";
import Navbar from "@/components/Main/NavBar";




export default function CalendarPage() {
    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-500">
            <Navbar/>
            {/* <CalendarApp/> */}
            <div className="min-h-screen">
                <CalendarApp/>
            </div>
        </div>
    );  
}