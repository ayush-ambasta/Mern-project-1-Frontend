import React from 'react';
import {Redirect} from 'react-router-dom';
import { useSelector } from 'react-redux';
export const Home = () => {
    let state=useSelector(state=>state.state);
    if(!state){
        return <Redirect to="/login"/>
    }
    return (
        <div>
            <h1>Home</h1>
        </div>
    )
}
