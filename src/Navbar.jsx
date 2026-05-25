import React from "react";
import { Link } from "react-router";

function Navbar() {
    return (
        <div className="Navbar">
            <div id = 'navHeading'>ALPHA RIDES</div>
            <ul>
                <li>Home</li>
                <li>Profile</li>
                <li>About</li>
                <li>Contact</li>
            </ul>
        </div>
    )
}

export default Navbar