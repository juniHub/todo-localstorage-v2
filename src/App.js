import React, { useState, useRef, useEffect} from "react";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import Todo from "./components/Todo";

import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import { useTodos } from "./components/store/Store";
import { withProvider } from "./components/store/Store";

import { makeStyles } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";

import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { withTheme } from "./components/Theme/Theme";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "100%",
    [theme.breakpoints.down("xs")]: {
      paddingTop: theme.spacing(2),
    },
  },
}));


function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

const FILTER_MAP = {
  All: () => true,
  Active: task => !task.completed,
  Completed: task => task.completed
};

const FILTER_NAMES = Object.keys( FILTER_MAP );

function App ( props )
{
  
  const { darkMode, setDarkMode } = props;
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("xs"));

  const [ filter, setFilter ] = useState( 'All' );
  const { todos, toggleTodo, removeTodo, updateTodo, addTodo } = useTodos();
    
  const todoList = todos
  .filter(FILTER_MAP[filter])
  .map(todo => (
    <Todo
      id={todo.id}
      name={todo.text}
      completed={todo.completed}
      key={todo.id}
      toggleTaskCompleted={toggleTodo}
      removeTodo={removeTodo}
      updateTodo={updateTodo}
    />
  ));

  const filterList = FILTER_NAMES.map(name => (
    <FilterButton
      key={name}
      name={name}
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ));

 
  const tasksNoun = todoList.length !== 1 ? 'tasks' : 'task';
  const headingText = `You have ${todoList.length} ${tasksNoun} in this list`;

  const listHeadingRef = useRef(null);
  const prevTaskLength = usePrevious(todos.length);

  useEffect(() => {
    if (todos.length - prevTaskLength === -1) {
      listHeadingRef.current.focus();
    }
  }, [todos.length, prevTaskLength]);

  return (
    <div className="todo-app">
      <Grid 
      className={ classes.root }
      container
      justify="center"
      alignItems={matches ? "flex-start" : "center"}
      >
      <Grid item>
      <Paper elevation={8}>
      <Form addTodo={addTodo} />
      <div className="btn-group">
        {filterList}
      </div>
      <h2 id="list-heading" tabIndex="-1" ref={listHeadingRef}>
        {headingText}
      </h2>
      <List
              id="container-box"
      >
        {todoList}
      </List>
        </Paper>
         <FormControlLabel
          control={
            <Switch
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
            />
          }
          label="Dark Mode"
          />
             </Grid>
        </Grid>
    </div>
  );
}

export default withTheme(withProvider(App));
