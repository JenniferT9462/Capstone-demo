import { useState } from "react";

export default function TodoForm({ onAddTodo}) {
    const [todoTitle, setTodoTitle] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (todoTitle.trim()) { //Removes the leading and trailing white space and line terminator characters from a string.
           const newTodo = {
                id: Date.now(), //Unique Id for the todo
                title: todoTitle,
                completed: false,
            };
             // Call the onAddTodo function to handle API interaction
             try {
                const response = await fetch('/api/saveTodos', {
                    method: 'POST',
                    headers: { "Content-Type": "application/json"},
                    body: JSON.stringify(newTodo)
                  });
                if (response.ok) {
                    await onAddTodo(newTodo);
                    setTodoTitle("") // Clear the input field
                }
            } catch (error) {
                console.error("Failed to add todo:", error)
             }
        }
    };
    return (
        <div className="w-1/3 bg-white rounded-md shadow-md flex flex-col justify-between h-full">
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
                    className="w-full text-white py-2 bg-blue-400 rounded-md"
                    >
                        Add Todo
                </button>
            </form>
        </div>
    );
}