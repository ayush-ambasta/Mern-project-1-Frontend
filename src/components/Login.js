import React,{useState,useEffect} from 'react';
import { useDispatch } from 'react-redux';
import {Redirect} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { login } from '../state/action-creators';


export const Login = () => {

    const dispatch = useDispatch();
    const [data,setdata]=useState({email:"",password:""});
    let state= useSelector(state=>state.state);

    useEffect(() => {
        document.title='Login'
    }, []);

    if(state){
        return <Redirect to="/"/>
    }
    const onchange=(e)=>{
        setdata({...data,[e.target.name]:e.target.value});
    }
    function onclick(e){
        e.preventDefault();
        dispatch(login(data));
    }

    return (
        <div>
            <form className='container w-25 border my-3 bg-secondary text-white' style={{minWidth:'300px'}} onSubmit={onclick}>
                <h1>Login</h1>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label" >Email address</label>
                    <input type="email" className="form-control"  name="email" id="email"  onChange={onchange} aria-describedby="emailHelp"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" name='password' onChange={onchange} id="exampleInputPassword1"/>
                </div>
                <button type="submit" className="btn btn-primary mb-1">Login</button>
                </form>
                
        </div>
    )
}
