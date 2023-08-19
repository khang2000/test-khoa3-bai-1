import { useEffect, useState } from "react";
import { v4 } from "uuid";
import TodoForm from "./components/TodoForm/TodoForm";
import TodoList from "./components/TodoList/TodoList";
import "./App.css";
import Header from "./TodoListHeader";

function App() {
  // State and hooks
  const [todoList, setTodoList] = useState([]);

  useEffect(() => {
    const todoFromLocal = localStorage.getItem("todos");
    if (todoFromLocal) {
      setTodoList(JSON.parse(todoFromLocal));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todoList));
  }, [todoList]);

  //   Functions
  const onAddTodo = (title) => {
    const newTodo = {
      id: v4(),
      title,
      isDone: false,
    };
    setTodoList((prevList) => [newTodo, ...prevList]);
  };

  const onItemChecked = (itemId) => {
    const itemIndex = todoList.findIndex(({ id }) => id === itemId);
    const newTodo = [...todoList];
    const newTodoItem = {
      ...newTodo[itemIndex],
      isDone: !newTodo[itemIndex].isDone,
    };
    newTodo[itemIndex] = newTodoItem;
    setTodoList(newTodo);
  };

  const onItemRemoved = (itemId) => {
    const newTodo = todoList.filter((item) => item.id !== itemId);
    setTodoList(newTodo);
  };

  const onUpdateTodoItem = (newValue, todoId) => {
    const updatingTodoItemIndex = todoList.findIndex(
      (todo) => todo.id === todoId
    );

    const nextTodoList = [...todoList];

    nextTodoList[updatingTodoItemIndex] = {
      ...nextTodoList[updatingTodoItemIndex],
      title: newValue,
    };

    setTodoList(nextTodoList);
  };

  return (
    <div className="flex items-center justify-center w-screen h-screen transition-all">
      <div className="flex flex-grow items-center justify-center h-full text-gray-600 bg-gray-100">
        <div className="max-w-full  my-[40px] px-7 pt-10 py-10 bg-white rounded-lg shadow-lg w-2/3 h-screen">
          <Header todoList={todoList} />
          <TodoList
            todoList={todoList}
            onItemChecked={onItemChecked}
            onItemRemoved={onItemRemoved}
            onUpdateTodoItem={onUpdateTodoItem}
          />
          <TodoForm onAddTodo={onAddTodo} />
        </div>
      </div>
    </div>
  );
}

export default App;
