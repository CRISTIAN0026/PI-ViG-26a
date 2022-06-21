import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDetails } from '../redux/actions';
import { useParams } from 'react-router-dom';

const Details = () =>{
    let dispatch = useDispatch()
    let { id } = useParams()
    let details = useSelector(state => state.details)
    
    useEffect(() => {
        dispatch(getDetails(id))
    },[dispatch, id])

    useEffect(() =>{ 
        return () =>{ details.pop()}
    },[details])
    return(
        <div>
            {
                details.length ?
                <div>
                    {
                        details.map(d => {
                            return(
                                <div>
                                    <h1>Name: {d.name}</h1>
                                    <img src={d.image} alt="not found" width='500px' height='500px'/>
                                    <h3>Rating: {d.rating}</h3>
                                    <h3>Released: {d.released}</h3>
                                    <h3>Platforms: {d.platforms[0].platform ?  d.platforms?.map(p => p.platform + ' - ') : d.platforms }</h3>
                                    <p>Description: {d.description}</p>
                                </div>
                            )
                        })
                    }
                </div> : <p>☻Loading</p>
            }
        </div>
    )
};

export default Details;