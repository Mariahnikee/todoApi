import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "https://dummyjson.com/todos";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchTodos = async () => {
    setLoading(true);
    try {
      const response = await axios.get(API_URL);
      if (response.data && response.data.todos) {
        setTodos(response.data.todos);
      } else {
        console.error("Unexpected response structure:", response.data);
      }
    } catch (error) {
      console.error("Error fetching todos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = async (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return;

    try {
      await axios.post(`${API_URL}/add`, {
        todo: newTodo,
        completed: false,
        userId: 1,
      });
      setNewTodo("");
      fetchTodos();
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const updateTodo = async (id, data) => {
    try {
      await axios.put(`${API_URL}/${id}`, data);
      fetchTodos();
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchTodos();
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-2xl font-bold text-center mb-6">Enter your Todo List</h2>
      <form onSubmit={addTodo} className="flex gap-2 mb-6">
        <input
          type="text"
          className="flex-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
          placeholder="Enter new todo"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button 
          type="submit" 
          className="bg-blue-800 hover:bg-blue-900 transition duration-200 text-white px-4 py-3 rounded-md"
        >
          Add
        </button>
      </form>

      {loading ? (
        <p className="text-center">Loading todos...</p>
      ) : (
        <ul className="space-y-4">
          {todos.map((todo) => (
            <li 
              key={todo.id} 
              className="flex justify-between items-center p-4 bg-gray-100 rounded-md shadow-sm"
            >
              <span className={`flex-1 ${todo.completed ? "line-through text-gray-500" : "text-gray-800"}`}>
                {todo.todo}
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => updateTodo(todo.id, { completed: !todo.completed })}
                  className="bg-blue-600 hover:bg-blue-700 transition duration-200 text-white px-3 py-2 rounded"
                >
                  {todo.completed ? "Undo" : "Complete"}
                </button>
                <button
                  onClick={() => {
                    const newText = prompt("Edit todo:", todo.todo);
                    if (newText && newText.trim()) {
                      updateTodo(todo.id, { todo: newText });
                    }
                  }}
                  className="bg-blue-600 hover:bg-blue-700 transition duration-200 text-white px-3 py-2 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="bg-blue-800 hover:bg-blue-900 transition duration-200 text-white px-3 py-2 rounded"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TodoList;
