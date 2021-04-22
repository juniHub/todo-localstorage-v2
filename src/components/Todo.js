import React, { useEffect, useRef, useState } from "react";
import { makeStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";

import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

import { SketchPicker } from "react-color";
import PaletteIcon from '@material-ui/icons/Palette';

const useStyles = makeStyles((theme) => ({
  textField: {
    width: 400,
    [theme.breakpoints.down("xs")]: {
      width: 200,
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

export default function Todo(props) {
  const [isEditing, setEditing] = useState(false);
  const [ newName, setNewName ] = useState( '' );
  const classes = useStyles();

  const editFieldRef = useRef(null);
  const editButtonRef = useRef(null);

  const wasEditing = usePrevious( isEditing );
  const labelUpdate = "Would you like to update " + props.name + "?";

  const [ show, setShow ] = useState( false );
  
  const initialColor = () => String(window.localStorage.getItem('color') || '#fff');
 
  const [color, setColor] = useState(initialColor);

  useEffect(() =>{

    window.localStorage.setItem('color', color)
  }, [color])
  



  function handleChange(e) {
    setNewName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!newName.trim()) {
      return;
    }
    props.updateTodo(props.id, newName);
    setNewName("");
    setEditing(false);
  }

  const editingTemplate = (
    <form className="todo-form" onSubmit={handleSubmit}>
     
        <Grid container className="todo-input">
        <Grid item>
        <TextField
          id={props.id}
          className={classes.textField}
          label={labelUpdate}
          variant="outlined"
          size="small"
          value={newName}
          onChange={handleChange}
          ref={editFieldRef}
        />
       </Grid>
     
        <Grid item>
          <Box pl={ 1 }>
             <Button
              type="submit"
              className="todo-edit-btn"
              variant="contained"
              color="secondary">
            
          Save
         
            </Button> 

         <Button
         
          className="todo-edit-btn"
          variant="contained"
          color="primary"
          onClick={() => setEditing(false)}
        >
          Cancel
        
         </Button>
          
          </Box>
            </Grid>
           </Grid>
 
    </form>
  );

  const viewTemplate = (
   
    <List>
      
         
      <ListItem key={ props.id }
           
        style={ {
          display: 'flex',
          flexDirection: "column",
          justifyContent: 'center',
          alignContent: 'center',
          textAlign: 'center',
          
          backgroundColor: color,
          transition: "ease all 500ms",
          margin: "0.5rem",
         
          height: '100px'
        }}
      
     
      
      >
        <div>
          <ListItemText primary={ props.name } className={ props.completed ? 'todo-row complete' : 'todo-row' } />
        </div>
        
        <ListItemSecondaryAction
        
          style={{
          backgroundColor: "gold" ,
          margin: "0.5rem",
          padding: "0.5rem",
          borderRadius: "20px",
          height: '50px'
        }}
      
        
        >
                   <IconButton size="medium" style={{ color: '#8bd3dd' }} onClick={() => {
                    setShow(!show);
                  } }><PaletteIcon fontSize="medium" /></IconButton>
          
                  <Checkbox
                    checked={ props.completed }
                    onClick={() => props.toggleTaskCompleted(props.id)}
                   
                  />

                   <IconButton >
                  
                   <EditIcon onClick={() => setEditing(true)}
          ref={editButtonRef} />
                    
                  </IconButton>

                  <IconButton >
            <DeleteIcon onClick={ () => props.removeTodo( props.id ) } color="primary" />
                             
                  </IconButton>
                 
        </ListItemSecondaryAction>
        
      </ListItem>
      
      <div className={show ? "colorPicker" : "hiddenElement"}>
      <SketchPicker
       
        color={color}
        onChangeComplete={(color) => {
          setColor(color.hex);
        }}
      />
      </div>
          
        </List>

    
  );


  useEffect(() => {
    if (!wasEditing && isEditing) {
      editFieldRef.current.focus();
    }
    if (wasEditing && !isEditing) {
      editButtonRef.current.focus();
    }
  }, [wasEditing, isEditing]);


  return <li className="todo">{isEditing ? editingTemplate : viewTemplate}</li>;
}
