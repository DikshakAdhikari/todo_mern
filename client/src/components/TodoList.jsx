import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { authState } from "../store/atom/authState";

export const TodoList = () => {
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    const fun = async () => {
      const res = await axios.get("http://localhost:3000/todos/todo", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      //console.log(res.data);
      setTodos(res.data.userTodos);
    };

    fun();
  }, []);

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  return (
    <div>
      <div style={{ display: "flex", marginLeft: 200, marginTop: 200, gap: 1 }}>
        <div>
          <input
            type="text"
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div style={{ display: "flex" }}>
          <input
            type="text"
            placeholder="description"
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>
        <button
          style={{ width: 90 }}
          onClick={async () => {
            try {
              const newTodo = await axios.post(
                "http://localhost:3000/todos/todo",
                { title: title, description: desc },
                {
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                  },
                }
              );
                const updatedTodos= []
                for(let i=0;i<todos.length;i++){
                  updatedTodos.push(todos[i]);
                }
                updatedTodos.push(newTodo.data);
               // console.log(updatedTodos);

                setTodos(updatedTodos);
             
            } catch (err) {
              console.log(err);
            }
          }}
        >
          Register
        </button>
        </div>
        <div style={{ marginLeft: 20, marginTop: 40 }}>
          <h1>Todos</h1>
          {todos.map((todo) => (
            <div key={todo._id}>
              <h2 style={{ marginBottom: 10 }}>{todo.title}</h2>
              <div style={{ marginBottom: 10 }}>{todo.description}</div>
              <button>Mark as Read!</button>
              <br />
              <br />
              <br />
            </div>
          ))}
        </div>
      
    </div>
  );
};
