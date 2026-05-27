import React from "react";
import Navbar from "./Navbar";
import { useCookies } from "react-cookie";
import axios from "axios";

function DriverProfile() {
    let [name, setName] = React.useState("");
    let [rides, setRides] = React.useState(null);

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

    const showRides = async () => {
        try {
            const response = await axios.get(
                "http://localhost:3000/api/rides/showrides"
            );

            setRides(response.data.data.rides);
        } catch (error) {
            console.log(error);
        }
    }

    React.useEffect(() => {
        showRides();
    }, [rides]);

    return (
        <div className="DriverProfile">
            <Navbar />
            <br />
            <div>Hi, {name}!</div>
            {rides && rides.length > 0 && rides.map((ride) => {
                <div className = 'rideDiv'>
                    {JSON.stringify(ride)}
                </div>
            })}
        </div>
    )
}

export default DriverProfile;