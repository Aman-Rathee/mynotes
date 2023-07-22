import React, {useContext, useState} from 'react'
import noteContext from '../context/notes/noteContext';

const AddNote = () => {
    const context = useContext(noteContext);
    const { addNote, showAlert } = context;
    
    const [note, setnote] = useState({title: "", description:"", tags:""})

    const onChange = (e)=>{
        setnote({...note, [e.target.name]: e.target.value})
    }
    const handelClick = (e)=>{
        e.preventDefault();
        addNote(note.title, note.description, note.tags);
        setnote({title: "", description:"", tags:""})
        showAlert("Note is added successfully", "success");
    }


  return (
    <div className='container my-4 ' >
    <h2>Add a Note</h2>
    <form onSubmit={handelClick} >
      <div className="mb-3">
        <label htmlFor="title" className="form-label">Title</label>
        <input type="text" className="form-control" id="title" name='title' aria-describedby="emailHelp" onChange={onChange} value={note.title} minLength={3} required />
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">Description</label>
        <input type="text" className="form-control" id="description" name='description' onChange={onChange} value={note.description} minLength={5} required />
      </div>
      <div className="mb-3">
        <label htmlFor="tags" className="form-label">Tags</label>
        <input type="text" className="form-control" id="tags" name='tags' onChange={onChange} value={note.tags} />
      </div>
      <button disabled={note.title.length<3 || note.description.length<5} type="submit" className="btn btn-primary"  >Add Note</button>
    </form>
  </div>
  )
}

export default AddNote
