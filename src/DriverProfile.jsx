import React from "react";
import DriverNavbar from "./DriverNavbar";
import { useCookies } from "react-cookie";
import axios from "axios";
import { useNavigate } from "react-router";

function DriverProfile() {
    let [name, setName] = React.useState("");
    let [username, setUsername] = React.useState("");
    let [rides, setRides] = React.useState(null);
    let [currentRide, setCurrentRide] = React.useState(null);

    let navigate = useNavigate();

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
        setUsername(cookies['username']);
    }, [cookies]);

    const showRides = async () => {
        try {
            const response = await axios.get(
                "https://rideproject.onrender.com/api/rides/showrides"
            );

            setRides(response.data.data.rides);
        } catch (error) {
            console.log(error);
        }
    }

    const acceptRide = async (rideId) => {
        try {
            const response = await axios.post(
                "https://rideproject.onrender.com/api/rides/acceptride",
                {
                    driverUsername: username,
                    rideId
                }
            );

            setCurrentRide(response.data.data.updatedRide);
        } catch (error) {
            console.log(error);
        }
    }

    React.useEffect(() => {
        showRides();
    }, [rides]);

    const driverLogout = async () => {
        try {
            await axios.post(
                "https://rideproject.onrender.com/api/drivers/logout",
                {},
                {
                    withCredentials: true
                }
            );

            setCookie("name", "", {
                path: "/"
            });

            setCookie("username", "", {
                path: "/"
            });

            setCookie("email", "", {
                path: "/"
            });
            
            setCookie("vehicleName", "", {
                path: "/"
            });

            setCookie("vehicleNumber", "", {
                path: "/"
            });

            setCookie("vehicleType", "", {
                path: "/"
            });

            navigate("/LoginDriver");
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="DriverProfile">
            <DriverNavbar />
            <br />
            <div>Hi, {name}!</div>
            {rides && rides.length > 0 && rides.map((ride) => (
                <div className = 'rideDiv'>
                    <div id = 'driverFROM'>FROM: {ride.fromText}</div>
                    <div id = 'driverTO'>TO: {ride.toText}</div>
                    <div id = 'driverFare'>Fare: {ride.fare}</div>
                    <button id = 'acceptRideButton'
                    onClick={() => acceptRide(ride._id)}>ACCEPT</button>
                </div>
            ))}
            <button className="logoutButton" onClick={driverLogout}>LOGOUT</button>
        </div>
    )
}

export default DriverProfile;