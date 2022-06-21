import axios from 'axios';

export let GET_GAMES = 'GET_GAME';
export let GET_GENRES = 'GET_GENRES';
export let ADD_GAME = 'ADD_GAME';
export let GET_DETAILS = 'GET_DETAILS';
export let GET_BY_NAME = 'GET_BY_NAME';
export let GET_PLATFORM = 'GET_PLATFORM';


export const getGames = () => {
    return async (dispatch) => {
        try {
            let response = (await axios('http://localhost:3001/videogames')).data
            return dispatch({
                type:GET_GAMES,
                payload: response 
            })
        } catch (error) {
            return error
        }
    }
}

export const getGenres = () => {
    return async (dispatch) => {
    try {
        let response = (await axios('http://localhost:3001/genres')).data
        return dispatch({
            type: GET_GENRES,
            payload: response
        })
    } catch (error) {
        return error
    }
    }
}

export const addGame = (payload) => {
    return async () => {
        try {
            let response = await axios.post('http://localhost:3001/videogames', payload)
            return response
        } catch (error) {
            return alert(error)
        }
    }
}

export const getDetails = (id) => {
    return async (dispatch) => {
        try {
            let response = (await axios(`http://localhost:3001/videogames/${id}`)).data
            return dispatch({
                type: GET_DETAILS,
                payload: response
            })
        } catch (error) {
            return error
        }
    }
}

export const getByName = (payload) => {
    return async (dispatch) => {
        try {
            let response = (await axios(`http://localhost:3001/videogames?name=${payload}`)).data
            return dispatch({
                type: GET_BY_NAME,
                payload: response
            })
        } catch (error) {
            return alert(error)
        }
    }
}

export const getPlatform = () => {
    return async (dispatch) => {
        try {
            let response = (await axios('http://localhost:3001/platform')).data
            return dispatch({
                type: GET_PLATFORM,
                payload: response
            })
        } catch (error) {
            return error
        }
    }
}