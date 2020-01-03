import axios from 'axios';

import { GET_TRANSITIONS } from './types';

// GET TRANSITION MUSIC
export const getTransitionMusic = () => dispatch => {
    axios.get('/transition/')
        .then(resp => {
            dispatch({
                type: GET_TRANSITIONS,
                payload: resp.data
            });
        })
        .catch(err => console.log(err))
};