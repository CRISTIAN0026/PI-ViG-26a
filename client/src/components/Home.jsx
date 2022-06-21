import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getGames } from '../redux/actions';
import Card from './Card';
import { Link } from 'react-router-dom';

const Home = () =>{
    let allGames = useSelector(state => state.games)
    let dispatch = useDispatch()
    
    useEffect(()=>{
        dispatch(getGames())
    },[dispatch])

    const handleClick = (e) => {
        e.preventDefault()
        dispatch(getGames())
    }
    return(
        <div>
            <div>
                <h1>App VideoGames</h1>
            </div>
            <Link to='/game'><button>CREATE GAME</button></Link>
            <button onClick={e =>{handleClick(e)}} id='uno'>ALL RECIPES</button>
            <div>
                {
                    allGames?.map(c => {
                        return(
                            <div>
                            <Link to={'/home/' + c.id} >
                                <Card name={c.name} image={c.image} genres={c.genres?.map(n => n.name)}/>
                            </Link>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Home;