import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
  textField: {
    width: 400,
    [theme.breakpoints.down("xs")]: {
      width: 200,
    },
  },
}));


function Form ( props )
{
  const classes = useStyles();
  const [name, setName] = useState('');


  function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim()) {
      return;
    }
    props.addTodo(name);
    setName("");
  }


  function handleChange(e) {
    setName(e.target.value);
  }

  return (
    

     <>
    
      <Grid container className="todo-input">
        <Grid item>
          <TextField
            className={classes.textField}
            label="What is your plan today?"
            variant="outlined"
            size="small"
           value={name}
        onChange={handleChange}
          />
        </Grid>
        <Grid item>
          <Box pl={1}>
            <Button
              className="todo-add-btn"
              disabled={name.length === 0}
              variant="contained"
              color="primary"
              onClick={handleSubmit}
            >
              Add
            </Button>
          </Box>
        </Grid>
        </Grid>
      
        </>
    


    
    
  );
}

export default Form;
