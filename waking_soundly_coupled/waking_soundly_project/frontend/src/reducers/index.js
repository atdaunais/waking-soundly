import { combineReducers } from "redux";
import userMusic from './userMusic';
import mainMusic from "./mainMusic";
import transitions from "./transitionMusic";
import auth from "./auth";

export default combineReducers({
    userMusic,
    mainMusic,
    transitions,
    auth
});
