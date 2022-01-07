import React,{useState,useEffect} from 'react';
import { useDispatch } from 'react-redux';
import {Redirect} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { signup } from '../state/action-creators';
// import { bindActionCreators } from 'redux';
// import {actionCreators} from "../state/index";

export const Signup = () => {
    const dispatch = useDispatch();
    // const {signup}=bindActionCreators(actionCreators,dispatch);
    const [data,setdata]=useState({name:"",email:"",password:""});
    let state= useSelector(state=>state.state);

    useEffect(() => {
        document.title='SignUp'
    }, []);

    if(state){
        return <Redirect to="/"/>
    }
    const onchange=(e)=>{
        setdata({...data,[e.target.name]:e.target.value});
    }
    function onclick(e){
        e.preventDefault();
        dispatch(signup(data));
    }
    return (
        <div>
            <form className='container w-25 border my-3 bg-secondary text-white' style={{minWidth:'300px'}}>
                <h1>SignUp</h1>
                <div className="mb-3" >
                    <label htmlFor="name" className="form-label" >Name</label>
                    <input type="text" className="form-control"  name="name" id="name" onChange={onchange} aria-describedby="emailHelp"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label" >Email address</label>
                    <input type="email" className="form-control"  name="email" id="email"  onChange={onchange} aria-describedby="emailHelp"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" name='password' onChange={onchange} id="exampleInputPassword1"/>
                </div>
                <button type="submit"  onClick={onclick} className="btn btn-primary mb-1">SignUp</button>
                </form>
        </div>
    )
}
