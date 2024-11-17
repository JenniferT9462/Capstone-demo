import MoodTracker from "@/components/MoodTracker";

export default function JournalPage() {
    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-500">
            <h1 className="text-center text-4xl text-white">Journal Page</h1>
            <div className="bg-white p-4 rounded-md w-1/2 shadow-md fixed right-12 mt-12">
                <h2 className="text-blue-500">Moods</h2>
                <MoodTracker/>
            </div>
        </div>
    );
}