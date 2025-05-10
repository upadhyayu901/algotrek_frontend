import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "../utils/api";
import "./Register.css";
import Navbar from "../components/Navbar/Navbar";

const Register = () => {
  const [email, setEmail] = useState("");
  const[password, setPassword] = useState("");
  const[errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) =>{
    e.preventDefault();
    setErrorMsg("");

    try {
      const res = await axios.post("/auth/register", {
        email,
        password
      });
      
      alert("Registration successful!");
      navigate("/login")
      
    } catch (err) {
      const msg = err.response?.data?.message || "Something went wrong";
      setErrorMsg(msg);
    }
  };
  return (
   <>
   <Navbar/>
   <div className="register-container">
    <h2 className='register-title'>Register for <span className='brand'>AlgoTrek</span></h2>
    <form className='registration-form' onSubmit={handleSubmit}>
      <input 
      type="email" 
      placeholder='Email' 
      value={email} 
      required  
      onChange={(e) => setEmail(e.target.value)}
      />

      <input type="password" placeholder='Password' value={password} required  onChange={(e) => setPassword(e.target.value)}/>

      <button className='create-acc-btn' type='submit'>Create Account</button>
      {errorMsg && <p className='error'>{errorMsg}</p>}

    </form>
   </div>
 </>
  )
}

export default Register;
