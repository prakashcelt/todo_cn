


import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTodos, addTodo, deleteTodo, updateTodo } from './todoSlice';

const TodoApp = () => {
  const [formData, setFormData] = useState({
    title: '',
    completed: false,
  });
  const [editingTodo, setEditingTodo] = useState(null);
  const dispatch = useDispatch();
  const { todos, loading, error } = useSelector((state) => state.todos);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingTodo) {
      dispatch(updateTodo({ ...editingTodo, ...formData }));
      setEditingTodo(null);
    } else {
      dispatch(addTodo({ ...formData, id: Date.now() }));
    }
    setFormData({ title: '', completed: false });
  };

  const handleEditClick = (todo) => {
    setEditingTodo(todo);
    setFormData({ title: todo.title, completed: todo.completed });
  };

  const handleDeleteTodo = (id) => {
    dispatch(deleteTodo(id));
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 py-10">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-5">
        <h1 className="text-2xl font-bold mb-5 text-center">Todo App</h1>
        <form className="mb-5" onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              className="w-full p-2 border border-gray-300 rounded-lg"
              type="text"
              name="title"
              placeholder="Title"
              value={formData.title}
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center mb-4">
            <input
              className="mr-2"
              type="checkbox"
              name="completed"
              checked={formData.completed}
              onChange={handleChange}
            />
            <label className="text-gray-700">Completed</label>
          </div>
          <button className="w-full bg-blue-500 text-white p-2 rounded-lg">
            {editingTodo ? 'Update' : 'Submit'}
          </button>
        </form>
        {loading && <p className="text-center">Loading...</p>}
        {error && <p className="text-center text-red-500">Error: {error}</p>}
        <div>
          {todos.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center p-3 mb-3 bg-gray-50 border border-gray-200 rounded-lg"
            >
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={item.completed}
                  readOnly
                  className="mr-3"
                />
                <span className={`flex-1 ${item.completed ? 'line-through' : ''}`}>
                  {item.title}
                </span>
              </div>
              <div className="flex space-x-3">
                <button
                  className="bg-yellow-500 text-white p-2 rounded-lg"
                  onClick={() => handleEditClick(item)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white p-2 rounded-lg"
                  onClick={() => handleDeleteTodo(item.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TodoApp;
