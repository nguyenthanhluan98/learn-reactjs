import React, { useState, useEffect } from 'react';
import ToDoList from '../../components/ToDoList';
import { Button } from '@material-ui/core';
import queryString from 'query-string';
import { useHistory, useLocation, useRouteMatch } from 'react-router';
import ToDoForm from '../../components/ToDoForm';

ListPage.propTypes = {};

function ListPage(props) {
  const initTodoList = [
    {
      id: 1,
      title: 'Eat',
      status: 'new',
    },
    {
      id: 2,
      title: 'Sleep',
      status: 'completed',
    },
    {
      id: 3,
      title: 'Code',
      status: 'completed',
    },
    {
      id: 4,
      title: 'Code213',
      status: 'new',
    },
  ];

  const location = useLocation();
  const history = useHistory();
  const match = useRouteMatch();
  const [todoList, setTodoList] = useState(initTodoList);

  const [filteredStatus, setFilteredStatus] = useState(() => {
    const params = queryString.parse(location.search);
    console.log('filter: ', params);
    return params.status || 'all';
  });

  // useEffect get location in URL then will change by status
  useEffect(() => {
    const params = queryString.parse(location.search);
    console.log('filter useEffect(): ', params);
    console.log('match path: ', location.search);
    setFilteredStatus(params.status || 'all');
  }, [location.search]);

  const handleTodoClick = (todo, idx) => {
    // clone current array to new one
    const newTodoList = [...todoList];

    const newTodo = {
      ...newTodoList[idx],
      status: newTodoList[idx].status === 'new' ? 'completed' : 'new',
    };
    newTodoList[idx] = newTodo;

    setTodoList(newTodoList);
  };

  const handleShowAllClick = () => {
    //  setFilteredStatus("all");
    const queryParams = { status: 'all' };
    history.push({
      pathname: match.path,
      search: queryString.stringify(queryParams),
    });
  };

  const handleShowCompletedClick = () => {
    // setFilteredStatus("completed");
    const queryParams = { status: 'completed' };
    history.push({
      pathname: match.path,
      search: queryString.stringify(queryParams),
    });
  };

  const handleShowNewClick = () => {
    // setFilteredStatus("new");
    const queryParams = { status: 'new' };
    history.push({
      pathname: match.path,
      search: queryString.stringify(queryParams),
    });
  };

  const renderTodoList = todoList.filter((todo) => filteredStatus === 'all' || filteredStatus === todo.status);

  //---------- TO DO FORM
  const handleToDoSubmit = (values) => {
    //console.log('Form submit: ', values);

    const newToDo = {
      id: todoList.length + 1,
      title: values.title,
      status: 'new',
    };

    const newToDoList = [...todoList, newToDo];
    setTodoList(newToDoList);
  };

  return (
    <div>
      <h3>-----------------</h3>

      <ToDoForm onSubmit={handleToDoSubmit} />

      <h3>To do list</h3>
      <ToDoList todoList={renderTodoList} onTodoClick={handleTodoClick} />
      <Button variant="contained" color="secondary" onClick={handleShowAllClick}>
        Show all
      </Button>
      <Button variant="contained" color="primary" onClick={handleShowCompletedClick}>
        Show completed
      </Button>
      <Button onClick={handleShowNewClick}>Show new</Button>
    </div>
  );
}

export default ListPage;
