import {GET_MAINMUSIC} from "../actions/types.js";

const initialState = {
    mainMusic: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_MAINMUSIC:
            return {
                ...state,
                mainMusic: action.payload
            };
        default:
            return state;
    }
}