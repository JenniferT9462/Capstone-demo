import Journal from "@/components/JournalPage/Journal";
import MoodCalendar from "@/components/JournalPage/MoodCalendar";
import MoodTracker from "@/components/JournalPage/MoodTracker";
import Navbar from "@/components/Main/NavBar";

export default function JournalPage() {
   return (
        <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-500">
            <Navbar/>
           <h1 className="py-4 text-center text-4xl text-white">Journal Page</h1>
           
           <div className="flex justify-center items-center mr-12">
                <MoodCalendar/>
                <MoodTracker/>
            </div>
            <div>
                <Journal/>
            </div>
        </div>
    );
}