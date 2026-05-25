import React from "react";
import Navbar from "./Navbar";
import { useCookies } from "react-cookie";

function DriverProfile() {
    let [name, setName] = React.useState("");

    let [cookies, setCookie] = useCookies([
        'name',
        'username',
        'email',
        'vehicleName',
        'vehicleNumber',
        'vehicleType'
    ]);

    React.useEffect(() => {
        setName(cookies['name']);
    }, [cookies]);

    return (
        <div className="DriverProfile">
            <Navbar />
            <br />
            <div>Hi, {name}!</div>
        </div>
    )
}

export default DriverProfile;