import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

import EditTodo from "./editTodo/EditTodo";

const ListTodo = ({ todo, getAllTodos }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);

  const openEditModal = (todo) => {
    setSelectedTodo(todo);
    setIsModalOpen(true);
  };

  const deleteTodo = async (id) => {
    try {
      const response = await axios.delete(`/todos/${id}`);
      toast.success("Todo is deleted!");
      getAllTodos();
    } catch (err) {
      toast.error(err.response?.data?.message);
    }
  };

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Description</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {todo.map((todo) => (
            <tr key={todo.todo_id}>
              <td>{todo.todo_id}</td>
              <td>{todo.description}</td>
              <td>
                <button onClick={() => openEditModal(todo)}>Edit</button>
              </td>
              <td>
                <button onClick={() => deleteTodo(todo.todo_id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedTodo && (
        <EditTodo
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          todo={selectedTodo}
          onSave={getAllTodos}
        />
      )}
    </>
  );
};

export default ListTodo;
