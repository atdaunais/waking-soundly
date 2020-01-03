import axios from 'axios';
import { GET_USERMUSIC, DELETE_USERMUSIC, ADD_USERMUSIC, EDIT_USERMUSIC } from './types';
import {tokenConfig} from "./auth";

// GET USER MUSIC
export const getUserMusic = () => (dispatch, getState) => {
    axios.get('/user_song/', tokenConfig(getState))
        .then(resp => {
            dispatch({
                type: GET_USERMUSIC,
                payload: resp.data
            });
        })
        .catch(err => console.log(err))
};

// DELETE USER MUSIC
export const deleteUserMusic = (songid) => (dispatch, getState) => {
    axios.delete(`/user_song/${songid}/`, tokenConfig(getState))
        .then(resp => {
            dispatch({
                type: DELETE_USERMUSIC,
                payload: songid
            });
        })
        .catch(err => console.log(err))
};

//ADD USER MUSIC
export const addUserMusic = (song) => (dispatch, getState) => {
    axios.post('/user_song/', song, tokenConfig(getState))
        .then(resp => {
            dispatch({
                type: ADD_USERMUSIC,
                payload: resp.data
            });
        })
        .catch(err => console.log(err))
};

// EDIT USER MUSIC
export const editUserMusic = (songid, song) => (dispatch, getState) => {
    axios.put(`/user_song/${songid}/`, song, tokenConfig(getState))
        .then(resp => {
            dispatch({
                type: EDIT_USERMUSIC,
                id: songid,
                payload: resp.data
            });
        })
        .catch(err => console.log(err))
};
