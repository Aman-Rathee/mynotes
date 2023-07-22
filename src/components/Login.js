import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import noteContext from '../context/notes/noteContext';


const Login = () => {
    const host = process.env.REACT_APP_API_HOST

    const context = useContext(noteContext);
    const { showAlert } = context;

    const [credentials, setcredentials] = useState({ email: "", password: "" })
    let navigation = useNavigate();


    const hadnleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`${host}/api/auth/login`, {
            method: "Post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password }),
        });
        const json = await response.json()
        console.log(json);
        if (json.success) {
            // Save the auth token and redirect
            localStorage.setItem("token", json.authToken);
            showAlert("Login successfully", "success")
            navigation('/');

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
            <h2>Login to save your Notes</h2>
            <form onSubmit={hadnleSubmit} >
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" value={credentials.email} onChange={onChange} id="email" name='email' aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" value={credentials.password} onChange={onChange} id="password" name='password' />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    )
}

export default Login
