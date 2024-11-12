import { useState } from "react";

export default function HabitForm({ addHabit }) {
    const [name, setName] = useState('');
    //Set weekly frequency
    const[frequency, setFrequency] = useState(7);

    function handleSubmit(event) {
        event.preventDefault();
        if (name) {
            addHabit({ name, frequency, progress: 0 });
            setName('');
            setFrequency(7);
        }
    };
    return (
        <div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4 border rounded">
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Habit Name"
                    className="p-2 border rounded"
                />
                <input
                    type="number"
                    value={frequency}
                    onChange={(e) => setFrequency(e.target.value)}
                    placeholder="Frequency per week"
                    className="p-2 border rounded"
                />
                <button type="submit" className="px-4 py-2 text-white bg-blue-500 rounded">
                    Add Habit
                </button>
            </form>
        </div>
    );
}