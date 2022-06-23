import React from "react";
import { Link } from 'react-router-dom';
import './Landing.css';

const Landing = () => {

    return( 
        <div id="landing">
            <div className='page1'>
                
                <Link to='/home' id="page1"><h1>Welcome to the world of video games</h1></Link>
            </div>
            <div className='page'>
            <Link to='/home'><button id='page'>SEE VIDEO GAMES</button></Link>
            </div>
        </div>
    )
}

export default Landing;