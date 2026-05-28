import React from 'react';
import Navbar from './Navbar';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import bike from './Images/bike.webp';

function UserProfile() {
    let [cookies, setCookie] = useCookies(['name', 'username', 'email']);

    return (
        <div className='UserProfile'>
            <Navbar />
            <div className = 'profileGreeting'>
                Hi, {name}!
            </div>
        </div>
    )
}

export default UserProfile;