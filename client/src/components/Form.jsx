import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getGenres, addGame, getPlatform } from '../redux/actions';
import { useNavigate } from 'react-router-dom';



const Form = () =>{
    let dispatch = useDispatch();
    let gen = useSelector(state => state.genres);
    let plat= useSelector(state => state.platform);
    const [errors, setErrors] = useState({}); 
    let nav = useNavigate();

    const [input, setInput] = useState({
        name:'',
        description:'',
        released:'',
        image:'',
        rating:'',
        platforms:[],
        genres:[]
    });
    
    const validate = () => {
        let errors = {}
        if (input.name.length < 2 ) errors.name = 'Add recipe name';
        for (let i = 0; i < input.name.length; i++) {
            let num = "0123456789-.,;:_/*-+?'¡¿(){}[]><$!#&%=`´¨çÇ"
            for (let j = 0; j < num.length; j++) {
                if(input.name[i] === num[j]){
                    errors.name = "only letters"
                }
            }
        }
        if (input.description.length < 2) errors.description = 'Add a description';
        for (let k = 0; k < input.description.length; k++) {
            let numm = "0123456789-.,;:_/*-+?'¡¿(){}[]><$!#&%=`´¨çÇ"
            for (let l = 0; l < numm.length; l++) {
                if(input.description[k] === numm[l]){
                    errors.description = "only letters"
                }
            }
        }
        if (input.rating < 1 || input.rating > 5) errors.rating = 'add a rating of 1 out of 5';
        if(input.genres.length < 1) {
            errors.genres = "Add genres"
        }
        if(input.platforms.length < 1) {
            errors.platforms = "Add platforms"
        }
        return errors;
    }

    useEffect(() =>{
        dispatch(getGenres())
        dispatch(getPlatform())
    }, [dispatch]);

    const handleChange = (e) =>{
        setInput({
            ...input,
            [e.target.name] : e.target.value,
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value,
        }));
    };
    
    const handleOnSub = (e) =>{
        e.preventDefault()
        if(errors.name || errors.description || errors.rating 
        || errors.diets || (input.name === '')) return alert("add date")
        dispatch(addGame(input))
        nav("/home", { replace : true });
    };

    const handleSelect = (e) =>{
        setInput({
            ...input,
            genres: [...input.genres, e.target.value]
        })
        console.log(input.genres)
    };
    
    const handleSelect2 = (e) => {
        setInput(input => ({
            ...input,
            platforms: [...input.platforms, ...e.target.value]
        }))
    };
    

    return(
        <div>
            <form onSubmit={(e) => handleOnSub(e)}>
            <label>Genre</label>
            <select onChange={(e) => handleSelect(e)}>
            {
                gen?.map(g => (
                    <option value={g.name} key={g.name}>{g.name}</option>
                ))
            }
            </select>
            {
                errors.genres && (
                    <p>{errors.genres}</p>
                )
            }
            <label>Platforms</label>
            <select onChange={e => handleSelect2(e)}>
            {
                plat?.map(p => (
                    <option key={p.name} value={p.name}>{p.name}</option>
                ))
            }
            </select>
            {
                errors.platforms && (
                    <p>{errors.platforms}</p>
                )
            }
            <label>Name</label>
            <input type="text" name='name' value={input.name} onChange={(e) => handleChange(e)}/>
            {
                errors.name && (
                    <p>{errors.name}</p>
                )
            }
            <label>Description</label>
            <input type="text" name='description' value={input.description} onChange={(e) => handleChange(e)}/>
            {
                errors.description && (
                    <p>{errors.description}</p>
                )
            }
            <label>Released</label>
            <input type="date" name='released' value={input.released} onChange={(e) => handleChange(e)}/>
            <label >Rating</label>
            <input type="number" name='rating' value={input.rating} onChange={(e) => handleChange(e)}/>
            {
                errors.rating && (
                    <p>{errors.rating}</p>
                )
            }
            <label>Image</label>
            <input type="text" name='image' value={input.image} onChange={(e) => handleChange(e)}/>
            <button>CREATED GAME</button>
            </form>
        </div>
    )
}

export default Form;