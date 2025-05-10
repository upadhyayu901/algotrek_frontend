import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "../utils/api";
import Navbar from '../components/Navbar/Navbar';
import "./Login.css";
import {toast} from "react-toastify";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) =>{
    e.preventDefault();
    setErrorMsg("");

    try {
     const res = await axios.post("/auth/login", {
       email,
       password
     });
      const token = res.data.token;
      localStorage.setItem("algotrek_token", token);
      localStorage.setItem("algotrek_email", email);
     toast.success("Login Successful!");
     navigate("/");
    
    } catch (err) {
      const msg = err.response?.data?.message || "Invalid Credentials!";
      setErrorMsg(msg);
    }
  }
 
 
  return (
    <>
    <Navbar/>

    <div className="login-container">
     <h2 className='login-title'>Welcome back to <span className='brand'>AlgoTrek</span></h2>
     <form className='login-form' onSubmit={handleSubmit}>
      <input type="email" placeholder='Email' value={email} require onChange={(e) => setEmail(e.target.value)}/>
      <input type="password" placeholder='Password' value={password} require onChange={(e) => setPassword(e.target.value)} />

      <button type='submit' className='login-btn'>Login</button>
      {errorMsg && <p className='error'>{errorMsg}</p>}
     </form>
    </div>
    </>
  )
}

export default Login;
