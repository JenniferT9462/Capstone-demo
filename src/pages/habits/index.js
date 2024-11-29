import HabitForm from "@/components/HabitTracker/HabitForm";
import HabitList from "@/components/HabitTracker/HabitList";
// import HabitTracker from "@/components/HabitTracker/HabitTracker";

import HabitProgressChart from "@/components/HabitTracker/HabitProgressChart";
import Navbar from "@/components/Main/NavBar";

import React, { useState, useEffect } from "react";

export default function HabitPage() {
  const [habits, setHabits] = useState([]);
  // Load habits from local storage when the component mounts
  useEffect(() => {
    const storedHabits = JSON.parse(localStorage.getItem("habits")) || [];
    setHabits(storedHabits);
}, []);

  // Add a new habit
  const addHabit = (habit) => {
    const updatedHabits = [...habits, habit];
    setHabits(updatedHabits);
    // Save to local storage
    localStorage.setItem("habits", JSON.stringify(updatedHabits));
  };

  const incrementProgress = (index) => {
    const updatedHabits = habits.map((habit, i) => {
        if (i === index) {
            // Increment progress by 1
            return { ...habit, progress: habit.progress + 1 };
        }
        return habit;
    });
    setHabits(updatedHabits);
        localStorage.setItem("habits", JSON.stringify(updatedHabits));
  }
  // function updateHabitProgress(habitName) {
  //   setHabits(
  //     habits.map((habit) =>
  //       habit.name === habitName
  //         ? { ...habit, progress: habit.progress + 1 }
  //         : habit
  //     )
  //   );
  // }

  

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-500">
        <Navbar/>
        <h1 className="text-2xl font-bold mb-4">Your Habits</h1>
        <HabitForm addHabit={addHabit} />
        <div className="mt-4">
            {habits.length > 0 ? (
                <ul className="space-y-2">
                    {habits.map((habit, index) => (
                        <li key={index} className="p-2 border rounded flex justify-between items-center">
                            <div>
                                <strong>{habit.name}</strong> - {habit.frequency} times/week
                                <p>Progress: {habit.progress}</p>
                            </div>
                            <button
                                onClick={() => incrementProgress(index)}
                                className="px-2 py-1 bg-green-500 text-white rounded"
                            >
                                + Progress
                            </button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No habits added yet. Start by adding one!</p>
            )}
        </div>
        <HabitProgressChart habits={habits} />
    </div>
);
}