import React from 'react'
import { useState } from 'react'
import api from "../../utils/api";
import "../AddQuestionForm/AddQuestionForm.css";
const AddQuestionForm = ({onAdd}) => {
const [form, setForm] = useState({
    title: "",
    topic: "",
    difficulty: "Easy",
    status: "solved"
});

const handleChange = (e) =>{
    setForm({...form, [e.target.name]: e.target.value});
};

const handleSubmit = async (e) =>{
    e.preventDefault();

    const token = localStorage.getItem("algotrek_token");
    try {
        console.log("TOKEN BEING SENT:", token);
        
        await api.post("/questions", form, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        alert("Question added!");
        setForm({
            title: "",
            topic: "",
            difficulty: "Easy",
            status: "unsolved"
        });

        if(onAdd) onAdd();
    } catch (err) {
        console.error("Add failed:", err);
        alert("Failed to add question");
        
    }
};


  return (
    <>
    <form onSubmit={handleSubmit} className='add-question-form'>
        <input name='title' placeholder='Title' value={form.title} onChange={handleChange} required />
        <input name='topic' placeholder='Topic' value={form.topic} onChange={handleChange} required />

        <select name="difficulty" value={form.difficulty} onChange={handleChange}>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
        </select>

        <select name="status" value={form.status} onChange={handleChange}>
            <option value="unsolved">Unsolved</option>
            <option value="solved">Solved</option>
        </select>

        <button type='submit'>Add Question</button>
    </form>
    </>
  );
};

export default AddQuestionForm
