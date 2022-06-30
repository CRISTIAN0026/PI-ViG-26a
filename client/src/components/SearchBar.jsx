import React, { useState } from 'react';
import { getByName } from '../redux/actions';
import { useDispatch } from 'react-redux';
import './SearchBar.css';

const SearchBar = ({setPage}) =>{
    let dispatch = useDispatch()
    let [input, setInput] = useState('')

    const handleOnCha = (e) => {
        e.preventDefault()
        setInput(e.target.value)
    }

    const handleOnSub = (e) =>{
        e.preventDefault()
        dispatch(getByName(input))
        setPage(1)
    }
    
    return (
        <div id='sj'>
            <input 
            type="text"
            placeholder='Search game'
            onChange={e => handleOnCha(e)} 
            id='saw'
            />
            <button type='submit' id='rta' onClick={e => handleOnSub(e)}>SEARCH</button>
        </div>
    )
};

export default SearchBar;