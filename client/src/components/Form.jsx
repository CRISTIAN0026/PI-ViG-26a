import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getGenres, addGame, getPlatform } from '../redux/actions';
import { useNavigate, Link } from 'react-router-dom';
import './Form.css';


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
        if (input.name.length < 2 ) errors.name = 'Add game name';
        for (let i = 0; i < input.name.length; i++) {
            let num = "0123456789-.,;:_/*-+?'¡¿(){}[]><$!#&%=`´¨çÇ@"
            for (let j = 0; j < num.length; j++) {
                if(input.name[i] === num[j]){
                    errors.name = "only letters"
                }
            }
        }
        if (input.description.length < 2) errors.description = 'Add a description';
        for (let k = 0; k < input.description.length; k++) {
            let numm = "0123456789-.,;:_/*-+?'¡¿(){}[]><$!#&%=`´¨çÇ@"
            for (let l = 0; l < numm.length; l++) {
                if(input.description[k] === numm[l]){
                    errors.description = "only letters"
                }
            }
        }
        if (input.rating < 1 || input.rating > 5) errors.rating = 'add a rating of 1 out of 5';
        if(input.genres.length < 1 ) {
            errors.genres = "Add genders to 1 from 5"
        }
        if(input.platforms.length < 1 ) {
            errors.platforms = "Add platforms to 1 from 5"
        }
        let rat = input.released.slice(0,5)
        let ret = input.released.slice(0,4)
        if(rat < 1950 || rat > 2022 || ret < 1950 || ret > 2022){
            errors.released = 'add a year between 1950 and 2022'
        }
        return errors
    }

    useEffect(() =>{
        dispatch(getGenres())
        dispatch(getPlatform())
    }, [dispatch]);

    const handleChange = (e) =>{
        setInput(input => ({
            ...input,
            [e.target.name] : e.target.value,
        }))
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
        alert("Game created")
        nav("/home", { replace : true });
    };

    const handleSelect = (e) =>{
        setInput(input => ({
            ...input,
            genres: [...input.genres, e.target.value]
        }))
        setErrors(validate({
            ...input,
            genres: [...input.genres, e.target.value]
        }))
    };
    
    const handleSelect2 = (e) => {
        setInput(input => ({
            ...input,
            platforms: [...input.platforms, e.target.value]
        }))
        setErrors(validate({
            ...input,
            platforms: [...input.platforms, e.target.value]
        }))
    };
    console.log(input.platforms)
    console.log(input.genres)
    return(
        <div className='form'>
            <div className='form1'>
            
            <form onSubmit={(e) => handleOnSub(e)} className= 'form2'>
            <div id='select'>
            <div>
            <label>Genres</label>
            <select onChange={(e) => handleSelect(e)} defaultValue='genres' disabled={input.genres.length > 4 ? true : false}>
                <option value='genres' disabled>ADD GENRES</option>
            {
                gen?.map(g => (
                    <option value={g.name} key={g.name} disabled={input.genres.includes(g.name) ? true : false}>{g.name}</option>
                ))
            }
            </select>
            {
                errors.genres && (
                    <p>{errors.genres}</p>
                )
            }
            </div>
            <div>
            <label>Platforms</label>
            <select onChange={e => handleSelect2(e)} defaultValue='platforms' disabled={input.platforms.length > 4 ? true : false}>
            <option value='platforms' disabled>ADD PLATFORMS</option>
            {
                plat?.map(p => (
                    <option value={p.name} key={p.name} disabled={input.platforms.includes(p.name) ? true : false}>{p.name}</option>
                ))
            }
            </select>
            {
                errors.platforms && (
                    <p>{errors.platforms}</p>
                )
            }
            </div>
            </div>
            <div>
            <label>Name</label>
            <input type="text" name='name' value={input.name} onChange={(e) => handleChange(e)}/>
            {
                errors.name && (
                    <p>{errors.name}</p>
                )
            }
            </div>
            <div>
            <label>Description</label>
            <textarea type="text" name="description" id="" cols="10" rows="5" value={input.description} onChange={(e) => handleChange(e)}></textarea>
            {
                errors.description && (
                    <p>{errors.description}</p>
                )
            }
            </div>
            <div>
            <label>Released</label>
            <input type="date" name='released' placeholder='00/00/0000' value={input.released} onChange={(e) => handleChange(e)}/>
            {
                errors.released && (
                    <p>{errors.released}</p>
                )
            }
            </div>
            <div>
            <label >Rating</label>
            <input type="number" name='rating' value={input.rating} onChange={(e) => handleChange(e)}/>
            {
                errors.rating && (
                    <p>{errors.rating}</p>
                )
            }
            </div>
            <div>
            <label>Image</label>
            <input type="text" name='image' value={input.image} onChange={(e) => handleChange(e)}/>
            </div>
            <button>CREATED GAME</button>
            </form>
            <div>
            <Link to='/home'><button>RETURN GAMES</button></Link>
            </div>
            </div>
        </div>
    )
}

export default Form;