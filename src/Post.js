import React,{useEffect, useState} from 'react';
import vplex from './images/vplex.png';
import './Post.css';
import { Avatar } from '@mui/material';
import {db ,rdb,storage} from './firebase';
import Userpro from './Userpro';
import App from './App';
import {  query, addDoc ,collection, doc, getDocs,child, setDoc ,forEach} from "firebase/firestore"; 

function userpro(email){
  console.log(email)
  return (
    <div>
      hi
    </div>
      )
}

function Post({username,displayname,postId, caption,email, imageurl,timestamp}) {
  const [comment, setcomment] = useState('');
  const [comments, setcomments] = useState([]);
  useEffect(()=>{
    let unsuscribe;
     // let colref= collection(db, "photos", "comments"),postId)
   const q= query(collection(db, "photos",`${postId}` ,"comments"))
   getDocs(q).then((snapshot)=>{
        setcomments((snapshot.docs.map(doc=>({
          post:doc.data()
        }))))
      })
  return unsuscribe;
  
},[comments]);
const postcomment =(event)=>{
  event.preventDefault();
  const currentDate = new Date();

  const currentDayOfMonth = currentDate.getDate();
  const currentMonth = currentDate.getMonth(); // Be careful! January is 0, not 1
  const currentYear = currentDate.getFullYear();
  
  const timestamp = currentDayOfMonth + "-" + (currentMonth + 1) + "-" + currentYear;

  addDoc(collection(db, "photos",`${postId}` ,"comments"),{
    text:comment,
    username:displayname,
    timestamp: timestamp
  })
  setcomment('');
}
  return (
    <div className ="post">
      <div className = "post_header" onClick={()=>userpro(email)}>
          <Avatar
            className="post_avatar"
            alt = 'RafehQazi'
            src = {vplex}
            />
            <h3>{username}</h3>
      </div>
            <img src={imageurl} className="post_image" />
            <h4 className="post_test">{caption}</h4><h6 className="time">{timestamp}</h6>
            
    {
      <div className="post_comments">
        {comments.map(({post})=>(
          <p>
            <strong style={{color:'white',fontSize:'bold',marginRight:'5px'}}>{post.username}</strong>{post.text}
          </p>
        ))}
      </div>
    }
    <form className='post_comment'>
      <input
      className='post_input'
      type='text'
      placeholder="Add a comment.."
      value={comment}
      onChange={(e)=>setcomment(e.target.value)}
      />
      <button
      className='post_button'
      disabled={!comment}
      type='submit'
      onClick={postcomment}
      >Post</button>
    </form>
    </div>
  )
}
export default Post;