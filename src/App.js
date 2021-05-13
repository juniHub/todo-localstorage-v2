import React, { useState, useRef, useEffect} from "react";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import Todo from "./components/Todo";

import Grid from "@material-ui/core/Grid";
import { useTodos } from "./components/store/Store";
import { withProvider } from "./components/store/Store";

import { makeStyles } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";

import { withTheme } from "./components/Theme/Theme";

import IconButton from "@material-ui/core/IconButton";
import Brightness4Icon from '@material-ui/icons/Brightness4';

import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles( ( theme ) => ( {
  
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
  Done: task => task.completed
};

const FILTER_NAMES = Object.keys( FILTER_MAP );

function App ( props )
{
  
  const { darkMode, setDarkMode } = props;
  const classes = useStyles();
  
  const [ filter, setFilter ] = useState( 'All' );
  const { todos, toggleTodo, removeTodo, updateTodo, addTodo } = useTodos();
    
  const todoList = todos
  .filter(FILTER_MAP[filter])
    .map( todo => (
    
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
      
      <Grid className="dark-light-mode">
        <div style={ { width: '100%', display: 'flex', alignItems: 'center', marginLeft: '1rem' } }>
        <img src="https://img.icons8.com/bubbles/50/000000/todo-list.png" width="80px" height="80px" alt="logo"/>
          <h1 style={{color: 'orange'}}>Juni List</h1>
        </div>
       
         <Tooltip title="Dark Mode/Light Mode" placement="top">
          <IconButton style={{marginRight: '1rem'}} size="large" checked={ darkMode } onClick={ () => setDarkMode( !darkMode ) }><Brightness4Icon style={ { fontSize: '40px', color: 'orange' } } /></IconButton>
          </Tooltip>
    
      </Grid>
      
      <Grid
        
      className={ classes.root }
    
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
    
        <div className="todo">
              { todoList }
        </div>
  
   
        </Paper>
          
        </Grid>
        
     </Grid>
       <Grid className="footer">
          
            Todo List icon by <a href="https://icons8.com/icon/114426/todo-list" target="_blank" rel="noopener noreferrer">Icons8</a>
              
      </Grid>
   
      </div>
         
  
  );
}

export default withTheme(withProvider(App));
