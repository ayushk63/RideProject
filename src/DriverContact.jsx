import React from "react";
import Navbar from "./Navbar";

function DriverContact() {
    let [name, setName] = React.useState("");
    let [email, setEmail] = React.useState("");
    let [query, setQuery] = React.useState("");

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
                    <button type = 'button' id = 'submitButton'>SUBMIT</button>
                </form>
            </div>
        </div>
    )
}

export default DriverContact