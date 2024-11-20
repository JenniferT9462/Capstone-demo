//Render the list of habits, each with a progress button.
import HabitCard from "./HabitCard";

export default function HabitList({ habits, updateHabitProgress }) {
    return (
        <div className="grid gap-4">
            {habits.map((habit, index) => (
                <HabitCard key={index} habit={habit} updateHabitProgress={updateHabitProgress}/>
            ))}
        </div>
    );
}