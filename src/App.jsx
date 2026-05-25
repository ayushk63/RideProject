import React from "react";
import { Routes, Route } from "react-router";
import Home from "./Home";
import Register from "./Register";
import Login from "./Login";
import Profile from "./Profile";
import RegisterDriver from "./RegisterDriver";
import LoginDriver from "./LoginDriver";
import DriverProfile from "./DriverProfile";

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
      </Routes>
    </>
  );
}

export default App;