import React, { useEffect, useRef, useState } from "react";
import { makeStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";

import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';

import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

import { CirclePicker } from "react-color";
import PaletteIcon from '@material-ui/icons/Palette';

const useStyles = makeStyles( ( theme ) => ( {
  
 
   textField: {
    width: '100%',
    minWidth: '280px',
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
  const labelUpdate = "Do you like to update " + props.name.substr( 0, 10 ) + "...?";
 

  const [ show, setShow ] = useState( false );
  
  const initialColor = () => String(window.localStorage.getItem('color') || '#ffd803');
 
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
              color="secondary"
              onClick={handleSubmit}

            >
            
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
 
  );

  const viewTemplate = (
 
            
    <Card
       className="todo-card"
      style={{
  
        backgroundColor: color,
        
      }}
          
      key={ props.id }
        
    >
          <CardContent
            
          style={ {
          
          textAlign: 'center',
          padding: '1rem',
          margin: '1rem',
        
          
        }}
          
          >
        <Typography className={ props.completed ? 'complete' : '' } style={{color: 'black'}} gutterBottom>
           <h4>{ props.name } </h4> 
        </Typography>
       
       
      </CardContent>
      <CardActions
            
          style={ {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
           width: '280px',
          backgroundColor: "#fde24f" ,
          borderRadius: "20px",
          height: '50px',
               
          padding: '1rem 0',
          margin: '1rem 0',
       
        }}
   
          >
       
              <Tooltip title="showColor/unShowColor" placement="top">
                   <IconButton size="medium" style={{ color: 'purple' }}
                    ><PaletteIcon onClick={() => 
                  setShow( !show ) } /></IconButton>
            </Tooltip>
            
             <Tooltip title="completed/uncompleted" placement="top">
          
                  <Checkbox style={{ color: 'black' }}
                    checked={ props.completed }
                    onClick={() => props.toggleTaskCompleted(props.id)}
                   
              />
              </Tooltip>

             <Tooltip title="edit" placement="top">
                   <IconButton style={{color: 'teal'}} >
                  
                   <EditIcon onClick={() => setEditing(true)}
                  ref={editButtonRef} />
                    
              </IconButton>
              
            </Tooltip>
            
             <Tooltip title="delete" placement="top">

                  <IconButton style={{color: 'red'}}>
                  <DeleteIcon onClick={ () => props.removeTodo( props.id ) } />
                             
            </IconButton>
            
            </Tooltip>
                 
      

        </CardActions>
            
               
      <div className={show ? "colorPicker" : "hiddenElement"}>
      <CirclePicker
       
        color={color}
        onChangeComplete={(color) => {
          setColor(color.hex);
        }}
      />
      </div>
      </Card>
     
 
        
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
