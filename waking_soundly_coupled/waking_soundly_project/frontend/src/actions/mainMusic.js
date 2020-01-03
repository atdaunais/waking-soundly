import axios from 'axios';

import { GET_MAINMUSIC } from './types';

// GET DEFAULT MUSIC
export const getMainMusic = () => dispatch => {
    axios.get('/main_song/')
        .then(resp => {
            dispatch({
                type: GET_MAINMUSIC,
                payload: resp.data
            });
        })
        .catch(err => console.log(err))
};