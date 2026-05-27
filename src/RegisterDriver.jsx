import React from 'react';
import { Link, useNavigate } from 'react-router';
import axios from 'axios';
import car from './Images/car.avif';

function RegisterDriver() {
    let [name, setName] = React.useState("");
    let [email, setEmail] = React.useState("");
    let [username, setUsername] = React.useState("");
    let [password, setPassword] = React.useState("");
    let [vehicleName, setVehicleName] = React.useState("");
    let [vehicleNumber, setVehicleNumber] = React.useState("");
    let [vehicleType, setVehicleType] = React.useState("");

    let navigate = useNavigate();

    const driverRegister = async () => {
        try {
            const response = await axios.post(
                "https://rideproject.onrender.com/api/drivers/register",
                {
                    name,
                    username,
                    email,
                    password,
                    vehicleName,
                    vehicleNumber,
                    vehicleType
                }
            );

            navigate("/LoginDriver");
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='RegisterDriver'>
            <div id = 'registerDiv'>
                <div id = 'left'>
                    <img src = { car } id = 'registerCarImage' />
                </div>
                <div id = 'right'>
                    <div id = 'registerDiv2'>
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
                            <label className='label'>Vehicle Name</label>
                            <input className='input' type = 'text' placeholder='Enter vehicle name....'
                            onChange={(e) => setVehicleName(e.target.value)} />
                            <label className='label'>Vehicle Number</label>
                            <input className='input' type = 'text' placeholder='Enter vehicle number....'
                            onChange={(e) => setVehicleNumber(e.target.value)} />
                            <label className='label'>Vehicle Type (Bike, Car, Auto, E-Ricksaw)</label>
                            <input className='input' type = 'text' placeholder='Enter vehicle type (Bike, Car, Auto, E-Ricksaw)....'
                            onChange={(e) => setVehicleType(e.target.value)} />
                            <br />
                            <button className = 'registerLoginButton'
                            onClick={driverRegister} type = 'button'>REGISTER</button>
                            <div className = 'alreadyDontRegisterLogin'>
                                <div>Already Have An Account?</div>
                                <Link to = "/LoginDriver" className = 'link'>
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

export default RegisterDriver;