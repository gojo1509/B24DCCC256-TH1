import React, { useState } from 'react';

interface Todo {
	id: number;
	text: string;
	done: boolean;
}

const TodoList: React.FC = () => {
	const [input, setInput] = useState('');
	const [todos, setTodos] = useState<Todo[]>([]);

	const addTodo = () => {
		if (input.trim() === '') return;

		setTodos([
			...todos,
			{
				id: Date.now(),
				text: input,
				done: false,
			},
		]);

		setInput('');
	};

	const deleteTodo = (id: number) => {
		setTodos(todos.filter((todo) => todo.id !== id));
	};

	const toggleTodo = (id: number) => {
		setTodos(todos.map((todo) => (todo.id === id ? { ...todo, done: !todo.done } : todo)));
	};

	return (
		<div style={{ width: 400, margin: '40px auto' }}>
			<h2>Todo List</h2>

			<input
				value={input}
				onChange={(e) => setInput(e.target.value)}
				placeholder='Nhập công việc...'
				style={{ flex: 1, padding: 6 }}
			/>
			<button onClick={addTodo}>Thêm</button>

			<ul>
				{todos.map((todo) => (
					<li key={todo.id}>
						<span
							onClick={() => toggleTodo(todo.id)}
							style={{
								cursor: 'pointer',
								textDecoration: todo.done ? 'line-through' : 'none',
							}}
						>
							{todo.text}
						</span>{' '}
						<button onClick={() => deleteTodo(todo.id)}>Xóa</button>
					</li>
				))}
			</ul>
		</div>
	);
};

export default TodoList;
