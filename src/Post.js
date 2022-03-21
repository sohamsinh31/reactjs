import React,{useEffect, useState} from 'react'
import vplex from './images/vplex.png'
import './Post.css'
import firebase from 'firebase/compat/app'
import 'firebase/firestore';
import { Avatar } from '@mui/material';
import {Route,Link,BrowserRouter} from 'react-router-dom'
import {db ,rdb,storage} from './firebase';
import { collectionGroup, query, where ,collection, doc, getDocs,child, setDoc } from "firebase/firestore"; 

function Post({username,postId, caption, imageurl,timestamp}) {
  const [comment, setcomment] = useState('');
  const [comments, setcomments] = useState([]);
  useEffect(()=>{
    let unsuscribe;
    if(postId){
     // let colref= collection(db, "photos", "comments"),postId)
      getDocs(collection(db, "photos",`${postId}` ,"comments")).then((snapshot)=>{
        setcomments((snapshot.docs.map(doc=>({
          post:doc.data()
        }))))
      });
  }
  else{
    console.log("no post id")
  }
  return unsuscribe;
  
},[]);
const postcomment =(event)=>{

}
  return (
    <div className ="post">
      <div className = "post_header">
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
        {comments.map(({post})=>{
          <p>
            <strong>{post.username}</strong><b>{post.text}</b>
          </p>
        })}
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