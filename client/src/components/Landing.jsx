import React from "react";
import { Link } from 'react-router-dom';

const Landing = () => {

    return( 
        <div>
            <h1>Welcome to the world of video games</h1>
            <Link to='/home'><button>SEE VIDEO GAMES</button></Link>
        </div>
    )
}

export default Landing;