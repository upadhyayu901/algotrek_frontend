// import React, { useEffect, useState } from "react";
// import Navbar from "../components/Navbar/Navbar";
// import api from "../utils/api";
// import "./Dashboard.css";
// import AddQuestionForm from "../components/AddQuestionForm/AddQuestionForm";
// import QuestionTable from "../components/QuestionTable/QuestionTable";

// const Dashboard = () => {
//   const [solvedCount, setSolvedCount] = useState(0);
//   const [weakAreas, setWeakAreas] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [totalQuestions, setTotalQuestions] = useState(0);
  
//   useEffect(() => {
//     const token = localStorage.getItem("algotrek_token");
//     console.log("Token in useEffect:", token);
    

//     if (!token) return;

//     const headers = { Authorization: `Bearer ${token}` };

//     Promise.all([
//       api.get("/questions/summary", { headers }),
//       api.get("/questions/total", { headers }),
//     ])
//       .then(([summaryRes, totalRes]) => {
//         setSolvedCount(summaryRes.data.totalSolved);
//         setWeakAreas(summaryRes.data.weakTopics);
//         setTotalQuestions(totalRes.data.totalQuestions);
//         setLoading(false); // ✅ turn off loading only after both return
//       })
//       .catch((err) => {
//         console.error("Dashboard fetch failed:", err);
//         setLoading(false); // still unset loading to prevent UI freeze
//       });
//   }, []);

//   return (
//     <>
//       <Navbar />
//       <div className="dashboard-container">
//         <h1 className="dashboard-heading">
//           Welcome back, <span className="username">User!</span>
//         </h1>
//         <AddQuestionForm onAdd={()=> window.location.reload()}/>
         
//         <div className="dashboard-summary">
//           <div className="card solved">
//             <h2>Solved</h2>
//             <p>{loading ? "..." : solvedCount}</p>
//           </div>
//           <div className="card unsolved">
//             <h2>Unsolved</h2>
//             <p>{loading ? "..." :  totalQuestions - solvedCount}</p>
//           </div>
//           <div className="card weak">
//             <h2>Weak Areas</h2>
//             <p>{loading ? "..." : (weakAreas.length ? weakAreas.join(", ") : "None")}</p>
//           </div>
//         </div>
//         <QuestionTable/>
//       </div>
//     </>
//   );
// };

// export default Dashboard;



import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import api from "../utils/api";
import "./Dashboard.css";
import AddQuestionForm from "../components/AddQuestionForm/AddQuestionForm";
import QuestionTable from "../components/QuestionTable/QuestionTable";
import ChartDashboard from "../components/ChartDashboard/ChartDashboard";
import { useRef } from "react";

const Dashboard = () => {
  const [solvedCount, setSolvedCount] = useState(0);
  const [weakAreas, setWeakAreas] = useState([]);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [loading, setLoading] = useState(true);
  const email = localStorage.getItem("algotrek_email");
  const username = email ? email.split("@")[0] : "User";
  const summarySection = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("algotrek_token");
    if (!token) return;

    const headers = { Authorization: `Bearer ${token}` }

    console.log("🔍 Token in useEffect:", token);

  if (!token) {
    console.warn("⚠️ No token found. Skipping summary fetch.");
    return;
  }

  api
    .get("/questions/summary", {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => {
      // console.log("✅ Summary data:", res.data);
      setSolvedCount(res.data.totalSolved);
      setWeakAreas(res.data.weakTopics);
      setLoading(false);
    })
    .catch((err) => {
      console.error("❌ Dashboard fetch failed:", err);
      setLoading(false);
    });

    api.get("/questions/total", {
      headers: {Authorization: `Bearer ${token}`}
    })
    .then((res)=> {
      setTotalQuestions(res.data.totalQuestions);
      setLoading(false);
    })
    .catch((res)=>{
      console.error("Failed fetching total questions");
      setLoading(false);
      
    })

}, [])

const refetchSummary = async () =>{
  const token = localStorage.getItem("algotrek_token");
   
  const res = await api.get("/questions/summary", {
    headers: {Authorization: `Bearer ${token}`},
  });

  setSolvedCount(res.data.totalSolved);
  setWeakAreas(res.data.weakTopics);

}

  return (
    <>
      <Navbar />
      <div className="dashboard-container">
        <h1 className="dashboard-heading">
          Welcome back, <span className="username">{username}</span>
        </h1>
        <div className="add-q">
        <h2 className="add-q-title">Add a new question</h2>
        <AddQuestionForm onAdd={() => window.location.reload()} />
        </div>
        

        <div className="dashboard-summary" id="summary">
          <div className="card solved">
            <h2>Solved</h2>
            <p>{loading ? "..." : solvedCount}</p>
          </div>
          <div className="card unsolved">
            <h2>Unsolved</h2>
            <p>{loading ? "..." : totalQuestions - solvedCount}</p>
          </div>
          <div className="card weak">
            <h2>Weak Areas</h2>
            <p>{loading ? "..." : weakAreas.length ? weakAreas.join(", ") : "None"}</p>
          </div>
        </div>
        
        <QuestionTable onQuestionUpdated = {refetchSummary} id="questionTable"/>
        
        
        <ChartDashboard id="stats"/>

        
      </div>
    </>
  );
};

export default Dashboard;
