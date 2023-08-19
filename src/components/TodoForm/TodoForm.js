import { useState } from "react";

export default function TodoForm({ onAddTodo }) {
  const [input, setInput] = useState("");

  const onInput = (e) => {
    setInput(e.target.value);
  };

  const onKeydown = (e) => {
    if (e.key === "Enter") {
      onAddNewTodo();
    }
  };

  const onAddNewTodo = () => {
    if (input.trim()) {
      onAddTodo(input);
    }
    setInput("");
  };

  return (
    <div className="form">
      <input
        value={input}
        onChange={onInput}
        onKeyDown={onKeydown}
        type="text"
        placeholder="Enter task ..."
      />
      <button onClick={onAddNewTodo} disabled={input.trim() === ""}>
        SUBMIT
      </button>
    </div>
  );
}
