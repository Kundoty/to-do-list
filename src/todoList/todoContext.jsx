import { createContext, useReducer } from "react";

export const TodoContext = createContext();

const todoReducer = (state, action) => {
  switch (action.type) {
    case "addTodo":
      return {
        todoList: [...state.todoList, action.payload],
      };
    case "deleteTodo":
      return {
        todoList: state.todoList.filter(
          (todoItem) => todoItem.id !== action.payload
        ),
      };
      case 'switchComplete':
        return {
            todoList: state.todoList.map(todoItem => 
                todoItem.id === action.payload
                ? {
                    ...todoItem,
                    completed: !todoItem.completed
                }
                : todoItem
            )
        }
    case "saveEdit":
      return {
        todoList: state.todoList.map((todoItem) =>
          todoItem.id === action.payload.id
            ? {
                ...todoItem,
                title: action.payload.editInput,
              }
            : todoItem
        ),
      };
    default:
      return state;
  }
};

export function TodoProvider({ children }) {
  const [state, dispatch] = useReducer(todoReducer, { todoList: [] });
  return <TodoContext value={{ state, dispatch }}>{children}</TodoContext>;
}
