import React from "react";
import Navbar from "./Navbar";
import axios from "axios";
import { useNavigate } from "react-router";

function Contact() {
    let [name, setName] = React.useState("");
    let [email, setEmail] = React.useState("");
    let [query, setQuery] = React.useState("");

    let navigate = useNavigate();

    const submitQuery = async () => {
        try {
            await axios.post(
                "https://rideproject.onrender.com/api/queries/createquery",
                {
                    name, 
                    email,
                    query
                }
            );

            navigate("/Contact");
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className = 'Contact'>
            <Navbar />
            <div id = 'feelfreetocontact'>Feel free to contact us</div>
            <div id = 'contactDiv'>
                <form id = 'contactForm'>
                    <label className="label">Name</label>
                    <input type = 'text' placeholder="Enter your name...."
                    onChange={(e) => setName(e.target.value)} className="input" />
                    <label className="label">Email</label>
                    <input type="text" placeholder="Enter your email...."
                    className="input" onChange={(e) => setEmail(e.target.value)} />
                    <label className="label">Query</label>
                    <textarea rows={8} className="queryInput" placeholder="Enter your query...."
                    onChange={(e) => setQuery(e.target.value)} />
                    <br />
                    <button type = 'button' id = 'submitButton'
                    onClick={submitQuery}>SUBMIT</button>
                </form>
            </div>
        </div>
    )
}

export default Contact