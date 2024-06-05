import React from 'react';
import './form.css';

type FormProps = {
  onSubmit: (name: string) => void;
  oncChange: (name: string) => void;
  value: string;
};

export const Form: React.FC<FormProps> = ({ onSubmit, oncChange, value }) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!value) return;
        onSubmit(value);
      }}
    >
      <input
        type="text"
        className="input"
        value={value}
        onChange={(e) => oncChange(e.target.value)}
        placeholder="Add a new task"
      />
      <button type="submit" className="add-button">
        Add
      </button>
    </form>
  );
};
