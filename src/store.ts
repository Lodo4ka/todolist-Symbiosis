import { configureStore, createSelector } from '@reduxjs/toolkit';
import { todosSlice } from './modules/todos/todos.slice';
import { useDispatch, useSelector, useStore } from 'react-redux';

export const store = configureStore({
  reducer: {
    [todosSlice.name]: todosSlice.reducer,
  },
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector = useSelector.withTypes<AppState>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppStore = useStore.withTypes<typeof store>();
export const createAppSelector = createSelector.withTypes<AppState>();
