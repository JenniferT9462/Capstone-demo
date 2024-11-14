import Link from "next/link";
import FeatureCards from "@/components/FeatureCards";



export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-500">
      <header className="text-center p-8">
        <h1 className="text-6xl font-bold text-white mb-4">Welcome to the Planner App</h1>
        <p className="text-lg md:text-xl font-light mb-6">Track your habits, organize your schedule, and reflect on your journey.</p>
        <Link href="/contact-me" className="bg-white text-blue-500 hover:bg-blue-700 hover:text-white font-bold py-2 px-4 rounded-md">
          Get Started
        </Link>
      </header>
      <main className="grid grid-cols-1 md:grid-cols-3 gap-8 p-6 md:p-12">
          {/* Feature Cards */}
          <FeatureCards title="Calendar" description="Keep track of events and to-dos with a dynamic calendar." icon="📅"/>
          <FeatureCards title="Habit Tracker" description="Build healthy habits and track your progress." icon="📈"/>
          <FeatureCards title="Journal & Mood Tracker" description="Reflect on your day and track your mood over time." icon="📝"/>
      </main>
      
  </div>
  );
}
