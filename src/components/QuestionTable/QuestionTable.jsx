// import React, {useState, useEffect} from 'react';
// import api from "../../utils/api";
// import "../QuestionTable/QuestionTable.css";

// const QuestionTable = () => {
//     const [questions, setQuestions] = useState([]);
//     const [filtered, setFiltered] = useState([]);
//     const [topicFilter, setTopicFilter] = useState("");
//     const [difficultyFilter, setDifficultyFilter] = useState("");

//     useEffect(()=>{
//         const fetchQuestions = async () =>{
//             const token = localStorage.getItem("algotrek_token");

//             try {
//                 const res = await api.get("/questions/solved", {
//                     headers: {Authorization: `Bearer ${token}`},
//                 });

//                 setQuestions(res.data);
//                 setFiltered(res.data);
                
//             } catch (err) {
//                 console.error("Failed to fetch questions:", err);
                
//             }
//         };

//         fetchQuestions();
//     }, []);

//     useEffect(()=>{
//         let result = questions;

//         if(topicFilter){
//             result = result.filter(q=>q.topic.toLowerCase().includes(topicFilter.toLowerCase()));
//         }

//         if(difficultyFilter){
//             result = result.filter(q=> q.difficulty === difficultyFilter);
//         }

//         setFiltered(result);
//     }, [topicFilter, difficultyFilter, questions]);
//   return (
//     <>
//     <div className="question-table-container">
//         <div className="filters">
//             <input
//              type="text" 

//             placeholder='Filter by topic'
            
//             value={topicFilter}

//             onChange={(e) => setTopicFilter(e.target.value)}
//             />

//             <select value={difficultyFilter} onChange={(e) =>setDifficultyFilter(e.target.value)}>
//                 <option value="">All difficulties</option>
//                 <option value="Easy">Easy</option>
//                 <option value="Medium">Medium</option>
//                 <option value="Hard">Hard</option>
//             </select>
//         </div>

//         <table className='question-table'>
//             <thead>
//                 <tr>
//                     <th>Title</th>
//                     <th>Topic</th>
//                     <th>Difficulty</th>
//                     <th>Status</th>
//                     <th>Date</th>
//                 </tr>
//             </thead>
//             <tbody>
//             {filtered.map((q) => (
//   <tr key={q._id}>
//     <td>{q.title}</td>
//     <td>{q.topic}</td>
//     <td>{q.difficulty}</td>
//     <td>{q.status}</td>
//     <td>{q.solvedAt ? new Date(q.solvedAt).toLocaleDateString() : "-"}</td>
//   </tr>
// ))}

//             </tbody>
//         </table>
//     </div>
//     </>
//   )
// }

// export default QuestionTable;



import React, { useEffect, useState } from "react";
import api from "../../utils/api";
import "./QuestionTable.css";
import EditQuestionModal from "../EditQuestionModal/EditQuestionModal";
import {toast} from "react-toastify";
// import { useRef } from "react";

const QuestionTable = ({onQuestionUpdated}) => {
  const [questions, setQuestions] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [topicFilter, setTopicFilter] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [editing, setEditing] = useState(null);

  // const questionTableSection = useRef(null);
  

  // const handleSaveEdit = (question) =>{
  //     alert(`Edit functionality to be implemented for ${question.title}`);
  // };

  const handleSaveEdit = async (updatedData) =>{
    const token = localStorage.getItem("algotrek_token");
     
    try {

      await api.put(`/questions/${updatedData._id}`, updatedData,{
        headers: {Authorization: `Bearer: ${token}`},
      });

      setQuestions((prev)=>
        prev.map((q) => (q._id === updatedData._id ? updatedData : q))
      );
      setEditing(null);
      toast.success("✅Question Updated!");
      if(onQuestionUpdated) onQuestionUpdated();
      
    } catch (err) {
      console.error("Update failed:", err);
      
    }
  }
  const handleDelete = async (id) =>{
    const confirm = window.confirm("Are you sure you want to delete this question?");
    if(!confirm) return;

    const token = localStorage.getItem("algotrek_token");
    try {
      await api.delete(`/questions/${id}`, {
        headers: {Authorization: `Bearer ${token}`},

      });
      setQuestions(questions.filter((q)=> q._id !== id));
      toast.info("🗑️ Question deleted");

    } catch (err) {
       console.error("Delete failed:", err);
             
    }
  }

  useEffect(() => {
    const fetchQuestions = async () => {
      const token = localStorage.getItem("algotrek_token");
      try {
        const res = await api.get("/questions", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setQuestions(res.data);
        console.log("Raw Question Data:", res.data);
        
        setFiltered(res.data);
      } catch (err) {
        console.error("Failed to fetch questions:", err);
      }
    };

    fetchQuestions();
  }, []);

  useEffect(() => {
    let result = questions;

    if (topicFilter) {
      result = result.filter((q) =>
        q.topic.toLowerCase().includes(topicFilter.toLowerCase())
      );
    }

    if (difficultyFilter) {
      result = result.filter((q) => q.difficulty === difficultyFilter);
    }

    if (statusFilter) {
      result = result.filter((q) => q.status === statusFilter);
    }

    setFiltered(result);
  }, [topicFilter, difficultyFilter, statusFilter, questions]);

  return (
    <>
    <div className="question-table-container" id="questionTable">
      <div className="filters">
        <input
          type="text"
          placeholder="Filter by topic"
          value={topicFilter}
          onChange={(e) => setTopicFilter(e.target.value)}
        />

        <select value={difficultyFilter} onChange={(e) => setDifficultyFilter(e.target.value)}>
          <option value="">All difficulties</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>

        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="">All statuses</option>
          <option value="solved">Solved</option>
          <option value="unsolved">Unsolved</option>
        </select>
      </div>

      <table className="question-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Topic</th>
            <th>Difficulty</th>
            <th>Status</th>
            <th>Solved At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.length === 0 ? (
            <tr>
              <td colSpan="5">No questions found.</td>
            </tr>
          ) : (
            filtered.map((q) => (
              <tr key={q._id}>
                <td>{q.title}</td>
                <td>{q.topic}</td>
                <td>{q.difficulty}</td>
                <td>{q.status}</td>
                <td>{q.solvedAt ? new Date(q.solvedAt).toLocaleDateString() : "-"}</td>
                <td>
                  <button className="action-btn edit" onClick={()=> setEditing(q)}>Edit</button>
                  
                  <button className="action-btn delete" onClick={()=> handleDelete(q._id)}>Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <EditQuestionModal
isOpen={!!editing}
onClose={() => setEditing(null)}
question={editing}
onSave={handleSaveEdit}
/>


    </div>
    </>
  );
};

export default QuestionTable;
