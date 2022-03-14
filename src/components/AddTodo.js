import React from 'react'
import { useState } from 'react'

const AddTodo = ({addTodo}) => {
  const [title, settitle] = useState("");
  const [desc, setdesc] = useState("");
  const submit = (e) =>{
    e.preventDefault();
    if(title || desc){
      alert("Title or description cannot be blank");
    }
    addTodo(title, desc);
  }
  return (
    <div className='container my-3'>
        <h3>Add a todo</h3>
        <form onSubmit={submit}>
  <div className="mb-3">
    <label htmlFor="title" className="form-label">TODO TITLE address</label>
    <input type="text" value={title} onChange={(e)=>{settitle(e.target.value)}} className="form-control" id="title" aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3">
    <label htmlFor="desc" className="form-label">TODO description</label>
    <input type="text" value={desc} onChange={(e)=>{setdesc(e.target.value)}} className="form-control" id="desc"/>
  </div>
  <button type="submit"  className="btn btn-sm btn-primary">Add todo</button>
</form>
    </div>
  )
}

export default AddTodo