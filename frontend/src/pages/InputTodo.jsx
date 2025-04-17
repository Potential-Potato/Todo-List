import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const InputTodo = ({ getAllTodos }) => {
  const [description, setDescription] = useState("");

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { description };
      const response = await axios.post("/todos", body);
      toast.success(response.data.message);
      setDescription("");
      getAllTodos();
    } catch (err) {
      toast.error(err.response?.data?.message);
      console.error(err.message);
    }
  };

  return (
    <div>
      <h1 className="Title">Pern Todo List</h1>
      <form onSubmit={onSubmitForm}>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button>Add</button>
      </form>
    </div>
  );
};

export default InputTodo;
