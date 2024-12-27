import React, { useState } from "react";
import "./App.css";
const App = () => {
  const TODO = "TODO";
  const DOING = "DOING";
  const DONE = "DONE";
  const [value, setValue] = useState("");
  const [task, setTask] = useState([]);
  const [dragTask, setDragTask] = useState(null);
  const [updateItem, setUpdateItem] = useState(null);

  const handleChange = (e) => {
    setValue(e.target.value);
  };
  console.log(value);

  const handleKeyDown = (e) => {
    console.log(e.keyCode);
    if (e.keyCode === 13) {
      //Enter pressed
      if (updateItem) {
        const obj = {
          title: value,
          id: updateItem.id,
          status: updateItem.status,
        };
        const copyTask = [...task];
        const filterList = copyTask.filter((item) => item.id !== updateItem.id);
        setTask((prevTask) => [...filterList, obj]);
        setUpdateItem(null);
      } else {
        const obj = {
          title: value,
          status: TODO,
          id: Date.now(),
        };
        setTask((prevtask) => [...prevtask, obj]);
      }

      setValue("");
    }
  };
  const handleDragNDrop = (status) => {
    let copyTask = [...task];
    copyTask = copyTask.map((item) => {
      if (dragTask.id === item.id) {
        item.status = status;
      }
      return item;
    });
    setTask(copyTask);
    setDragTask(null);
  };

  const handleDrag = (e, task) => {
    setDragTask(task);
  };
  const handleDragOver = (e) => {
    e.preventDefault();
  };
  const handleDrop = (e) => {
    const status = e.target.getAttribute("data-status");
    console.log("dropping", status);
    if (status === TODO) {
      handleDragNDrop(TODO);
    } else if (status === DOING) {
      handleDragNDrop(DOING);
    } else if (status === DONE) {
      handleDragNDrop(DONE);
    }
  };
  const deleteTask = (item) => {
    let copyTask = [...task];
    copyTask = copyTask.filter((task) => task.id != item.id);
    setTask(copyTask);
  };

  const updateTask = (task) => {
    setUpdateItem(task);
    setValue(task.title);
  };

  console.log("UpdateItem", updateItem);

  console.log(dragTask);
  console.log(task);
  console.log(value);

  return (
    <div className="app">
      <h1>Task Manager</h1>
      <input
        type="text"
        onChange={handleChange}
        value={value}
        onKeyDown={handleKeyDown}
      />
      <div className="containner">
        <div
          className="todo"
          data-status={TODO}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <h2 className="todo-heading">Todo</h2>
          {task.length > 0 &&
            task.map(
              (task) =>
                task.status === TODO && (
                  <div
                    onDrag={(e) => handleDrag(e, task)}
                    draggable
                    key={task.id}
                    className="task-item"
                  >
                    {task.title}
                    <div key={task.id} className="btns">
                      <span onClick={() => updateTask(task)} className="btn">
                        edit
                      </span>
                      <span onClick={(e) => deleteTask(task)} className="btn">
                        del
                      </span>
                    </div>
                  </div>
                )
            )}
        </div>
        <div
          className="doing"
          data-status={DOING}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <h2 className="doing-heading">Doing</h2>
          {task.length > 0 &&
            task.map(
              (task) =>
                task.status === DOING && (
                  <div
                    onDrag={(e) => handleDrag(e, task)}
                    draggable
                    key={task.id}
                    className="task-item"
                  >
                    {task.title}
                    <div key={task.id} className="btns">
                      <span onClick={() => updateTask(task)} className="btn">
                        edit
                      </span>
                      <span onClick={(e) => deleteTask(task)} className="btn">
                        del
                      </span>
                    </div>
                  </div>
                )
            )}
        </div>
        <div
          className="done"
          data-status={DONE}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <h2 className="done-heading">Done</h2>
          {task.length > 0 &&
            task.map(
              (task) =>
                task.status === DONE && (
                  <div
                    draggable
                    onDrag={(e) => handleDrag(e, task)}
                    key={task.id}
                    className="task-item"
                  >
                    {task.title}
                    <div key={task.id} className="btns">
                      <span onClick={() => updateTask(task)} className="btn">
                        edit
                      </span>
                      <span onClick={(e) => deleteTask(task)} className="btn">
                        del
                      </span>
                    </div>
                  </div>
                )
            )}
        </div>
      </div>
    </div>
  );
};

export default App;
