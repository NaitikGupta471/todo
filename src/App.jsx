import { useState, useEffect } from 'react';
import Navbar from './components/navbar';
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { MdAssignmentAdd } from "react-icons/md";
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");
  const [showfinished, setShowfinished] = useState(true);

  // Load todos from localStorage on component mount
  useEffect(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos)); // Only set from localStorage if there's data
    }
  }, []);

  // Save todos to localStorage whenever the todos state changes
  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }, [todos]);

  const handlerAdd = () => {
    if (todo.trim() === "") return; // Prevent adding empty todos
    const newTodo = { id: uuidv4(), todo, isFinished: false };
    setTodos([...todos, newTodo]);
    setTodo(""); // Clear the input after adding
  };

  const handlerEdit = (e) => {
    let id = e.currentTarget.name;
    let t = todos.find(item => item.id === id);
    setTodo(t.todo); // Set the todo text to the input for editing
    let newTodos = todos.filter(item => item.id !== id); // Remove the todo from the list temporarily
    setTodos(newTodos); // Update the state
  };

  const handlerDelete = (e) => {
    let id = e.currentTarget.name;
    let newTodos = todos.filter(item => item.id !== id); // Remove the todo from the list
    setTodos(newTodos); // Update the state
    localStorage.setItem("todos", JSON.stringify(newTodos)); // Update localStorage immediately after deletion
  };

  const handlertoggle = (e) => {
    let id = e.currentTarget.name;
    let newTodos = todos.map(item => {
      if (item.id === id) {
        return { ...item, isFinished: !item.isFinished }; // Toggle the finished status
      }
      return item;
    });
    setTodos(newTodos); // Update the state
  };

  const handlerfinishedshow = () => {
    setShowfinished(!showfinished); // Toggle the show finished state
  };

  const handlerChange = (e) => {
    setTodo(e.target.value); // Update the todo input value
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto  mt-4 min-h-[80vh] md:w-2/5 w-[90%] bg-violet-200 rounded-xl  ">
        <div className="heading font-bold text-2xl max-md:text-lg text-center p-4 font-serif">
          iTask - Manage your todos at one place
        </div>

        <div className="flex justify-evenly">
          <input className="w-4/5 rounded-3xl p-2 " autoFocus onChange={handlerChange} value={todo} type="text" />
          <button
            onClick={handlerAdd} disabled={todo.length <= 2}
            className="ent rounded-3xl border-2 px-5 py-2 bg-violet-900 text-white font-semibold"><MdAssignmentAdd/></button>
        </div>

        <div className="showfinished">
          <input className="ml-8 my-5 mr-3 " onChange={handlerfinishedshow} type="checkbox" checked={showfinished} />Show Finished
        </div>
        <hr className="mx-8 invert" />

        <div className="taskbox min-h-[35vh]">
          {todos.length === 0 && <div className='flex justify-center mt-52'>No Todos to display</div>}
          {todos.map(item => {
            return (showfinished || !item.isFinished) && (
              <div key={item.id} className="m-2 mx-6 flex justify-start items-center">
                <input type="checkbox" name={item.id} checked={item.isFinished} onChange={handlertoggle} />
                <div className="m-3 max-w-[78%] text-wrap">
                  <div className={item.isFinished ? "line-through" : ""}>
                    {item.todo}
                  </div>
                </div>
                <div className="flex justify-end w-full">
                  <button name={item.id} onClick={handlerEdit} className="rounded-3xl border-2 px-4 py-2 bg-violet-900 text-white font-semibold"><FaEdit /></button>
                  <button name={item.id} onClick={handlerDelete} className="rounded-3xl ml-1 border-2 px-4 py-2 bg-violet-900 text-white font-semibold"><AiFillDelete /></button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
