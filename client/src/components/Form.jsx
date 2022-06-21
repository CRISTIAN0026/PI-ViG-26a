import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getGenres, addGame, getPlatform } from '../redux/actions';
//import { useNavigate } from 'react-router-dom';


const Form = () =>{
    let dispatch = useDispatch()
    let gen = useSelector(state => state.genres)
    let plat= useSelector(state => state.platform) 
    //let nav = useNavigate()

    const [input, setInput] = useState({
        name:'',
        description:'',
        released:'',
        image:'',
        rating:'',
        platforms:[],
        genres:[]

    })

    useEffect(() =>{
        dispatch(getGenres())
        dispatch(getPlatform())
    }, [dispatch])

    const handleChange = (e) =>{
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
    }
    
    const handleOnSub = (e) =>{
        e.preventDefault()
        dispatch(addGame(input))
    }

    const handleSelect = (e) =>{
        setInput({
            ...input,
            genres: [...input.genres, e.target.value]
        })
        console.log(input.genres)
    }
    
    const handleSelect2 = (e) => {
        setInput(input => ({
            ...input,
            platforms: [...input.platforms, e.target.value]
        }))
    }


    return(
        <div>
            <form onSubmit={(e) => handleOnSub(e)}>
            <select onChange={(e) => handleSelect(e)}>
            {
                gen?.map(g => (
                    <option value={g.name} key={g.name}>{g.name}</option>
                ))
            }
            </select>
            <select onChange={e => handleSelect2(e)}>
            {
                plat?.map(p => (
                    <option key={p.name} value={p.name}>{p.name}</option>
                ))
            }
            </select>
            <label>Name</label>
            <input type="text" name='name' value={input.name} onChange={(e) => handleChange(e)}/>
            <label>Description</label>
            <input type="text" name='description' value={input.description} onChange={(e) => handleChange(e)}/>
            <label>Released</label>
            <input type="text" name='released' value={input.released} onChange={(e) => handleChange(e)}/>
            <label >Rating</label>
            <input type="number" name='rating' value={input.rating} onChange={(e) => handleChange(e)}/>
            <label>Image</label>
            <input type="text" name='image' value={input.image} onChange={(e) => handleChange(e)}/>
            <button>CREATED GAME</button>
            </form>
        </div>
    )
}

export default Form;