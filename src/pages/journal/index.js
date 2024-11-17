import Journal from "@/components/Journal";
import MoodCalendar from "@/components/MoodCalendar";
import MoodTracker from "@/components/MoodTracker";

export default function JournalPage() {
    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-500">
           <h1 className="py-4 text-center text-4xl text-white">Journal Page</h1>
           <div>
                <h1 className="text-2xl ml-4 text-white">Calendar</h1>
                <MoodCalendar/>
            </div>
            <div className="bg-white p-4 rounded-md w-1/2 shadow-md  mt-0 mr-12">
                <h2 className="text-blue-500">Moods</h2>
                <MoodTracker/>
            </div>
            <div>
                <Journal/>
            </div>
        </div>
    );
}