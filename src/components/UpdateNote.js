import React, { useContext, useState, useEffect, useRef } from 'react'
import noteContext from '../context/notes/noteContext';
import Noteitem from './Noteitem';
import { useNavigate } from 'react-router-dom';

const Notes = () => {
    let navigation = useNavigate();
    const context = useContext(noteContext);
    const { notes, getNotes, editNote, showAlert } = context
    const ref = useRef(null)
    const refClose = useRef(null)
    const [note, setnote] = useState({ id: "", edittitle: "", editdescription: "", edittags: "" })

    useEffect(() => {
        if (localStorage.getItem('token')) {
            getNotes();
        }
        else {
            navigation('/login')
        }
        // eslint-disable-next-line
    }, [])

    const updateNote = (currentNote) => {
        ref.current.click();
        setnote({ id: currentNote._id, edittitle: currentNote.title, editdescription: currentNote.description, edittags: currentNote.tags })

    }

    const onChange = (e) => {
        setnote({ ...note, [e.target.name]: e.target.value })

    }
    const handelClick = (e) => {
        editNote(note.id, note.edittitle, note.editdescription, note.edittags)
        refClose.current.click()
        e.preventDefault()
        showAlert("Note is updated successfully", "success");
    }



    return (
        <>
            {/* Button trigger modal  */}
            <button type="button" className="btn btn-primary d-none" ref={ref} data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            {/* Modal  */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form  >
                                <div className="mb-3">
                                    <label htmlFor="edittitle" className="form-label">Title</label>
                                    <input type="text" className="form-control" value={note.edittitle} id="edittitle" name='edittitle' aria-describedby="emailHelp" onChange={onChange} minLength={3} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="editdescription" className="form-label">Description</label>
                                    <input type="text" className="form-control" value={note.editdescription} id="editdescription" name='editdescription' onChange={onChange} minLength={5} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edittags" className="form-label">Tags</label>
                                    <input type="text" className="form-control" value={note.edittags} id="edittags" name='edittags' onChange={onChange} />
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={refClose} >Close</button>
                                    <button disabled={note.edittitle.length < 3 || note.editdescription.length < 5} type="submit" className="btn btn-primary" onClick={handelClick} >Update Note</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row my-3' >
                <h2>Your Note</h2>
                <div className="container m-2">
                    {notes.length === 0 && "No Note to display"}
                </div>
                {notes.map((note) => {
                    return <Noteitem key={note._id} updateNote={updateNote} note={note} />
                })}
            </div>
        </>
    )
}

export default Notes
