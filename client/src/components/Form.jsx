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
            errors.released = 'Add a year between 1950 and 2022'
        }
        if(input.image.length < 5 ){
            errors.image = 'Add image'
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
        || errors.platforms || errors.released || errors.genres || errors.image || (input.name === '')) return alert("add date")
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

    const handleDelete = (e) =>{
        setInput({
            ...input,
            genres: input.genres.filter(g => g !== e)
        })
    }
    
    const handleDelete1 = (e) => {
        setInput({
            ...input,
            platforms: input.platforms.filter(g => g !== e)
        })
    }

    return(
        <div className='form'>
            <div>
            <h1>Created Game</h1>
            <div className='form1'>
            
            <form onSubmit={(e) => handleOnSub(e)} className= 'form2'>
            <div id='select'>
            <div>
            <label>Genres</label>
            <select className='select11' onChange={(e) => handleSelect(e)} defaultValue='genres' disabled={input.genres.length > 4 ? true : false}>
                <option value='genres' disabled>ADD GENRES</option>
            {
                gen?.map(g => (
                    <option value={g.name} key={g.name} disabled={input.genres.includes(g.name) ? true : false}>{g.name}</option>
                ))
            }
            </select>
            {
                errors.genres && (
                    <p className='error' id='genres12'>{errors.genres}</p>
                )
            }
            </div>
            <div>
            <label>Platforms</label>
            <select className='select11' onChange={e => handleSelect2(e)} defaultValue='platforms' disabled={input.platforms.length > 4 ? true : false}>
            <option value='platforms' disabled>ADD PLATFORMS</option>
            {
                plat?.map(p => (
                    <option value={p.name} key={p.name} disabled={input.platforms.includes(p.name) ? true : false}>{p.name}</option>
                ))
            }
            </select>
            {
                errors.platforms && (
                    <p className='error' id='platforms13'>{errors.platforms}</p>
                )
            }
            </div>
            <div>
            <label>Released</label>
            <input type="date" name='released' id='re01' value={input.released} onChange={(e) => handleChange(e)}/>
            {
                errors.released && (
                    <p className='error' id='release1'>{errors.released}</p>
                )
            }
            </div>
            </div>
            <div id='name'>
            <label>Name</label>
            <input type="text" name='name' id='name1' value={input.name} onChange={(e) => handleChange(e)}/>
            <div>
            {
                errors.name && (
                    <p className='error' id='name3'>{errors.name}</p>
                )
            }
            </div>
            </div>
            <div className='des'>
            <label>Description</label>
            <textarea type="text" name="description" id="des20" cols="50" rows="5" value={input.description} onChange={(e) => handleChange(e)}></textarea>
            {
                errors.description && (
                    <p className='error' id='des12'>{errors.description}</p>
                )
            }
            </div>
            
            <div className='ratimg'>
            <label >Rating</label>
            <input type="number" name='rating' className='se' value={input.rating} onChange={(e) => handleChange(e)}/>
            {
                errors.rating && (
                    <p className='error' id='rat1'>{errors.rating}</p>
                )
            }
            </div>
            <div className='ratimg'>
            <label>Image</label>
            <input type="text" name='image' className='se' value={input.image} onChange={(e) => handleChange(e)}/>
            <div>
            {
                errors.image && (
                    <p className='error' id='image'>{errors.image}</p>
                )
            }
            </div>
            </div >
            <button id='add'>CREATED GAME</button>
            </form>
            <div id='home101'>
            <Link to='/home'><button id='home100'>RETURN GAMES</button></Link>
            </div>
            </div>
            </div>
            <div>
            <div className='GnPl'>
                <div>
                <h3>Genres</h3>
                </div>
                <div className='GenPlat'>
                {input.genres.map(e => 
            <div  className='card'>
                <div>
                <p className='GP'>{e}</p>
                </div>
                <div className='gtd'>
                <button className='but'  onClick={() => handleDelete(e)}>x</button>
                </div>
            </div>)
            }
                </div>
            </div>
            <div className='GnPl'>
                <div>
                <h3>Platforms</h3>
                </div>
                <div className='GenPlat'>
                {input.platforms.map(e => 
            <div  className='card'>
                <div>
                <p className='GP'>{e}</p>
                </div>
                <div className='gtd'>
                <button  className='but' onClick={() => handleDelete1(e)}>x</button>
                </div>
            </div>)
            }
                </div>
            </div>
            </div>
        </div>
    )
}

export default Form;