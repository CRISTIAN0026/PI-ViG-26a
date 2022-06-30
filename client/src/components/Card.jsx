import React from 'react';
import './Card.css'

const Card = ({name, image, genres, rating }) =>{
    
    return(
        <div className='carM'>
            <img src={image} alt="not found" width='200px' height='200px' className='imt'/>
            <div className='yt'>
                <h3>{rating}</h3>
            <h1  className='st'>{name}</h1>
            </div>
            <h5 className='gth'>{genres + ' '}</h5>
        </div>
    )
}

export default Card;