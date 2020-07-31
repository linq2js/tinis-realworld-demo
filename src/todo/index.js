import React, { useRef, Suspense } from "react";
import { useValue } from "react-tinis";
import { HistoryState, FilteredTodosState, FilterState } from "./states";
import {
  Undo,
  Redo,
  AddTodo,
  RemoveTodo,
  ToggleTodo,
  ChangeFilter,
} from "./effects";

export default function () {
  return (
    <>
      <h1>Todo App</h1>
      <Suspense fallback="Loading...">
        <TodoForm />
        <TodoList />
        <TodoFilter />
      </Suspense>
    </>
  );
}

function FilterLink({ children, filter, selected, onClick }) {
  const todos = useValue(FilteredTodosState(filter));

  return (
    <button onClick={onClick} style={selected ? { fontWeight: "bold" } : {}}>
      {children} ({todos.length})
    </button>
  );
}

function TodoFilter() {
  const history = useValue(HistoryState);
  const filter = useValue(FilterState);

  return (
    <>
      <p>
        <FilterLink
          filter="all"
          selected={filter === "all"}
          onClick={() => ChangeFilter({ filter: "all" })}
        >
          All
        </FilterLink>{" "}
        <FilterLink
          filter="active"
          selected={filter === "active"}
          onClick={() => ChangeFilter({ filter: "active" })}
        >
          Active
        </FilterLink>{" "}
        <FilterLink
          filter="done"
          selected={filter === "done"}
          onClick={() => ChangeFilter({ filter: "done" })}
        >
          Done
        </FilterLink>
      </p>
      <p>
        <span>History ({history.length})</span>
        {", "}
        <span>Previous ({history.prev.length})</span>
        {", "}
        <span>Next ({history.next.length})</span>
        {", "}
        <span>Updated on: ({history.updatedOn.toISOString()})</span>
        {", "}
        <button disabled={!history.back} onClick={Undo}>
          Undo
        </button>{" "}
        <button disabled={!history.forward} onClick={Redo}>
          Redo
        </button>
      </p>
    </>
  );
}

function TodoForm() {
  const inputRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();
    AddTodo({ title: inputRef.current.value });
    inputRef.current.value = "";
  }

  return (
    <form onSubmit={handleSubmit}>
      <input ref={inputRef} type="text" placeholder="Enter todo title" />
    </form>
  );
}

function TodoList() {
  const filter = useValue(FilterState);
  const todos = useValue(FilteredTodosState(filter));

  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem key={todo.id} {...todo} />
      ))}
    </ul>
  );
}

function TodoItem({ id, title, completed }) {
  return (
    <li style={{ opacity: completed ? 0.5 : 1 }}>
      <div>
        <span>{title}</span>
      </div>
      <div>
        <button onClick={() => RemoveTodo({ id })}>Remove</button>{" "}
        <button onClick={() => ToggleTodo({ id })}>Toggle</button>
      </div>
      <p />
    </li>
  );
}
