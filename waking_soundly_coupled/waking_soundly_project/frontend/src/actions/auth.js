import axios from 'axios';
import {USER_LOADED, USER_LOADING, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT_SUCCESS, REGISTER_SUCCESS, REGISTER_FAIL} from './types'

// CHECK TOKEN AND LOAD USER
export const loadUser = () => (dispatch, getState) => {
//      user loading
    dispatch({type: USER_LOADING});

    axios.get('/auth/user', tokenConfig(getState))
        .then(resp => {
            dispatch({
                type: USER_LOADED,
                payload: resp.data
            });
        })
        .catch(err => {
            console.log(err);
            dispatch({
                type: AUTH_ERROR
            });
        })
};

// LOGIN USER
export const login = (username, password) => (dispatch) => {
//    headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    // Request body
    const body = JSON.stringify({username, password});

    axios.post('/auth/login', body, config)
        .then(resp => {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: resp.data
            });
        })
        .catch(err => {
            console.log(err);
            dispatch({
                type: LOGIN_FAIL
            });
        })
};

// REGISTER
export const register = ({ username, email, password }) => (dispatch) => {
//    headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    // Request body
    const body = JSON.stringify({username, email, password});

    axios.post('/auth/register', body, config)
        .then(resp => {
            dispatch({
                type: REGISTER_SUCCESS,
                payload: resp.data
            });
        })
        .catch(err => {
            console.log(err);
            dispatch({
                type: REGISTER_FAIL
            });
        })
};

// LOGOUT USER
export const logout = () => (dispatch, getState) => {
    axios.post('/auth/logout', null, tokenConfig(getState))
        .then(resp => {
            dispatch({
                type: LOGOUT_SUCCESS,
            });
        })
        .catch(err => {
            console.log(err);
        })
};

// Setup config with token - helper function
export const tokenConfig = getState => {
    // get token from state
    const token = getState().auth.token;

    // headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    // if token, add to headers config
    if (token) {
        config.headers['Authorization'] = `Token ${token}`;
    }
    return config;
};
