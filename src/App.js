//import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Todos from './components/Todos';
//import {TodoItem} from './components/TodoItem';
import React, { useState,useEffect } from 'react';
import AddTodo from './components/AddTodo';

function App() {
  let initTodo;
  if(localStorage.getItem("todos")===null){
    initTodo = [];
  }
  else{
    initTodo = JSON.parse(localStorage.getItem("todos"));
  }
  const[todos, setTodos] = useState([initTodo]);
  const addTodo = (title,desc)=>{
    let sno;
    console.log("i am adding todo",title,desc);
    if(todos.length===0){
      sno=0;
    }
    else{
     sno = todos[todos.length-1].sno+1; 
    }
    const myTodo = {
      sno: sno,
      title: title,
      desc: desc,
    }
    setTodos([...todos,myTodo]);
    console.log(myTodo);
    
  //   if(localStorage.getItem("todos")){
  //     localStorage.setItem("todos",JSON.stringify(todos));
  // }
}
useEffect(() => {
  localStorage.setItem("todos",JSON.stringify(todos));
  }, [todos])
  const onDelete = (todo)=>{
    console.log("I am on delete of todo",todo);
    setTodos(todos.filter((e)=>{
      return e!==todo;
    }));
    localStorage.setItem("todos",JSON.stringify(todos));
  }
  return (
<>
<Header/>
<AddTodo addTodo={addTodo} />
<Todos todos={todos} onDelete={onDelete} />
<Footer/>
</>
  );
}

export default App;
