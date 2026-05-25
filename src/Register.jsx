import React from "react";
import axios from 'axios';
import { Link, useNavigate } from "react-router";
import car from './Images/car.avif';
import "./App.css";

function Register() {
    let [name, setName] = React.useState("");
    let [username, setUsername] = React.useState("");
    let [email, setEmail] = React.useState("");
    let [password, setPassword] = React.useState("");

    let navigate = useNavigate();

    const userRegister = async () => {
        try {
            const response = await axios.post(
                "http://localhost:3000/api/users/register",
                {
                    name,
                    username,
                    email,
                    password
                }
            );

            navigate("/Login");
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className = 'Register'>
            <div id = 'registerDiv'>
                <div id = 'left'>
                    <img src = { car } id = 'registerCarImage' />
                </div>
                <div id = 'right'>
                    <div id = 'registerDiv1'>
                        <form id = 'registerForm'>
                            <label className="label">Name</label>
                            <input className = 'input' type = 'text' placeholder="Enter your name...."
                            onChange = {(e) => setName(e.target.value)} />
                            <label className="label">Username</label>
                            <input className="input" type="text" placeholder="Enter a username...." 
                            onChange = {(e) => setUsername(e.target.value)} />
                            <label className="label">Email</label>
                            <input className="input" type="text" placeholder="Enter your email...." 
                            onChange = {(e) => setEmail(e.target.value)} />
                            <label className="label">Password</label>
                            <input className="input" type = 'password' placeholder="Enter a password...." 
                            onChange = {(e) => setPassword(e.target.value)} />
                            <br />
                            <button className = 'registerLoginButton'
                            onClick={userRegister} type = 'button'>REGISTER</button>
                            <div className = 'alreadyDontRegisterLogin'>
                                <div>Already Have An Account?</div>
                                <Link to = "/Login" className = 'link'>
                                    <div>Login</div>
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register;