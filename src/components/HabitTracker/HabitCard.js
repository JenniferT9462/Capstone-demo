//Each card shows the habit name, progress, and an update button.
export default function HabitCard ({ habit, updateHabitProgress }) {
    return (
        <div className="p-4 border rounded shadow">
            <h3 className="text-xl font-semibold">{habit.name}</h3>
            {/* Figure out progress by dividing progress by frequency(days) */}
            <p>Progress: {habit.progress} / {habit.frequency}</p>
            <button
                className="px-2 py-1 mt-2 text-white bg-green-500 rounded"
                onClick={() => updateHabitProgress(habit.name)}
                >
                Update Progress
            </button>
        </div>
    );
}