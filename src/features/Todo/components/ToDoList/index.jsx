import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './styles.scss';

ToDoList.propTypes = {
  todoList: PropTypes.array,
  onTodoClick: PropTypes.func,
};

ToDoList.defaultProps = {
  todoList: [],
  onTodoClick: null,
};

function ToDoList({ todoList, onTodoClick }) {
  const handleTodoClick = (todo, idx) => {
    if (!onTodoClick) return;

    onTodoClick(todo, idx);
  };

  return (
    <ul className="todo-list">
      {todoList.map((todo, idx) => (
        <li
          className={classNames({
            'todo-item': true,
            completed: todo.status === 'completed',
          })}
          key={todo.id}
          onClick={() => handleTodoClick(todo, idx)}
        >
          {todo.title}
        </li>
      ))}
    </ul>
  );
}

export default ToDoList;
