import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export const PagenotFound = () => {
    let state= useSelector(state=>state.state);
    return (
        <>
        <h1 style={{marginTop:'30vh',marginLeft:'30vw'}}>404 Page Not Found</h1>
        {(state) ? <Link to='/' className='btn btn-primary'style={{marginLeft:'30vw'}} >Go Back to Home Page</Link>:<Link to='/login' className='btn btn-primary' style={{marginLeft:'30vw'}}>Go Back to Login Page</Link>}
        </>
    )
}
