import React, { use } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router";
import { useCookies } from "react-cookie";
import auto from './Images/auto.png';

function Login() {
    let [email, setEmail] = React.useState("");
    let [password, setPassword] = React.useState("");

    let [cookies, setCookie] = useCookies(['name', 'username', 'email']);

    let navigate = useNavigate();

    const userLogin = async () => {
        try {
            const response = await axios.post(
                "http://localhost:3000/api/users/login",
                {
                    email,
                    password
                },
                {
                    withCredentials: true
                }
            );

            setCookie('name', response.data.data.user.name, {
                path: '/'
            });

            setCookie('username', response.data.data.user.username, {
                path: '/'
            });

            setCookie('email', response.data.data.user.email, {
                path: '/'
            });

            navigate("/Profile");
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="Login">
            <div id = 'loginDiv'>
                <div id = 'left'>
                    <img src = { auto } id = 'loginAutoImage' />
                </div>
                <div id = 'right'>
                    <div id = 'loginDiv1'>
                        <form id = 'loginForm'>
                            <label className="label">Email</label>
                            <input className = 'input' type = 'text' placeholder="Enter your email...."
                            onChange={(e) => setEmail(e.target.value)} />
                            <label className="label">Password</label>
                            <input className="input" type = 'password' placeholder="Enter your password...."
                            onChange={(e) => setPassword(e.target.value)} />
                            <br />
                            <button className = 'registerLoginButton'
                            onClick={userLogin} type="button">LOGIN</button>
                            <div className="alreadyDontRegisterLogin">
                                <div>Don't Have An Account?</div>
                                <Link to = '/Register' className="link">
                                    <div>Register</div>
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;