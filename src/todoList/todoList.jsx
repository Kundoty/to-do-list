import { useState, useMemo, useCallback, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import "./todoList.css";

export default function TodoList() {
  const [inputValue, setInputValue] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [editID, setEditID] = useState("");
  const [editInput, setEditInput] = useState("");
  const inputRef = useRef(null);
  const pendingTodo = useMemo(
    () => todoList.filter((todoItem) => !todoItem.completed),
    [todoList]
  );
  const completTodo = useMemo(
    () => todoList.filter((todoItem) => todoItem.completed),
    [todoList]
  );

  const handleInput = useCallback((e) => {
    setInputValue(e.target.value);
  }, []);

  const handleSubmit = () => {
    if (inputValue.trim() === "") {
        alert('Task cannot be empty');
        inputRef.current.focus();
        return;
    }
    const newTodo = { title: inputValue, completed: false, id: uuidv4() };
    const newTodoList = [...todoList, newTodo];
    setTodoList(newTodoList);
    setInputValue("");
  };

  const handleDelete = useCallback((id) => {
    const filteredTodoList = todoList.filter((todoItem) => todoItem.id !== id);
    setTodoList(filteredTodoList);
  }, [todoList]);

  const handleSetEdit = ({ title, id }) => {
    setEditID(id);
    setEditInput(title);
  };

  const handleEditInput = useCallback((e) => {
    setEditInput(e.target.value);
  }, []);

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

  const handleSwitchComplete = (id) => {
    const updateList = todoList.map((todoItem) =>
      todoItem.id === id
        ? {
            ...todoItem,
            completed: !todoItem.completed,
          }
        : todoItem
    );
    setTodoList(updateList);
  };

  return (
    <>
      <h2>To Do List</h2>
      <div>
        <input
          type="text"
          ref={inputRef}
          value={inputValue}
          onChange={handleInput}
        />
        <button onClick={handleSubmit}>Submit</button>
      </div>
      <div className="todo-list-section">
        <div className="pending-todo">
          <ul>
            <span>Pending Todo</span>
            {pendingTodo.map((todoItem) => (
              <li key={todoItem.id}>
                {editID === todoItem.id ? (
                  <>
                    <input
                      type="text"
                      value={editInput}
                      onChange={handleEditInput}
                    />
                    <button onClick={() => handleSave(todoItem.id)}>
                      Save
                    </button>
                  </>
                ) : (
                  <>
                    {todoItem.title}
                    <button onClick={() => handleDelete(todoItem.id)}>
                      Delete
                    </button>
                    <button onClick={() => handleSetEdit(todoItem)}>
                      Edit
                    </button>
                    <button onClick={() => handleSwitchComplete(todoItem.id)}>
                      {"=>"}
                    </button>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
        <div className="complete-todo">
          <ul>
            <span>Complete Todo</span>
            {completTodo.map((todoItem) => (
              <li key={todoItem.id}>
                {editID === todoItem.id ? (
                  <>
                    <input
                      type="text"
                      value={editInput}
                      onChange={handleEditInput}
                    />
                    <button onClick={() => handleSave(todoItem.id)}>
                      Save
                    </button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleSwitchComplete(todoItem.id)}>
                      {"<="}
                    </button>
                    {todoItem.title}
                    <button onClick={() => handleDelete(todoItem.id)}>
                      Delete
                    </button>
                    <button onClick={() => handleSetEdit(todoItem)}>
                      Edit
                    </button>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
