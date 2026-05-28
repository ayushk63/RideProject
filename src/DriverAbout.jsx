import React from 'react';
import DriverNavbar from './DriverNavbar';
import auto2 from './Images/auto2.avif';

function DriverAbout() {
    return (
        <div className='About'>
            <DriverNavbar />
            <div id = 'aboutDiv1'>
                <div id = 'aboutLeft1'>
                    <img src = {auto2} id = 'autoImage2' />
                </div>
                <div id = 'aboutRight1'>
                    This is a website for finding rides. It has been created by Ayush Kumar.
                    This website has been created using MERN Stack. Frontend has been created
                    using React JS and CSS, and backend has been created using Node JS and Express JS.
                    The data is stored on MongoDB Atlas.
                </div>
            </div>
        </div>
    )
}

export default DriverAbout