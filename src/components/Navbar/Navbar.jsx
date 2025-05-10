import React from 'react'
import { Link } from 'react-router-dom'
import "./Navbar.css"
import logo from "../../../public/AlgoTrekImage.png";
import { useNavigate } from 'react-router-dom';
import {toast} from "react-toastify";



const Navbar = () => {
  // const navigate = useNavigate();

  // const goToRegisterPage = () =>{
  //   navigate("/register");
  // }
  const navigate = useNavigate();
  const token = localStorage.getItem("algotrek_token");
  const isLoggedIn = !!token;

  const scrollIntoSection = (elementRef) =>{
    elementRef.current?.scrollIntoView({behavior: 'smooth'});
  };

  const handleLogout = () =>{
    localStorage.removeItem("algotrek_token");
    localStorage.removeItem("algotrek_email");
    toast.success("Logout successful!");
    navigate("/login");
  }

  const LoggedInNavbar = () =>{
    const summarySection = useRef(null);
    const questionTableSection = useRef(null);
    const statsSection = useRef(null);
  }
  return (
    <>
    <nav className="navbar">
        <div className="navbar-logo">
            <Link to="/"><img src={logo} alt="algo trek logo" /></Link>
           
            <Link to="/">AlgoTrek</Link>
        </div>
        <div className="navbar-links">
          {isLoggedIn ? (
            <>
            {/* <Link to="/">Home</Link> */}
            <Link to="/dashboard">Dashboard</Link>
            <a href="#summary">Summary</a>
             <a href="#questionTable">Questions</a>
             <a href="#stats">Statistics</a>
            <button className='logout-btn' onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/login">Login</Link>
            <Link to="/register">Get Started</Link>
            </>
          )}
            
        </div>
    </nav>
    </>
  );
}

export default Navbar;
