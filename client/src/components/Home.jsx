import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getGames, getGenres, filterAlphabetically, filterRating, filterGenres } from '../redux/actions';
import Card from './Card';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import Paginated from './Paginated';
import './Home.css';

const Home = () =>{
    let games = useSelector(state => state.games)
    let genres = useSelector(state => state.genres)
    let dispatch = useDispatch()
    const [currentPage, setPage] = useState(1);
    const [gameForPage] = useState(15);
    const [order, setOrder] = useState('')
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
    
    const handleGenres = (e) => {
        e.preventDefault()
        dispatch(filterGenres(e.target.value))
        setPage(1)
    }

    const handleRating = (e) => {
        e.preventDefault()
        dispatch(filterRating(e.target.value))
        setPage(1)
        setOrder(`${e.target.value}`)
    }

    const handleAlphabetically = (e) => {
        e.preventDefault()
        dispatch(filterAlphabetically(e.target.value))
        setPage(1)
        setOrder(`${e.target.value}`)
    }
    return(
        <div id='mix'>
            <div>
                <h1>App VideoGames</h1>
            </div>
            <SearchBar/>
            <Paginated games={games.length} gamesForPage={gameForPage} paginated={paginated}/>
            <Link to='/game'><button>CREATE GAME</button></Link>
            <button onClick={e =>{handleClick(e)}} id='uno'>ALL RECIPES</button>
            <div>
                <select onChange={ e => handleGenres(e) } defaultValue='sort genres'>
                <option value='sort genres' disabled>SORT GENRES</option>
                {
                genres?.map(g => (
                    <option value={g.name}>{g.name}</option>
                ))   
                }
                </select>
            </div>
            <div>
                <select onChange={ e => handleRating(e) } defaultValue ='SORT RATING'>
                    <option value='SORT RATING' disabled>SORT RATING</option>
                    <option value="asc">ascending rating</option>
                    <option value="dsc">descending rating</option>
                </select>
            </div>
            <div>
                <select onChange={ e => handleAlphabetically(e) } defaultValue='SORT ALPHABETICALLY'>
                <option value='SORT ALPHABETICALLY' disabled>SORT ALPHABETICALLY</option>
                    <option value="az">ascending</option>
                    <option value="za">descending</option>
                </select>
            </div>
            <div className='cad'>
                {
                    currentGames?.map(c => {
                        return(
                            <div className='car1'>
                            <Link to={'/home/' + c.id} id='syu' >
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