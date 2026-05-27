import React from "react";
import { Link, useNavigate } from 'react-router';
import axios from "axios";
import auto from './Images/auto.png';
import { useCookies } from "react-cookie";

function LoginDriver() {
    let [email, setEmail] = React.useState("");
    let [password, setPassword] = React.useState("");

    let [cookies, setCookie] = useCookies([
        'name',
        'email',
        'username',
        'vehicleName',
        'vehicleNumber',
        'vehicleType'
    ]);

    let navigate = useNavigate();

    const driverLogin = async () => {
        try {
            const response = await axios.post(
                "https://rideproject.onrender.com/api/drivers/login",
                {
                    email,
                    password
                },
                {
                    withCredentials: true
                }
            );

            setCookie('name', response.data.data.driver.name, {
                path: '/'
            });

            setCookie('username', response.data.data.driver.username, {
                path: '/'
            });

            setCookie('email', response.data.data.driver.email, {
                path: '/'
            });

            setCookie('vehicleName', response.data.data.driver.vehicleName, {
                path: '/'
            });

            setCookie('vehicleType', response.data.data.driver.vehicleType, {
                path: '/'
            });

            setCookie('vehicleNumber', response.data.data.driver.vehicleNumber, {
                path: '/'
            });

            navigate("/DriverProfile");
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="LoginDriver">
            <div id = 'loginDiv'>
                <div id = 'left'>
                    <img src = { auto } id = 'loginAutoImage' />
                </div>
                <div id = 'right'>
                    <div id = 'loginDiv2'>
                        <form id = 'loginForm'>
                            <label className="label">Email</label>
                            <input className = 'input' type = 'text' placeholder="Enter your email...."
                            onChange={(e) => setEmail(e.target.value)} />
                            <label className="label">Password</label>
                            <input className="input" type = 'password' placeholder="Enter your password...."
                            onChange={(e) => setPassword(e.target.value)} />
                            <br />
                            <button className = 'registerLoginButton'
                            onClick={driverLogin} type="button">LOGIN</button>
                            <div className="alreadyDontRegisterLogin">
                                <div>Don't Have An Account?</div>
                                <Link to = '/RegisterDriver' className="link">
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

export default LoginDriver;