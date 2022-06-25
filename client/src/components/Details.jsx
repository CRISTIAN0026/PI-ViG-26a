import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDetails } from '../redux/actions';
import { useParams, Link } from 'react-router-dom';
import './Details.css';

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
        <div id='det'>
            {
                details.length ?
                <div>
                    {
                        details.map(d => {
                            return(
                                <div key={d.id}>
                                    <h1>{d.name}</h1>
                                    <div className='det02'>
                                    <div>
                                    <img src={d.image} alt="not found" id='iu' width='350px' height='350px'/>
                                    </div>
                                    <div className='det03'>
                                    <h3 className='uni'>Rating: {d.rating}</h3>
                                    <h3 className='uni'>Released: {d.released}</h3>
                                    <h3 className='uni'>Genres : {d.genres?.map(n => n.name + ', ')}</h3>
                                    <h3 className='uni'>Platforms: {d.platforms[0].platform ?  d.platforms?.map(p => p.platform + ' / ') : d.platforms.map(d => d + ' / ') }</h3>
                                    <p>Description: {d.description}</p>
                                    </div>
                                    </div>
                                    <Link to='/home'><button id='li'>Return Games</button></Link>
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