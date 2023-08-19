import TodoItem from "../TodoItem/TodoItem";

const TodoList = ({
  todoList,
  onItemChecked,
  onItemRemoved,
  onUpdateTodoItem,
}) => {
  const todoListValid = todoList && Array.isArray(todoList);
  const todoItemElements =
    todoListValid &&
    todoList.map((todo) => (
      <li
        key={todo.id}
        className="inline-flex items-center justify-center gap-x-2 h-12 mb-4 text-xl font-md bg-white border text-gray-800 -mt-px rounded-lg hover:border-green-500 hover:transition-all"
      >
        <TodoItem
          {...todo}
          onItemChecked={onItemChecked}
          onItemRemoved={onItemRemoved}
          onUpdateTodoItem={onUpdateTodoItem}
        />
      </li>
    ));

  if (todoList.length === 0) {
    return <h1 className="text-center">Add new todo!</h1>;
  }
  return <ul className="max-w flex flex-col">{todoItemElements}</ul>;
};

export default TodoList;
