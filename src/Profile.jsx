import React from "react";
import Navbar from "./Navbar";
import axios from "axios";
import { useCookies } from "react-cookie";
import { TileLayer, MapContainer, Marker, Polyline, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function Profile() {
    let [name, setName] = React.useState("");
    let [username, setUsername] = React.useState("");
    let [email, setEmail] = React.useState("");
    let [fromText, setFromText] = React.useState("");
    let [toText, setToText] = React.useState("");
    let [fromCoordinates, setFromCoordinates] = React.useState(null);
    let [toCoordinates, setToCoordinates] = React.useState(null);
    let [routeCoordinates, setRouteCoordinates] = React.useState([]);

    let [cookies, setCookie] = useCookies(['name', 'username', 'email']);

    React.useEffect(() => {
        setName(cookies['name']);
        setUsername(cookies['username']);
        setEmail(cookies['email']);
    }, [cookies]);

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
        } catch (error) {
            console.log(error);
        }
    }

    function ChangeMapCenter({ center }) {
        const map = useMap();

        React.useEffect(() => {
            map.setView(center, 13);
        }, [center, map]);

        return null;
    }

    return (
        <div className="Profile">
            <Navbar />
            <br />
            <div>Hi, {name}!</div>
            <div>Welcome To Alpha Rides!</div>
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
            <button id = 'findRidesButton'
            onClick={getFromAndToCoordinates}>FIND RIDES</button>
            <MapContainer center={[10, 15]} zoom={13} scrollWheelZoom={true}
            style={{ height: "300px", width: "500px", marginLeft: "320px",
                marginTop: "50px"
             }}>
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
        </div>
    )
}

export default Profile;