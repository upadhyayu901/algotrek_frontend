import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Dashboard from "./Pages/Dashboard";
import Home from './Pages/Home';
import { ToastContainer } from "react-toastify";

function App() {
  
  return (
    <>
     <Router>
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/" element={<Home/>}/>
      </Routes>
     </Router>
     <ToastContainer position="top-right" autoclose={1000}/>
     </>
  );
}

export default App;
