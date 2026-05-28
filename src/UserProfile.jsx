import React from 'react';
import Navbar from './Navbar';
import { useCookies } from 'react-cookie';
import axios from 'axios';

function UserProfile() {
    return (
        <div className='UserProfile'>
            <Navbar />
        </div>
    )
}

export default UserProfile;