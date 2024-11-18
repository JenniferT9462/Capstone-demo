import Link from "next/link";
import FeatureCards from "@/components/Main/FeatureCards";
import Navbar from "@/components/Main/NavBar";

export default function WelcomePage() {
    return (
        <div className="min-h-screen overflow-scroll bg-gradient-to-r from-blue-500 to-purple-500">
            {/* <Navbar/> */}
            <div className="text-center">
                <h1 className="text-4xl font-bold text-white mb-4">Your journey to better organization and productivity starts here!</h1>
                <p className="text-lg md:text-xl font-light mb-6">Start Now By Clicking on our features.</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-6 md:p-12">
                    {/* Feature Cards w/links*/}
                    <Link href="/calendar">
                        <FeatureCards title="Calendar" description="Keep track of events and to-dos with a dynamic calendar." icon="📅"/>
                    </Link>
                    <Link href="/habits">
                        <FeatureCards title="Habit Tracker" description="Build healthy habits and track your progress." icon="📈"/>
                    </Link>
                    <Link href="/journal">
                        <FeatureCards title="Journal & Mood Tracker" description="Reflect on your day and track your mood over time." icon="📝"/>
                    </Link>
                </div>
                <div>
                    {/* Haven't decided if I want to put this on the NavBar or make a login page. */}
                    <h2 className="text-lg md:text-xl font-light mb-6">Log In to Save your progress.</h2>
                    <Link href="/login" className="font-bold bg-white text-blue-500 px-4 py-2 rounded hover:bg-blue-700 hover:text-white">
                        Log In
                    </Link>
                </div>
            </div>
        </div>
    );
}
