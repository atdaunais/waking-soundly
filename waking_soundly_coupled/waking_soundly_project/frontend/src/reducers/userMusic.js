import {GET_USERMUSIC, DELETE_USERMUSIC, ADD_USERMUSIC, EDIT_USERMUSIC} from "../actions/types.js";

const initialState = {
    userMusic: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_USERMUSIC:
            return {
                ...state,
                userMusic: action.payload
            };
        case DELETE_USERMUSIC:
            return {
                ...state,
                userMusic: state.userMusic.filter(song => song.id !== action.payload)
            };
        case ADD_USERMUSIC:
            return {
                ...state,
                userMusic: [...state.userMusic, action.payload]
            };
        case EDIT_USERMUSIC:
            return {
                ...state,
                userMusic: state.userMusic.map(song => {
                    if (song.id === action.id) {
                        return {
                            ...song,
                            songURL: action.payload.songURL,
                            key: action.payload.key,
                            name: action.payload.name
                        }
                    } else {
                        return song;
                    }
                })
            };
        default:
            return state;
    }
}