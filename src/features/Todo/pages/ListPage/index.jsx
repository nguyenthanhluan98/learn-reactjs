import React, { useState, useEffect } from 'react';
import ToDoList from '../../components/ToDoList';
import { Button } from '@material-ui/core';
import queryString from 'query-string';
import { useHistory, useLocation, useRouteMatch } from 'react-router';
import ToDoForm from '../../components/ToDoForm';

import AppBar from '@material-ui/core/AppBar';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';

ListPage.propTypes = {};

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(0, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

function ListPage(props) {
  const classes = useStyles();
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
      <main>
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <ToDoForm onSubmit={handleToDoSubmit} />

            <h3>To do list</h3>
            <ToDoList todoList={renderTodoList} onTodoClick={handleTodoClick} />
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                <Grid item>
                  <Button variant="contained" color="secondary" onClick={handleShowAllClick}>
                    Show all
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="outlined" color="primary" onClick={handleShowCompletedClick}>
                    Show completed
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="contained" onClick={handleShowNewClick}>
                    Show new
                  </Button>
                </Grid>
              </Grid>
            </div>

            {/* <Button variant="contained" color="secondary" onClick={handleShowAllClick}>
              Show all
            </Button>
            <Button variant="contained" color="primary" onClick={handleShowCompletedClick}>
              Show completed
            </Button>
            <Button variant="contained" onClick={handleShowNewClick}>
              Show new
            </Button> */}
          </Container>
        </div>
      </main>
    </div>
  );
}

export default ListPage;
