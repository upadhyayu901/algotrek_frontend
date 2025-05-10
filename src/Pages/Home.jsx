import { useNavigate } from "react-router-dom";
import "./Home.css";
// import logo from "../../public/AlgoTrekImage.png";
import Navbar from "../components/Navbar/Navbar.jsx";
function Home() {
    const navigate = useNavigate();
    const token = localStorage.getItem("algotrek_token");
    const isLoggedIn = !!token;
    const email = localStorage.getItem("algotrek_email");
    const username = email?.split("@")[0];
    
    return (
        <>
        <Navbar/>
        <div className="home-container">
               <div className="home-header">
               <h1 className="home-title">{isLoggedIn ?
               (
                <>
                Welcome back, <span className="brand">{username}</span>
                </>
               ) :(
                "AlgoTrek"
               )
               }
               </h1>
               {/* <img src={logo} alt="algotrek logo" /> */}
               </div>
               {isLoggedIn ? (
                <>
                 <p className="home-subtitle">Ready to tackle your next DSA challenge?</p>
                 <button onClick={()=> navigate("/dashboard") } className="go-to-dash-btn">Go to Dashboard</button></>
               
               ): (
               <>
                <p className="home-subtitle">
                The only DSA partner you need to crack FAANG.
            </p>
     <div className="home-buttons">
        <button onClick={()=> navigate('/register')}>Get Started</button>
        <button onClick={()=> navigate('/login')}>Login</button>
     </div>
               </>
               )}
            
        </div>

        </>
    );
}

export default Home;
