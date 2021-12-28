import {combineReducers} from "redux";
import state from "./state";
import searchResults  from "./search";
import profile from "./profile";

const reducers=combineReducers({
    state:state,
    searchResults:searchResults,
    profile:profile,
})

export default reducers;