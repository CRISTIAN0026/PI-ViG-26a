import React, { useState } from 'react';
import { getByName } from '../redux/actions';
import { useDispatch } from 'react-redux';

const SearchBar = () =>{
    let dispatch = useDispatch()
    let [input, setInput] = useState('')

    const handleOnCha = (e) => {
        e.preventDefault()
        setInput(e.target.value)
    }

    const handleOnSub = (e) =>{
        e.preventDefault()
        dispatch(getByName(input))
    }
    return (
        <div>
            <input 
            type="text"
            placeholder='Search game'
            onChange={e => handleOnCha(e)} 
            />
            <button type='submit' onClick={e => handleOnSub(e)}>SEARCH</button>
        </div>
    )
};

export default SearchBar;