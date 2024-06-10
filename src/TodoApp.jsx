import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos ,addTodo,deleteTodo} from "./todoSlice";

const todoApp = () => {
  const [formData, setFormData] = useState({
    title: "",
    id: "",
    userId: "",
    completed: false,
  });
  const state = useSelector((state) => state);
  const { todos } = state.todoSlice;
  console.log(todos);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // You can further handle the form data here, such as sending it to an API
  };
  const dispatch = useDispatch();
  useEffect(() => {
    console.log(dispatch(fetchTodos()));
  }, [dispatch]);

  // console.log(state)

  const handleAddTodo = (e) => {
    e.preventDefault();
    dispatch(addTodo(formData));
    setFormData("");
  };

  // const handleUpdateTodo = (todo) => {
  //   dispatch(updateTodo({ ...todo, title: editingTodo.title }));
  //   setEditingTodo(null);
  // };

  const handleDeleteTodo = (id) => {
    dispatch(deleteTodo(id));
  };

  return (
    <div className="p-5 flex justify-center bg-slate-400 border-slate-700 h-dvh">
      <div className="flex flex-col items-center">
        <div className="text-lg mb-5">todo app</div>
        <div>
          <form
            className="flex flex-col justify-center p-5"
            onSubmit={handleAddTodo}
          >
            <div>
              <input
                className="bg-white p-2 rounded m-2"
                type="text"
                name="title"
                placeholder="title"
                value={formData.title}
                onChange={handleChange}
              />
            </div>
            <div>
              <input
                className="bg-white p-2 rounded m-2"
                placeholder="id"
                type="text"
                name="id"
                value={formData.id}
                onChange={handleChange}
              />
            </div>
            <div>
              <input
                className="bg-white p-2 rounded m-2"
                placeholder="userid"
                type="text"
                name="userId"
                value={formData.userId}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>
                Completed:
                <input
                  className="bg-white p-2 rounded m2 justify-center"
                  type="checkbox"
                  name="completed"
                  checked={formData.completed}
                  onChange={handleChange}
                />
              </label>
            </div>
            <button className="bg-slate-700 rounded m-2" type="submit">
              Submit
            </button>
          </form>
        </div>
        <div className="mt-5 p-10 relative">
          {todos.map((item) => {
            return (
              <div
                className="bg-slate-200 rounded px-4 m-3 block"
                key={item.id}
              >
                {item.title}
                <button className="rounded absolute right-0 bg-slate-500" onClick={()=>handleDeleteTodo(item.id)}>
                  delete
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default todoApp;
