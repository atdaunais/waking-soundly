import {GET_TRANSITIONS} from "../actions/types.js";

const initialState = {
    transitions: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_TRANSITIONS:
            return {
                ...state,
                transitions: action.payload
            };
        default:
            return state;
    }
}