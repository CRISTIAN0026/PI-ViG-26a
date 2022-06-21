import React from 'react';

const Card = ({name, image, genres}) =>{
    
    return(
        <div>
            <h1>{name}</h1>
            <img src={image} alt="not found" width='250px' height='250px'/>
            <h5>{genres + ' '}</h5>
        </div>
    )
}

export default Card;