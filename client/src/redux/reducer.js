
import { GET_GAMES, GET_DETAILS, GET_GENRES, ADD_GAME, GET_BY_NAME, GET_PLATFORM } from './actions';

let initialState = {
    games:[],
    allGames: [],
    genres:[],
    details:[],
    platform:[]
}

const reDucer = (state = initialState, action) =>{
    switch (action.type) {
        case GET_GAMES:
            return {
                ...state,
                games: action.payload,
                allGames: action.payload
            }
        case GET_DETAILS:
            return {
                ...state,
                details: action.payload
            }
        case GET_GENRES:
            return {
                ...state,
                genres: action.payload
            }
        case ADD_GAME:
            return {
                ...state
            }
        case GET_BY_NAME:
            return {
                ...state,
                games: action.payload
            }
        case GET_PLATFORM:
            return {
                ...state,
                platform: action.payload
            }
        default:
            return state
    }
}

export default reDucer