import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getGames, getGenres } from '../redux/actions';
import Card from './Card';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import Paginated from './Paginated';


const Home = () =>{
    let games = useSelector(state => state.games)
    let genres = useSelector(state => state.genres)
    let dispatch = useDispatch()
    const [currentPage, setPage] = useState(1);
    const [gameForPage] = useState(15);
    //const [order, setOrder] = useState('')

    const indexOfLastGame = currentPage * gameForPage
    const indexOfFirstGame = indexOfLastGame - gameForPage
    const currentGames = games.slice(indexOfFirstGame, indexOfLastGame)

    const paginated = (pageNumber) => {
        setPage(pageNumber)
    }
    
    useEffect(()=>{
        dispatch(getGames())
        dispatch(getGenres())
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
            <SearchBar/>
            <Paginated games={games.length} gamesForPage={gameForPage} paginated={paginated}/>
            <Link to='/game'><button>CREATE GAME</button></Link>
            <button onClick={e =>{handleClick(e)}} id='uno'>ALL RECIPES</button>
            <div>
                <label>FILTER GENRES</label>
                <select>
                {
                genres?.map(g => (
                    <option value={g.name}>{g.name}</option>
                ))   
                }
                </select>
            </div>
            <div>
                {
                    currentGames?.map(c => {
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