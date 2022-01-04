import {combineReducers} from "redux";
import state from "./state";
import searchResults  from "./search";
import profile from "./profile";
import post from "./post";
import postbyId  from "./postbyId";

const reducers=combineReducers({
    state:state,
    searchResults:searchResults,
    profile:profile,
    post:post,
    postbyId:postbyId
})

export default reducers;