import React from "react";
import homepagecar from './Images/homepagecar.webp';
import { Link } from "react-router";

function Home() {
    return (
        <div className="Home">
            <div id = 'heading'>ALPHA RIDES</div>
            <div id = 'registerLoginHome'>
                <div id = 'registerLoginUser'>
                    <div className = 'registerLoginPara'>Want to Find Rides?</div>
                    <div className = 'buttonAreaHome'>
                        <Link to = '/register'>
                            <button className = 'registerLoginButton1'>REGISTER</button>
                        </Link>
                        <Link to = '/login'> 
                            <button className = 'registerLoginButton1'>LOGIN</button>
                        </Link>
                    </div>
                </div>
                <div id = 'registerLoginDriver'>
                    <div className = 'registerLoginPara'>Want to Drive And Earn Money?</div>
                    <div className="buttonAreaHome">
                        <Link to = '/RegisterDriver'>   
                            <button className="registerLoginButton2">REGISTER</button>
                        </Link>
                        <Link to = '/LoginDriver'>
                            <button className="registerLoginButton2">LOGIN</button>
                        </Link>
                    </div>
                </div>
            </div>
            <section id = 'homePageCarSection'>
                <div id = 'leftHome'>
                    <img src = {homepagecar} id = 'homePageCarImage' />
                </div>
                <div id = 'rightHome'>
                    Welcome to Alpha Rides! If you want to find rides, you can find them easily on this platform.
                    If you are a Driver, you can earn money through this platform for your driving.
                </div>
            </section>
        </div>
    )
}

export default Home;