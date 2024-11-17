import HabitForm from "@/components/HabitTracker/HabitForm";
import HabitList from "@/components/HabitTracker/HabitList";
// import HabitTracker from "@/components/HabitTracker/HabitTracker";
import HabitProgressChart from "@/components/HabitTracker/HabitProgressChart";
import {Chart, ArcElement} from 'chart.js'
Chart.register(ArcElement);

import { useState } from 'react';

export default function HabitPage() {
    const [habits, setHabits] = useState([]);

    function addHabit(habit) {
        setHabits([...habits, habit]);
    };
    
    function updateHabitProgress(habitName) {
        setHabits(habits.map(habit => 
            habit.name === habitName ? 
            {...habit, progress: habit.progress + 1}
            : habit
        ))
    };

    return (
        <div className="container mx-auto p-8">
            <h1 className="text-4xl font-bold text-center">Habit Tracker</h1>
            <HabitForm addHabit={addHabit}/>
            <HabitList habits={habits} updateHabitProgress={updateHabitProgress}/>
           
            <HabitProgressChart habits={habits}/>
        </div>
    );
}