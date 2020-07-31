import { state } from "tinis";

export const TodosState = state(
  async () => {
    const todos = await fetch(
      "https://run.mocky.io/v3/fec25fe2-d2ce-413f-b176-fe9327c6bf73?mocky-delay=500ms"
    ).then((res) => res.json());

    return todos.slice(0, 5);
  },
  {
    default: [],
    displayName: "Todos",
  }
);

export const FilterState = state("all", { displayName: "Filter" });

export const FilteredTodosState = state.family(
  (filter) => {
    const todos = TodosState.value;

    switch (filter) {
      case "active":
        return todos.filter((todo) => !todo.completed);
      case "done":
        return todos.filter((todo) => todo.completed);
      default:
        return todos;
    }
  },
  {
    displayName: "FilteredTodos",
  }
);

export const HistoryState = state.history(TodosState, { max: 10 });
