import React, { useContext, createContext } from "react";
import useLocalStorage from "../../hooks/useLocalStorage";
import { nanoid } from "nanoid";

const Context = createContext({
  todos: []
  
});

const Provider = (props) => {
  const { children } = props;
  const [todos, setTodos] = useLocalStorage("todos", [
    {
      id: nanoid(),
      text: "task 1",
      completed: false,
      
    },
    {
      id: nanoid(),
      text: "task 2",
      completed: false,
      
    },
    {
      id: nanoid(),
      text: "task 3",
      completed: false,
      
     
    },
  ] );

  
  const addTodo = (todo) => {
   
    const newTodo = {
      id: nanoid(),
      text: todo,
      completed: false,
     
    };
    setTodos([...todos, newTodo]);
  };
  
  const removeTodo = (id) => {
    const newTodos = todos.filter((t) => t.id !== id);
    setTodos(newTodos);
  };

  const updateTodo = ( editId, newTodo ) =>
  {
    
    const editTodo = todos.map( todo =>
    {
      if ( editId === todo.id )
      {
         return{...todo, text: newTodo }
      }
      return todo;
     })
    setTodos( editTodo );
   
  };



  const toggleTodo = (id) => {
    const foundTodo = todos.find((t) => t.id === id);
    if (foundTodo) {
      foundTodo.completed = !foundTodo.completed;
    }
    const newTodos = todos.map((t) => {
      if (t.id === id) {
        return foundTodo;
      }
      return t;
    });
    setTodos(newTodos);
  };

  return (
    <Context.Provider value={{ todos, addTodo, removeTodo, toggleTodo, updateTodo }}>
      {children}
    </Context.Provider>
  );
};

export const useTodos = () => useContext(Context);

export const withProvider = (Component) => {
  return (props) => {
    return (
      <Provider>
        <Component {...props} />
      </Provider>
    );
  };
};
