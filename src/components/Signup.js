import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import noteContext from '../context/notes/noteContext';


const Signup = () => {
  const host = process.env.REACT_APP_API_HOST

  const context = useContext(noteContext);
  const { showAlert } = context;

  const [credentials, setcredentials] = useState({ name: "", email: "", password: "", confirmpassword: "" })
  let navigation = useNavigate();

  const hadnleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = credentials;
    const response = await fetch(`${host}/api/auth/createuser`, {
      method: "Post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, email, password }),
    });
    const json = await response.json()
    console.log(json);
    if (json.success) {
      // Save the auth token and redirect
      localStorage.setItem("token", json.authtoken);
      navigation("/login");
      showAlert("Signup successfully", "success")

    }
    else {
      showAlert("Invalid credentials", "danger")
    }

  }

  const onChange = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value })

  }


  return (
    <div>
      <h2>SignUp to create your account in MyNotes app </h2>
      <form onSubmit={hadnleSubmit} >
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" onChange={onChange} name='name' aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" onChange={onChange} name='email' aria-describedby="emailHelp" />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" onChange={onChange} name='password' minLength={5} required />
          <div id="emailHelp" className="form-text">We'll never share your password with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="confirmpassword" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" id="confirmpassword" onChange={onChange} name='confirmpassword' minLength={5} required />
        </div>
        <button type="submit" className="btn btn-primary">Signup</button>
      </form>
    </div>
  )
}

export default Signup
