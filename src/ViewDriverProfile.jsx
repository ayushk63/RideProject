import React from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import DriverNavbar from "./DriverNavbar";
import bike from './Images/bike.webp';

function ViewDriverProfile() {
    let [cookies, setCookie] = useCookies([
        'name',
        'username',
        'email',
        'vehicleName',
        'vehicleType',
        'vehicleNumber'
    ]);

    return (
        <div className="viewDriverProfile">
            <DriverNavbar />
            <div className="profileGreeting">
                Hi, {name}!
            </div>
        </div>
    )
}

export default ViewDriverProfile;