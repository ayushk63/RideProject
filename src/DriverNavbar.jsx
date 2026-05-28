import React from "react";
import { Link } from "react-router";

function DriverNavbar() {
    return (
        <div className="Navbar">
            <div id = 'navHeading'>ALPHA RIDES</div>
            <ul>
                <Link to = "/DriverProfile" className="navLink">
                    <li>Home</li>
                </Link>
                <Link to = '/viewDriverProfile' className="navLink">
                    <li>Profile</li>
                </Link>
                <Link to = '/DriverAbout' className="navLink">
                    <li>About</li>
                </Link>
                <Link to = '/DriverContact' className="navLink">
                    <li>Contact</li>
                </Link>
            </ul>
        </div>
    )
}

export default DriverNavbar