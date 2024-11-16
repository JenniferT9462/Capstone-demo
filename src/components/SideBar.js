export default function SideBar({ events, todos, onToggleTodo, onDeleteTodo }) {
  return (
    <div className="w-1/3 bg-gray-100 text-blue-500 rounded-md p-4 fixed right-20 top-10 shadow-lg">
      <h2 className="text-lg font-bold mb-2">Events</h2>
      <ul>
        {events.map((event) => (
          <li key={event.id} className="mb-1">
            {event.text} at {event.time}
          </li>
        ))}
      </ul>
      <h2 className="text-lg font-bold mt-4 mb-2">To-Dos</h2>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id} className="flex items-center mb-1">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => onToggleTodo(todo.id)}
            />
            <span className={`ml-2 ${todo.completed ? "line-through" : ""}`}>
              {todo.title}
            </span>
            <button
              onClick={() => onDeleteTodo(todo.id)}
              className="ml-auto text-red-500"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
