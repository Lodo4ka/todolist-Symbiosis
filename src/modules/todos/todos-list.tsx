import Todo from './components/Todo';
import { useAppSelector } from '../../store';
import './todo-list.css';
import { todosSlice } from './todos.slice';
import { useDispatch } from 'react-redux';
import { Form } from './components/Form';
import { useState } from 'react';

export const TodoList = () => {
  const todos = useAppSelector((state) => todosSlice.selectors.todos(state));
  const dispatch = useDispatch();
  const [value, setValue] = useState('');

  const handleSetText = (text: string) => {
    setValue(text);
  };

  const handleAddTodo = (text: string) => {
    dispatch(
      todosSlice.actions.addTodo({
        todos: [
          ...todos,
          { id: Date.now().toString(), text, isCompleted: false },
        ],
      }),
    );
    setValue('');
  };

  const handleCompleteTodo = (id: string) => {
    dispatch(todosSlice.actions.complete({ id }));
  };

  const handleRemoveTodo = (id: string) => {
    dispatch(todosSlice.actions.remove({ id }));
  };

  return (
    <div className="app">
      <div className="todo-list">
        <h1>To-Do List</h1>
        <Form
          value={value}
          onSubmit={handleAddTodo}
          oncChange={handleSetText}
        />
        <div>
          {todos.map((todo) => (
            <Todo
              key={todo.id}
              todo={todo}
              complete={() => handleCompleteTodo(todo.id)}
              remove={() => handleRemoveTodo(todo.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
