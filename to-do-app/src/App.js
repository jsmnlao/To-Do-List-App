import './App.css';
import {useState} from "react";

//Create Task component
function Task({task, index, completeTask, deleteTask}){
  return(
    <div
      className="task"
      style={{textAlign: "center", textDecoration: task.isCompleted ? "line-through": ""}}
      >
      {task.text}
      <div>
        <button onClick={() => completeTask(index)}>COMPLETE</button>
        <button onClick={() => deleteTask(index)}>DELETE</button>
      </div>
    </div>
  );
}

//Create Form component
function Form({addTask}){
  const [input, setInput] = useState("");

  //Create handle submit actions
  const handleSubmit = (e) => {
    e.preventDefault();
    if(!input)
      return;
    addTask(input);
    setInput("");
  };
  
  return(
    <form>
      <input 
          style={{width: "300px", height: "20px"}}
          type="text"
          placeholder="add task..."
          className="input"
          value={input}
          onChange={e => setInput(e.target.value)}/>
        <button onClick={handleSubmit}>Add Task</button>
    </form>
  );
}

//Create App component
function ToDoApp() {
  //Inital states
  const [tasks, setTasks] = useState([
    {text: "make cool todo app", isCompleted: false},
    {text: "do yoga", isCompleted: false},
    {text: "finish errands", isCompleted: false}
  ]);
  
  const divStyle = {
    textAlign: 'center',
    padding: '30px',
    // display: "table-cell",
  // verticalAlign: "middle"
  };

  const headerStyle = {
    color: 'teal',
    textAlign: 'center'
  };

  // Adding tasks
  const addTask = input => {
    const newTasks = [...tasks, {text: input, isCompleted: false}];
    setTasks(newTasks);
  };

  //Completing tasks
  const completeTask = index => {
    const newTasks = [...tasks];
    newTasks[index].isCompleted = true;
    setTasks(newTasks);
  };

  //Deleting tasks
  const deleteTask = index => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  };

  return (
    <div className="app" style={divStyle}>
      <h1 style={headerStyle}>To Do List</h1>
      
      <div className="todo-list">
        <Form addTask={addTask} />
      </div>

      <div style={divStyle}>
      {tasks.map((task, index) => (
          <Task
            key={index}
            index={index}
            task={task}
            completeTask={completeTask}
            deleteTask={deleteTask}>
          </Task>
        ))}
      </div>
      
    </div>
  );
}

export default ToDoApp;
