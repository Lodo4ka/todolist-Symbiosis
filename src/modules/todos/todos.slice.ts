import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';

export type TodoId = string;
export type Todo = {
  id: TodoId;
  text: string;
  isCompleted: boolean;
};

type TodosState = {
  entities: Record<TodoId, Todo>;
  ids: TodoId[];
  selectedTodoId: TodoId | undefined;
};

export const initialTodosState: TodosState = {
  entities: {},
  ids: [],
  selectedTodoId: undefined,
};

export const todosSlice = createSlice({
  name: 'todos',
  initialState: initialTodosState,
  selectors: {
    todos: createSelector(
      (state: TodosState) => state.ids,
      (state: TodosState) => state.entities,
      (ids, entities) => {
        return ids.map((id) => entities[id]);
      },
    ),
  },
  reducers: {
    addTodo: (state, action: PayloadAction<{ todos: Todo[] }>) => {
      const { todos } = action.payload;
      state.entities = todos.reduce(
        (acc, todo) => {
          acc[todo.id] = todo;

          return acc;
        },
        {} as Record<TodoId, Todo>,
      );
      state.ids = todos.map((todo) => todo.id);
    },
    complete: (state, action: PayloadAction<{ id: TodoId }>) => {
      const { id } = action.payload;
      state.entities[id].isCompleted = !state.entities[id].isCompleted;
    },
    remove: (state, action: PayloadAction<{ id: TodoId }>) => {
      const { id } = action.payload;
      delete state.entities[id];
      state.ids = state.ids.filter((todoId) => todoId !== id);
    },
  },
});
