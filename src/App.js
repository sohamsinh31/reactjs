import React,{ useState} from 'react';
import './App.css';
import Post from './Post';
import { useEffect } from 'react';
import 'firebase/firestore';
import { getAuth,signOut, onAuthStateChanged , createUserWithEmailAndPassword,updateProfile, signInWithEmailAndPassword } from "firebase/auth";
import {db ,rdb,storage} from './firebase';
import { collection, doc, getDocs, setDoc } from "firebase/firestore"; 
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { Input } from '@mui/material';
import Imageuplpad from './Imageuplpad';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Routes
} from 'react-router-dom';
const App = () => {
  const [posts,setPosts] = useState([]);
useEffect(()=>{
const colref = collection(db,'photos');
getDocs(colref).then(snapshot=>{
  setPosts(snapshot.docs.map(doc =>(
    {
      id:doc.id,
      post:doc.data()
    }
  )))
})
},[]);
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
const auth = getAuth();
const [open, setOpen] = React.useState(false);
const handleOpen = () => setOpen(true);
const handleClose = () => setOpen(false);
const [username, setUsername] = useState('');
const [password, setPassword] = useState('');
const [email,setEmail] = useState('');
const [user, setUser] = useState(null);
const [opensignin, setopensignin] = useState(false);
const [useremail, setuseremail] = useState(null);
const [displayusername, setdisplayusername] = useState(null);
//const user2 = auth.currentUser.displayName;
useEffect(()=>{
  // const user2 = auth.currentUser.displayName;
  onAuthStateChanged(auth, (authUser)=>{
    
    if(authUser){
      //user has logged in
      setUser(authUser);
      setdisplayusername(authUser.displayName);
      setuseremail(authUser.email);
    }
    else {
      setUser(null);
      console.log("signed out");
    }
  })
},[user,displayusername]);
const signUp = (event) =>{
  event.preventDefault();
  createUserWithEmailAndPassword(auth, email, password)
    .then((authUser) => {
      // Signed in 
      console.log("signed in");
      console.log(authUser);
       updateProfile(auth.currentUser,{
          displayName:username
        })
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(error.message)
      // ..
    });
}
// const signOut = ()=>{
//   signOut(auth).then(() => {
//     // Sign-out successful.
//   }).catch((error) => {
//     // An error happened.
//   });
// }
const signIn = (event) =>{
  event.preventDefault();
  signInWithEmailAndPassword(auth, email, password)
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(error.message)
  });
  setopensignin(false)
}
  return (
    <div className="app">
    <div className="app_header">
      <h4>VMEET</h4>
      {user?(
            <Button onClick={()=>signOut(auth)}>Signout</Button>
          
          ):
          (
            <div className="app_login">
            <Button onClick={()=>setopensignin(true)}>Login</Button>
            <Button onClick={handleOpen}>SignUp</Button>
            </div>
          )
}
    </div>
    {displayusername?(
    <Imageuplpad email={useremail} username={displayusername} />
    ):(
      <h3>sorry you need to login</h3>
    )
}
            <div>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <form className='app_signup'>
              <h4 style={{
                textAlign:'center'
                }}>VMEET</h4>
<Input
type="text"
placeholder='username'
value={username}
onChange={(e)=>setUsername(e.target.value)}
/>
<Input
type="email"
placeholder='email'
value={email}
onChange={(e)=>setEmail(e.target.value)}
/>
<Input
type="password"
placeholder='password'
value={password}
onChange={(e)=>setPassword(e.target.value)}
/>
<Button type="submit" onClick={signUp}>Signup</Button>
</form>
            </Box>
          </Modal>
          <Modal
            open={opensignin}
            onClose={()=>setopensignin(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <form className='app_signup'>
              <h4 style={{
                textAlign:'center'
                }}>VMEET</h4>
<Input
type="email"
placeholder='email'
value={email}
onChange={(e)=>setEmail(e.target.value)}
/>
<Input
type="password"
placeholder='password'
value={password}
onChange={(e)=>setPassword(e.target.value)}
/>
<Button type="submit" onClick={signUp}>Login</Button>
</form>
            </Box>
          </Modal>

        </div>
    {
      posts.map(({post,id}) =>(
        <Post key={id} postId={id} email={useremail} username={post.username} caption = {post.caption} timestamp={post.timestamp} imageurl={post.imageurl}/>
      ))
    }
{/* <Post  username="son41" caption="hi there" imageurl={vplex} /> */}

    </div>
)
}
function About(){
  return <h1>hi</h1>
}
export default App;