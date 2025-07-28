import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function TodoList() {
  const [inputValue, setInputValue] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [editID, setEditID] = useState("");
  const [editInput, setEditInput] = useState("");

  const handleInput = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = () => {
    const newTodo = { title: inputValue, id: uuidv4() };
    console.log(newTodo.id);
    const newTodoList = [...todoList];
    newTodoList.push(newTodo);
    setTodoList(newTodoList);
    setInputValue("");
  };

  const handleDelete = (id) => {
    const filteredTodoList = todoList.filter((todoItem) => todoItem.id !== id);
    setTodoList(filteredTodoList);
  };

  const handleSetEdit = ({ title, id }) => {
    setEditID(id);
    setEditInput(title);
  };

  const handleEditInput = (e) => {
    setEditInput(e.target.value);
  };

  const handleSave = (id) => {
    const editedList = todoList.map((todoItem) =>
      todoItem.id === id
        ? {
            ...todoItem, // copy whatever in the object
            title: editInput, // change title to the edited input value
          }
        : todoItem
    );
    setTodoList(editedList);
    setEditID("");
  };

  return (
    <>
    <h2>To Do List</h2>
      <div>
        <input type="text" value={inputValue} onChange={handleInput} />
        <button onClick={handleSubmit}>Submit</button>
      </div>
      <ul>
        {todoList.map((todoItem) => (
          <li key={todoItem.id}>
            {editID === todoItem.id ? (
              <>
                <input
                  type="text"
                  value={editInput}
                  onChange={handleEditInput}
                />
                <button onClick={() => handleSave(todoItem.id)}>Save</button>
              </>
            ) : (
              <>
                {todoItem.title}
                <button onClick={() => handleDelete(todoItem.id)}>
                  Delete
                </button>
                <button onClick={() => handleSetEdit(todoItem)}>Edit</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </>
  );
}
