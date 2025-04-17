import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Toaster } from "react-hot-toast";

//Components
import InputTodo from "./pages/InputTodo";
import ListTodo from "./pages/ListTodo";

const baseURL = import.meta.env.VITE_REACT_APP_API_BASE_URL;

axios.defaults.baseURL = baseURL;
axios.defaults.withCredentials = true;

function App() {
  const [todo, setTodo] = useState([]);

  const getAllTodos = async () => {
    try {
      const response = await axios.get("/todos");
      console.log(response.data);
      setTodo(response.data);
    } catch (err) {
      toast.error(err.response?.data?.message);
    }
  };

  useEffect(() => {
    getAllTodos();
  }, []);

  return (
    <>
      <Toaster position="bottom-right" toastOptions={{ duration: 2000 }} />
      <nav>
        <InputTodo getAllTodos={getAllTodos} />
        <ListTodo todo={todo} getAllTodos={getAllTodos} />
      </nav>
    </>
  );
}

export default App;
