import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate,Link } from 'react-router-dom';

export const Signup = () => {
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
          const user= await axios.post('http://localhost:3000/user/signup', {username: email, password: password});
          alert('User Signedup in successfully');
          navigate('/login')
        }catch(err){
          console.log(err);
        }

      }} >Register</button>

</div>

      <div style={{marginTop:20, marginLeft:200}}>Already registered? <Link to= '/login'>Login</Link> to continue</div> 
    </div>
  )
}
