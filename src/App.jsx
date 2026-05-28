import React from "react";
import { Routes, Route } from "react-router";
import Home from "./Home";
import Register from "./Register";
import Login from "./Login";
import Profile from "./Profile";
import RegisterDriver from "./RegisterDriver";
import LoginDriver from "./LoginDriver";
import DriverProfile from "./DriverProfile";
import About from "./About";
import Contact from "./Contact";
import DriverAbout from "./DriverAbout";
import DriverContact from "./DriverContact";
import UserProfile from "./UserProfile";

function App() {
  return (
    <>
      <Routes>
        <Route path = '/' element = {<Home />} />
        <Route path = '/Register' element = {<Register />} />
        <Route path = '/Login' element = {<Login />} />
        <Route path = '/Profile' element = {<Profile />} />
        <Route path = '/RegisterDriver' element = {<RegisterDriver />} />
        <Route path = '/LoginDriver' element = {<LoginDriver />} />
        <Route path = '/DriverProfile' element = {<DriverProfile />} />
        <Route path = '/About' element = {<About />} />
        <Route path = '/Contact' element = {<Contact />} />
        <Route path = '/DriverAbout' element = {<DriverAbout />} />
        <Route path = '/DriverContact' element = {<DriverContact />} />
        <Route path = '/UserProfile' element = {<UserProfile />} />
      </Routes>
    </>
  );
}

export default App;