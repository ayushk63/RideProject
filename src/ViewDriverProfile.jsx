import React from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import DriverNavbar from "./DriverNavbar";

function viewDriverProfile() {
    return (
        <div className="viewDriverProfile">
            <DriverNavbar />
        </div>
    )
}

export default viewDriverProfile;