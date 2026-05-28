import L from "leaflet";
import "leaflet/dist/leaflet.css";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});
import React from "react";
import Navbar from "./Navbar";
import axios from "axios";
import { useCookies } from "react-cookie";
import { TileLayer, MapContainer, Marker, Polyline, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useNavigate } from "react-router";
import carHome from "./Images/carHome.avif";
import bikeHome from "./Images/bikeHome.webp";
import autoHome from "./Images/autoHome.avif";
import rickshawHome from "./Images/rickshawHome.webp";

function Profile() {
    let [name, setName] = React.useState("");
    let [username, setUsername] = React.useState("");
    let [email, setEmail] = React.useState("");
    let [fromText, setFromText] = React.useState("");
    let [toText, setToText] = React.useState("");
    let [fromCoordinates, setFromCoordinates] = React.useState(null);
    let [toCoordinates, setToCoordinates] = React.useState(null);
    let [routeCoordinates, setRouteCoordinates] = React.useState([]);
    let [fare, setFare] = React.useState(0);
    let [isCurrentRide, setIsCurrentRide] = React.useState(false);
    let [isCurrentRideMessage, setIsCurrentRideMessage] = React.useState("");
    let [currentRideId, setCurrentRideId] = React.useState(null);
    let [currentRide, setCurrentRide] = React.useState(null);
    let [isFindingRide, setIsFindingRide] = React.useState(false);

    let navigate = useNavigate();

    let [cookies, setCookie] = useCookies(['name', 'username', 'email']);

    React.useEffect(() => {
        setName(cookies['name']);
        setUsername(cookies['username']);
        setEmail(cookies['email']);
    }, [cookies]);

    const getRide = async () => {
        try {
            if (currentRideId) {
                const response = await axios.get(
                    "https://rideproject.onrender.com/api/rides/getride",
                    {
                        params: {
                            rideId: currentRideId
                        }
                    }
                );

                const ride = response.data.data.ride;
                return ride;
            }
        } catch (error) {
            console.log(error);
        }
    }

    React.useEffect(() => {
        if (!currentRideId) return;

        const interval = setInterval(async () => {
            const ride = await getRide();

            setCurrentRide(ride);

            if (ride?.accepted) {
                setIsFindingRide(false);
                clearInterval(interval);
            }
        }, 2000);

        return () => clearInterval(interval);
    }, [currentRideId]);

    const getCoordinates = async (query) => {
        try {
            const response = await axios.get(
                `https://nominatim.openstreetmap.org/search?q=${query}&format=json`
            );

            return [parseFloat(response.data[0].lat), parseFloat(response.data[0].lon)]
        } catch (error) {
            console.log(error);
        }
    }

    const getRouteCoordinates = async (fromCoords, toCoords) => {
        try {
            const response = await axios.get(
                "https://router.project-osrm.org/route/v1/driving/" +
                `${fromCoords[1]},${fromCoords[0]};` + 
                `${toCoords[1]},${toCoords[0]}` + 
                "?overview=full&geometries=geojson"
            );

            const route = response.data.routes[0].geometry.coordinates;

            const formattedRoute = route.map((point) => [
                point[1],
                point[0]
            ]);

            setRouteCoordinates(formattedRoute);
        } catch (error) {
            console.log(error);
        }
    } 

    const getFromAndToCoordinates = async () => {
        try {
            const from = await getCoordinates(fromText);
            const to = await getCoordinates(toText);

            setFromCoordinates(from);
            setToCoordinates(to);

            await getRouteCoordinates(from, to);
            await createRide(from, to);
        } catch (error) {
            console.log(error);
        }
    }

    function ChangeMapCenter({ center }) {
        const map = useMap();

        React.useEffect(() => {
            if (center) {
                map.setView(center);
            }
        }, [center]);

        return null;
    }

    const userLogout = async () => {
        try {
            await axios.post(
                "https://rideproject.onrender.com/api/users/logout",
                {},
                {
                    withCredentials: true
                }
            );

            setCookie('name', '', {
                path: '/'
            });

            setCookie('username', '', {
                path: '/'
            });

            setCookie('email', '', {
                path: '/'
            });

            navigate("/Login");
        } catch (error) {
            console.log(error);
        }
    }

    const createRide = async (from, to) => {
        try {
            if (!isCurrentRide) {
                setIsFindingRide(true);

                const response = await axios.post(
                    "https://rideproject.onrender.com/api/rides/createride",
                    {
                        fromText,
                        toText,
                        fromCoordinates: from,
                        toCoordinates: to,
                        fare
                    }
                );

                setCurrentRideId(response.data.data.ride._id);
            } else {
                setIsCurrentRideMessage("You are already finding a ride. Please cancel it first.");
            }
        } catch (error) {
            console.log(error);
        }
    }

    const stopFindingRides = async () => {
        try {
            await axios.post(
                "https://rideproject.onrender.com/api/rides/deleteride",
                {
                    rideId: currentRideId
                }
            );

            setIsFindingRide(false);
            setCurrentRideId(null);
            setCurrentRide(null);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="Profile">
            <Navbar />
            <br />
            <div>Hi, {name}!</div>
            <div>Welcome To Alpha Rides!</div>
            <div id = 'vehicleRow'>
                <div className = 'vehicleImageDiv'>
                    <img src = {autoHome} className = 'vehicleImage' />
                </div>
                <div className = 'vehicleImageDiv'>
                    <img src = {carHome} className = 'vehicleImage' />
                </div>
                <div className = 'vehicleImageDiv'>
                    <img src = {bikeHome} className = 'vehicleImage' />
                </div>
                <div className = 'vehicleImageDiv'>
                    <img src = {rickshawHome} className = 'vehicleImage' />
                </div>
            </div>
            <div id = 'wherego'>Where do you want to go?</div>
            <div id = 'fromwhere'>
                <div id = 'from'>
                    FROM: <input type = 'text' placeholder="Enter location...."
                    onChange = {(e) => setFromText(e.target.value)} className="locationInput" />
                </div>
                <div id = 'to'>
                    TO: <input type = 'text' placeholder="Enter location...."
                    onChange = {(e) => setToText(e.target.value)} className="locationInput" />
                </div>
            </div>
            <div id = 'fareInputDiv'>
                <div>How much will you pay the driver?</div>
                <input type = 'text' placeholder="Enter fare...." id = 'fareInput'
                onChange = {(e) => setFare(parseInt(e.target.value))} />
            </div>
            <button id = 'findRidesButton'
            onClick={getFromAndToCoordinates}>FIND RIDES</button>
            {currentRide?.accepted && (
                <div id = 'currentDriverDiv'>
                    <div id = 'driverName'>Driver Name: {currentRide.driver[0].name}</div>
                    <div id = 'vehicleName'>Vehicle Name: {currentRide.driver[0].vehicleName}</div>
                    <div id = 'vehicleNumber'>Vehicle Number: {currentRide.driver[0].vehicleNumber}</div>
                    <div id = 'vehicleType'>Vehicle Type: {currentRide.driver[0].vehicleType}</div>
                </div>
            )}
            {isFindingRide && (
                <div id = 'findingRideDiv'>
                    <div id = 'findingRide'>Finding Rides For You...</div>
                    <button className="logoutButton" id = 'stopFindingButton'
                    onClick = {stopFindingRides}>STOP FINDING</button>
                </div>
            )}
            <MapContainer id = 'map' center={[10, 15]} zoom={13} scrollWheelZoom={true}>
                <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {fromCoordinates && <ChangeMapCenter center = {fromCoordinates} />}
                {fromCoordinates && <Marker position = {fromCoordinates} />}
                {toCoordinates && <Marker position = {toCoordinates} />}
                {routeCoordinates.length > 0 && (
                    <Polyline
                        pathOptions={{ color: "red", weight: 5 }}
                        positions={routeCoordinates}
                    />
                )}
            </MapContainer>
            <button className = 'logoutButton' onClick={userLogout}>LOGOUT</button>
        </div>
    )
}

export default Profile;