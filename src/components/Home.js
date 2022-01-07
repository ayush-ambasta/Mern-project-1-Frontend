import React,{useEffect} from 'react';
import './home.css'
import {Redirect} from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import { Createpost } from './Createpost';
import { Getallpost } from './Getallpost';
import {getallPost} from '../state/action-creators'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Home = () => {

    const state=useSelector(state=>state.state);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getallPost());
        document.title='Home';
        // eslint-disable-next-line
    }, []);
    

    if(!state){
        return <Redirect to="/login"/>
    }
    return(
        <>
        <div className='home-container'>
            <div className='left-container'><Createpost/></div>
            <div className='middle-conatiner'><Getallpost/></div>
            <ToastContainer/>
        </div>
        </>
    )
}
