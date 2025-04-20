import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

import "./editTodo.css";
const EditTodo = ({ isOpen, onClose, todo, onSave }) => {
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (todo) {
      setDescription(todo.description);
    }
  }, [todo]);

  const handleSave = async () => {
    try {
      const response = await axios.put(`/todos/${todo.todo_id}`, {
        description,
      });
      toast.success(response.data.message);
      onClose();
      if (onSave) onSave();
    } catch (err) {
      toast.error(err.response?.data?.message);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="overlay">
      <div className="modal">
        <h2>Edit Todo</h2>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="input"
        />
        <div className="actions">
          <button onClick={handleSave}>Save</button>
          <button onClick={onClose} style={{ marginLeft: "10px" }}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditTodo;
