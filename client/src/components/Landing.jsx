import React from "react";
import { Link } from 'react-router-dom';
import './Landing.css';

const Landing = () => {

    return( 
        <div id="landing">
            <div>
            <h1>Welcome to the world of video games</h1>
            </div>
            <div>
            <Link to='/home'><button>SEE VIDEO GAMES</button></Link>
            </div>
        </div>
    )
}

export default Landing;