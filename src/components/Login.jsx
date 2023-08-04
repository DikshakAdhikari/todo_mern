import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate,Link } from 'react-router-dom';


export const Login = () => {
  const [email, setEmail]= useState("");
  const [password, setPassword]= useState("");
  const navigate= useNavigate();
  return (
    <div>
    <div style={{display:"flex", marginLeft:200,marginTop:200, gap:30}}>
     
        <div style={{display:"flex"}}>
        <div>Email</div>
        <input type="email" onChange={(e)=> setEmail(e.target.value)} />
      </div>
      <div style={{display:"flex"}}>
        <div>Password</div>
        <input type="password" onChange={(e)=> setPassword(e.target.value)} />
      </div>
      <button onClick={async()=> {
        try{
          const user= await axios.post('http://localhost:3000/user/login', {username: email, password: password});
          //console.log(user);
          localStorage.setItem('token',user.data.token);
          alert('User Logged in successfully');
          navigate('/todos')
        }catch(err){
          console.log(err);
        }

      }} >Signin</button>

</div>

      <div style={{marginTop:20, marginLeft:200}}>New Here? <Link to= '/signup'>Signup</Link> to register first!</div> 
    </div>
  )
}
