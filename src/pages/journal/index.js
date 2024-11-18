import Journal from "@/components/Journal";
import MoodCalendar from "@/components/MoodCalendar";
import MoodTracker from "@/components/MoodTracker";
import Navbar from "@/components/NavBar";

export default function JournalPage() {
    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-500">
            <Navbar/>
           <h1 className="py-4 text-center text-4xl text-white">Journal Page</h1>
           <div>
                <MoodCalendar/>
                <MoodTracker/>
            </div>
            <div>
                <Journal/>
            </div>
        </div>
    );
}