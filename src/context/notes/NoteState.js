import { useState } from "react";
import NoteContext from "./noteContext";


const NoteState = (props) => {
  const host = process.env.REACT_APP_API_HOST

  const notesInitial = [

  ]

  const [notes, setNotes] = useState(notesInitial);


  // Get all Note
  const getNotes = async () => {
    // API Call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "Get",
      headers: {
        "auth-token": localStorage.getItem('token')
      },
    });
    const json = await response.json()
    setNotes(json)
  }


  // Add a Note
  const addNote = async (title, description, tags) => {
    // API Call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tags }),
    });
    const note = await response.json()

    // Logic to add a note
    setNotes(notes.concat(note))
  }


  // Delete a Note
  const deleteNote = async (id) => {
    // API Call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "Delete",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
    });
    // We can change json in note like in addnote         TODO
    const json = await response.json()
    console.log(json);

    // Logic to delete a note
    const newNote = notes.filter((note) => { return note._id !== id })
    setNotes(newNote);
    showAlert("Note is deleted successfully", "success");

  }



  // Edit a Note
  const editNote = async (id, title, description, tags) => {

    // API Call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "Put",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tags }),
    });
    const json = await response.json()
    console.log(json);

    let newNotes = JSON.parse(JSON.stringify(notes))

    // Logic to edit in clint
    for (let index = 0; index < notes.length; index++) {
      // const element = notes[index];
      if (newNotes[index]._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tags = tags;
        break;
      }
      setNotes(newNotes)
    }

  }

  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({ message, type });

    setTimeout(() => {
      setAlert(null);
    }, 800);
  };






  return (
    <NoteContext.Provider value={{ notes, setNotes, getNotes, addNote, deleteNote, editNote, alert, setAlert, showAlert }} >
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;