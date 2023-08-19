import { useState, useRef, useEffect } from "react";
import { TiDeleteOutline } from "react-icons/ti";
import { RiEditLine } from "react-icons/ri";

export default function TodoItem({
  id,
  title,
  isDone,
  onItemChecked,
  onItemRemoved,
  onUpdateTodoItem,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [todoItemValue, setTodoItemValue] = useState(title);
  const todoInputRef = useRef(null);

  const onUpdateTitle = (e) => {
    setTodoItemValue(e.target.value);
  };

  //   Xử lý cái việc update lại todoitem
  const onUpdateTodoItemHandler = () => {
    onUpdateTodoItem(todoItemValue, id);
    setIsEditing(false);
  };

  const onChangeToEditMode = () => {
    setIsEditing(true);
    // Muốn focus vào cái thẻ input sau khi setState
    // Code như vầy sẽ bị bug => do hàm setState là hàm bất đồng bộ
    // Nó sẽ chạy sau các cái hàm đồng bộ
    // todoInputRef && todoInputRef.current.focus();
  };

  const onKeyDownHandler = (e) => {
    if (e.key === "Enter") {
      onUpdateTodoItemHandler();
    }
  };

  // Thực hiện sau mỗi lần render (biến watching là isEditing)
  useEffect(() => {
    if (isEditing && todoInputRef) {
      todoInputRef && todoInputRef.current.focus();
    }
  }, [isEditing]);

  return (
    <div
      className={`relative flex items-center p-3 w-full h-full ${
        isDone && "bg-gray-200"
      }`}
    >
      <div className="flex items-center h-5">
        <input
          checked={isDone}
          onChange={() => onItemChecked(id)}
          id={id}
          type="checkbox"
          className="border-gray-200 rounded-full accent-green-400 h-4 w-4"
        />
      </div>

      {isEditing ? (
        <input
          value={todoItemValue}
          name={title}
          className="ml-3.5 block w-full text-gray-600"
          onChange={onUpdateTitle}
          onBlur={onUpdateTodoItemHandler}
          onKeyPress={onKeyDownHandler}
          ref={todoInputRef}
        />
      ) : (
        <label
          htmlFor={id}
          className={`ml-3.5 block w-full text-gray-600 ${
            isDone && "line-through opacity-80"
          }`}
        >
          {title}
        </label>
      )}

      <button
        className="text-blue-500 font-lg opacity-50 hover:opacity-100"
        onClick={onChangeToEditMode}
      >
        <RiEditLine fontSize={30} />
      </button>
      <button
        className="text-red-800 font-lg opacity-50 hover:opacity-100"
        onClick={() => onItemRemoved(id)}
      >
        <TiDeleteOutline fontSize={30} />
      </button>
    </div>
  );
}
