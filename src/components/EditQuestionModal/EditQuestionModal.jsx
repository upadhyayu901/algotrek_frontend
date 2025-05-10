import React, {useState, useEffect} from 'react'
import "../EditQuestionModal/EditQuestionModal.css";

const EditQuestionModal = ({isOpen, onClose, question, onSave}) => {
    const [form, setForm] = useState({
        title: "",
        topic: "",
        difficulty: "",
        status: "unsolved",
    });
    

    useEffect(()=>{
        if(question){
            setForm({
               title: question.title,
               topic: question.topic,
               difficulty: question.difficulty,
               status: question.status,
            });
        }
    }, [question]);

    const handleChange = (e) =>{
        setForm({...form, [e.target.name]: e.target.value});
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        console.log("Submitting edited form:", form);
        
        onSave({...form, _id: question._id});
    };

    if(!isOpen) return null;
  return (
   <>
   <div className="modal-backdrop">
    <div className="modal">
        <h2>Edit Questions</h2>
          
            <input name='title' value={form.title} onChange={handleChange} required />
            <input name='topic' value={form.topic} onChange={handleChange} required/>
            <select name="difficulty" value={form.difficulty} onChange={handleChange}>
                <option>Easy</option>
                <option>Medium</option>
                <option>Hard</option>
            </select>


            <select name="status" value={form.status} onChange={handleChange}>
                <option value="solved">Solved</option>
                <option value="unsolved">Unsolved</option>
            </select>

            <div className="modal-actions">
                <button className='save-btn' onClick={() => {
                    console.log("Submitting edited form:", form);
                    onSave({...form, _id:question._id})
                }}>Save</button>
                <button type='button' onClick={onClose} className='cancel-btn'>
                    Cancel
                </button>
               
            </div>
        
    </div>
   </div>
   </>
  )
}

export default EditQuestionModal
