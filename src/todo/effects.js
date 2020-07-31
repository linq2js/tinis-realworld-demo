import { effect } from "tinis";
import { TodosState, FilterState, HistoryState } from "./states";

export const AddTodo = (payload) => {
  const { title } = payload;

  TodosState.push({ title, id: Math.random(), completed: false });
};
export const RemoveTodo = (payload) => {
  const { id } = payload;

  TodosState.filter((todo) => todo.id !== id);
};

export const ToggleTodo = (payload) => {
  const { id } = payload;

  TodosState.map((todo) =>
    todo.id === id ? { ...todo, completed: !todo.completed } : todo
  );
};

export const ChangeFilter = effect((payload) => {
  const { filter } = payload;

  FilterState.mutate(filter);
});

export const Undo = () => HistoryState.back();

export const Redo = () => HistoryState.forward();
