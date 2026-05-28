import React from 'react';
import Navbar from './Navbar';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import bike from './Images/bike.webp';

function UserProfile() {
    let [cookies, setCookie] = useCookies(['name', 'username', 'email']);
    let [newName, setNewName] = React.useState("");
    let [oldPassword, setOldPassword] = React.useState("");
    let [newPassword, setNewPassword] = React.useState("");
    let [name, setName] = React.useState("");
    let [username, setUsername] = React.useState("");

    React.useEffect(() => {
        setName(cookies['name']);
        setUsername(cookies['username']);
    }, [cookies]);

    const changeName = async () => {
        try {
            const response = await axios.post(
                "https://rideproject.onrender.com/api/users/updatename",
                {
                    newName,
                    username
                }
            );

            setCookie("name", response.data.data.updatedUser.name, {
                path: "/"
            });
        } catch (error) {
            console.log(error);
        }
    }

    const changePassword = async () => {
        try {
            await axios.post(
                "https://rideproject.onrender.com/api/users/changepassword",
                {
                    username,
                    oldPassword,
                    newPassword
                }
            );
        } catch (error) {
            console.log(error);
        }
    }

    const toggleChangeNameDiv = () => {
        const changeNameDiv = document.getElementById("changeNameDiv");

        if (changeNameDiv.style.display === 'block') {
            changeNameDiv.style.display = 'none';
        } else {
            changeNameDiv.style.display = 'block';
        }
    }

    const toggleChangePasswordDiv = () => {
        const changePasswordDiv = document.getElementById("changePasswordDiv");

        if (changePasswordDiv.style.display === 'block') {
            changePasswordDiv.style.display = 'none';
        } else {
            changePasswordDiv.style.display = 'block';
        }
    }

    return (
        <div className='UserProfile'>
            <Navbar />
            <div className = 'profileGreeting'>
                Hi, {name}!
            </div>
            <div id = 'theProfileDiv'>
                <div id = 'theProfileLeft'>
                    <img src = {bike} className = 'bikeImage' />
                </div>
                <div id = 'theProfileRight'>
                    <div className = 'wantToChange'>Want to change your name?</div>
                    <button className = 'changeButton'
                    onClick={toggleChangeNameDiv}>CHANGE NAME</button>
                    <div id = 'changeNameDiv' style={{ display: 'none' }}>
                        <label className='label'>New Name</label>
                        <input type = 'text' placeholder='Enter new name....'
                        className='changeInput'
                        onChange={(e) => setNewName(e.target.value)} />
                        <br />
                        <button className = 'changeButton2'
                        onClick = {changeName}>CHANGE</button>
                    </div>
                    <div className = 'wantToChange'>Want to change your password?</div>
                    <button className = 'changeButton'
                    onClick={toggleChangePasswordDiv}>CHANGE PASSWORD</button>
                    <div id = 'changePasswordDiv' style={{ display: "none" }}>
                        <label className = 'label'>Old Password</label>
                        <input type='text' placeholder='Enter old password....'
                        className='changeInput'
                        onChange={(e) => setOldPassword(e.target.value)} />
                        <label className = 'label'>New Password</label>
                        <input type = 'text' placeholder='Enter new password....'
                        className='changeInput'
                        onChange={(e) => setNewPassword(e.target.value)} />
                        <br />
                        <button className='changeButton2'
                        onClick={changePassword}>CHANGE</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserProfile;