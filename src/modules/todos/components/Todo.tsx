import React, { memo } from 'react';
import './todo.css';

type TodoProps = {
  todo: { text: string; isCompleted: boolean };
  complete: () => void;
  remove: () => void;
};

const Todo: React.FC<TodoProps> = ({ todo, complete, remove }) => {
  return (
    <div className={`todo ${todo.isCompleted ? 'completed' : ''}`}>
      <span>{todo.text}</span>
      <div>
        <button onClick={() => complete()}>✓</button>
        <button onClick={() => remove()}>✗</button>
      </div>
    </div>
  );
};

const MemoizedTodo = memo(Todo);
export default MemoizedTodo;
