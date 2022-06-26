
import { GET_GAMES, GET_DETAILS, GET_GENRES, ADD_GAME, GET_BY_NAME, GET_PLATFORM, GET_DB, FILTER_GENRES, FILTER_ALPHABETICALLY, FILTER_RATING } from './actions';

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
        case GET_DB:
            return {
                ...state,
                games: action.payload
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
        case FILTER_GENRES:
            const allGames = state.allGames
            const rex = allGames.filter(g => g.genres?.some(g => g.name.toLowerCase() === action.payload.toLowerCase()))
            return {
                ...state,
                games: rex
            }
        case FILTER_ALPHABETICALLY:
            let game = [...state.games]       
        game = action.payload === 'az' ?
        state.games.sort((a, b) => {
            if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
            if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
            return 0;
        }) :
        state.games.sort((a, b) => {
            if (a.name.toLowerCase() < b.name.toLowerCase()) return 1;
            if (a.name.toLowerCase() > b.name.toLowerCase()) return -1;
            return 0;
        });          
        return {
            ...state,
            games: game
        };
        case FILTER_RATING:
            let rating1 = [...state.games] 
            rating1 = action.payload === 'asc' ?
            state.games.sort((a, b) => {
            if (a.rating > b.rating) return 1;
            if (a.rating < b.rating) return -1;
            return 0;
        }) :
        state.games.sort((a, b) => {
            if (a.rating < b.rating) return 1;
            if (a.rating > b.rating) return -1;
            return 0;
        });
        return {
            ...state,
            games: rating1
        };
        default:
            return state
    }
}

export default reDucer