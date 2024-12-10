"use client";
import { useState, useEffect } from "react";
import { FaTrash } from "react-icons/fa";


export default function Home() {
  interface Todos {
    name: string;
    date: number;
  }
  
  

  const [todo, setTodo] = useState<Todos[]>([]);
  
  const [todoInput, setTodoInput] = useState<string>("");

  const deleteTodo = (d: Todos) => {
    const newItems = todo.filter((item) => item.name !== d.name);
    setTodo(newItems);
    localStorage.setItem("todo", JSON.stringify(newItems));
  };
  const handleTodo = (event: React.FormEvent) => {
    if (todoInput.trim() == "") {
      alert("please input your todo");
      return;
    }
    event.preventDefault();
    const newTodo: Todos = {
      name: todoInput,
      date: Date.now(),
    };
    setTodo((prev) => {
      localStorage.setItem("todo", JSON.stringify([...prev, newTodo]));
      return [...prev, newTodo];
    });
    setTodoInput("");
  };


  return (
    <div className="max-w-6xl mx-auto bg-white mt-40 border shadow-md rounded-lg p-6 ">
     

      <h1 className="text-3xl font-bold text-center mb-6">TODO </h1>
      <div className="grid gap-20">
        {todo.length < 1 ? (
          <center> YOU ARE YET TO CREATE ANY TODO</center>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-gray-700 border-b font-medium whitespace-nowrap min-w-[80px]">
                    No:
                  </th>
                  <th className="px-4 py-2 text-gray-700 border-b font-medium whitespace-nowrap min-w-[150px]">
                    Todo-Name
                  </th>

                  <th className="px-4 py-2 text-gray-700 border-b font-medium whitespace-nowrap min-w-[120px]">
                    Added on
                  </th>
                  <th className="px-4 py-2 text-gray-700 border-b font-medium whitespace-nowrap min-w-[100px]">
                    Time
                  </th>
                  <th className="px-4 py-2 text-gray-700 border-b font-medium whitespace-nowrap min-w-[100px]">
                    Delete
                  </th>
                </tr>
              </thead>
              <tbody>
                {todo?.map((item, index) => (
                  <tr
                    key={index}
                    className="border-b hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-4 whitespace-nowrap">{index + 1}</td>
                    <td className="px-4 py-4 whitespace-nowrap">{item.name}</td>

                    <td className="px-4 py-4 whitespace-nowrap">
                      {new Date(item.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      {new Date(item.date).toLocaleTimeString("en-US", {
                        hour: "numeric",
                        minute: "numeric",
                        hour12: true,
                      })}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <FaTrash
                        style={{ color: "red" }}
                        className="cursor-pointer"
                        onClick={() => {
                          deleteTodo(item);
                        }}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <form action="" onSubmit={handleTodo}>
          <input
            type="text"
            onChange={(e) => setTodoInput(e.target.value)}
            placeholder="Enter your todo"
            className="border p-2 rounded w-full mb-2"
            value={todoInput}
          />
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded">
            Add Todo
          </button>
        </form>
      </div>
    </div>
  );
}
