import React,{useState} from 'react'
import {Link,useHistory, useLocation} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import {actionCreators} from "../state/index";
import { useDispatch } from 'react-redux';
import { search} from '../state/action-creators';
import { useRef } from 'react';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Navbar = () => {
    
    const dispatch = useDispatch();
    const history=useHistory(); 
    const {logout}=bindActionCreators(actionCreators,dispatch);
    let state=(useSelector(state=>state.state));
    let user=useSelector(state=>state.profile) || [];
    let searchResults=(useSelector(state=>state.searchResults));
    const [name,setname]=useState("");
    const ref=useRef(null);
    const close=useRef(null);
    let location=useLocation();
    let url='/login';
    if(user[0]){
        url=`/profile/${user[0]._id}`;
    }
    const handlelogout=(e)=>{
        e.preventDefault();
        localStorage.removeItem('token');
        localStorage.removeItem('state');
        logout(true);
    }
    const onchange=(e)=>{
        setname(e.target.value);
    }

    const onSearch=(e)=>{
        e.preventDefault();
        dispatch(search(name));
        ref.current.click();
        setname("");
    }
    const linktoprofile=(id)=>{
        let link='/profile/'+id;
        history.push(link);
        close.current.click();
    }
    return (
        <>
        <div className='sticky-top' style={{width:'100%'}}>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">Mern Project</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                        <Link className={`nav-link ${location.pathname==='/'?'active':""}`} aria-current="page" to="/"><i className="fas fa-home"></i>Home</Link>
                        </li>
                        <li className="nav-item">
                        <Link className={`nav-link ${location.pathname===url ?'active':""}`} to={`${url}`}><i className="fas fa-users"></i>Profile</Link>
                        </li>
                    </ul>
                    {!state ? <form className="d-flex">
                        <Link className="btn btn-primary mx-2" to="/login" role="button">Login</Link>
                        <Link className="btn btn-primary" to="/signup" role="button">Signup</Link>
                    </form> : <form className="d-flex">
                        <input className="form-control me-2" value={name} name="name" onChange={onchange}  type="search"  placeholder="Search Friends" aria-label="Search"/>
                        <button className="btn btn-outline-success mx-3" type="submit"  onClick={onSearch}>Search</button>
                        <Link className="btn btn-primary mx-2" to="/logout" onClick={handlelogout} role="button">Logout</Link>
                    </form> }
                    </div>
                </div>
                </nav>
        </div>

            {/* searchModal */}

            <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Search Results</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <div className="card">
                        <ul className="list-group list-group-flush">
                            {searchResults.map((name)=><li className="list-group-item" style={{cursor:'pointer'}} key={name._id} onClick={()=>linktoprofile(name._id)}>{name.name}</li>)}
                        </ul>
                    </div>
                </div>
                <div className="modal-footer">
                    <button type="button" ref={close} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-primary d-none">Save changes</button>
                </div>
                </div>
            </div>
            </div>
            <ToastContainer autoClose={1500}/>
        </>
    )
}
