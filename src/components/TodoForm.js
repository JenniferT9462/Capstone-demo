import { useState } from "react";

export default function TodoForm({ onAddTodo}) {
    const [todoTitle, setTodoTitle] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (todoTitle.trim()) { //Removes the leading and trailing white space and line terminator characters from a string.
            onAddTodo({
                id: Date.now(), //Unique Id for the todo
                title: todoTitle,
                completed: false,
            })
            setTodoTitle("") // Clear the input field
        }
    }
    return (
        <div className="w-1/3 bg-white rounded-md shadow-md">
            <form onSubmit={handleSubmit} className="mt-4">
                <input
                    type="text"
                    value={todoTitle}
                    onChange={(e) => setTodoTitle(e.target.value)}
                    placeholder="Add a new todo..."
                    className="w-full text-blue-500 py-2 rounded-md"
                />
                <button
                    type="submit"
                    className="w-full text-blue-500 py-2 rounded-md"
                    >
                        Add Todo
                </button>
            </form>
        </div>
    );
}