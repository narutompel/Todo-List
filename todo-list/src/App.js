import React, { useEffect, useState } from 'react';
import TodoForm from './TodoForm';
import TodoList from './TodoList';

const App = () => {
    const [todos, setTodos] = useState([]);

    const fetchTodos = async () => {
        const response = await fetch('http://localhost:5000/todos');
        const data = await response.json();
        setTodos(data.map(todo => todo.task_name)); // Asumsikan task_name adalah nama kolom di database
    };

    const addTodo = (task) => {
        setTodos([...todos, task]);
    };

    const removeTodo = async (index) => {
        const id = todos[index].id; // Ambil ID tugas dari objek
        await fetch(`http://localhost:5000/todos/${id}`, { method: 'DELETE' });
        const newTodos = todos.filter((_, i) => i !== index);
        setTodos(newTodos);
    };

    useEffect(() => {
        fetchTodos(); // Ambil daftar tugas saat komponen pertama kali dimuat
    }, []);

    return (
        <div>
            <h1>To-Do List</h1>
            <TodoForm addTodo={addTodo} />
            <TodoList todos={todos} removeTodo={removeTodo} />
        </div>
    );
};

export default App;
