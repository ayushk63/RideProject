import React from "react";
import { Link } from "react-router";

function Navbar() {
    return (
        <div className="Navbar">
            <div id = 'navHeading'>ALPHA RIDES</div>
            <ul>
                <Link to = "/Profile" className="navLink">
                    <li>Home</li>
                </Link>
                <Link to = '/UserProfile' className="navLink">
                    <li>Profile</li>
                </Link>
                <Link to = '/About' className="navLink">
                    <li>About</li>
                </Link>
                <Link to = '/Contact' className="navLink">
                    <li>Contact</li>
                </Link>
            </ul>
        </div>
    )
}

export default Navbar