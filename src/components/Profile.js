import React,{useRef,useState,useEffect} from 'react'
import {useParams,Redirect, useHistory} from 'react-router-dom';
import { useSelector } from 'react-redux';
import {updateProfile} from '../state/action-creators';
import { useDispatch } from 'react-redux';


export const Profile = () => {
    
    const dispatch = useDispatch();
    const history=useHistory();
    const {id}=useParams();
    let user=useSelector(state=>state.profile);
    let state= useSelector(state=>state.state);
    const [profile,setProfile]=useState({name:""});
    const ref=useRef(null);
    const close=useRef(null);
    const [data,setData]=useState([{}]);
     

    useEffect(() => {
        if(state){
            fetchUser(id);
        }
        // eslint-disable-next-line
    }, [id]);

    if(!state){
        return <Redirect to="/login"/>
    }
    const fetchUser=async(id)=>{
        try{
            const res=await fetch(`http://localhost:5000/user/profile/${id}`,{
                method:'GET',
                headers:{
                    'Content-Type': 'application/json',
                    'auth-token':localStorage.getItem('token')
                }
            });
            const json=await res.json();
            if(json.success===true){
                setData(json.profile);
            }else{
                history.push('/');
            }
        }catch(error){

            console.log(error);
        }
    }

    
    const userurl="http://localhost:5000"+user[0].avatar;
    const url="http://localhost:5000"+data[0].avatar;
    const onchange=(e)=>{
        setProfile({...profile,[e.target.name]:e.target.value});
    }
    const onclick=(e)=>{
        e.preventDefault();  
        ref.current.click();
    }

    const onsubmit=(e)=>{
        e.preventDefault();  
        let avatar=document.getElementById('avatar');
        dispatch(updateProfile(user[0]._id,profile.name,avatar.files[0]));
        close.current.click();
    }

    if(user[0]._id===id){
            return (
                <>
                <div>
                    
                    <div className="card my-3" style={{width: "18rem",margin:"auto"}}>
                    <img src={`${userurl}`} className="card-img-top" alt="profile"/>
                    <div className="card-body">
                        <h5 className="card-title">{user[0].name}</h5>
                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        <button className="btn btn-outline-success" onClick={onclick}>Update</button>
                    </div>
                    </div>
                </div>
                <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal1">
                    Launch demo modal
                    </button>

                    <div className="modal fade" id="exampleModal1" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Search Results</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                        <form encType="multipart/form-data" onSubmit={onsubmit}>
                            <div className="mb-3">
                                <label htmlFor="Profile Pic" className="form-label">Profile Picture</label>
                                <input type="file" className="form-control"  name="avatar" onChange={onchange} id="avatar" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="Name" className="form-label">Name</label>
                                <input type="text" className="form-control" value={profile.name} placeholder={user[0].name} onChange={onchange} name="name" id="name"/>
                            </div>
                            <button type="submit" className="btn btn-primary" >Submit</button>
                        </form>
                        

                        </div>
                        <div className="modal-footer">
                            <button type="button" ref={close} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                        </div>
                    </div>
                    </div>
                </>
            )
    }else{
        return(
            <>
                <div>
                    
                    <div className="card my-3" style={{width: "18rem",margin:"auto"}}>
                    <img src={`${url}`} className="card-img-top" alt="profile"/>
                    <div className="card-body">
                        <h5 className="card-title">{data[0].name}</h5>
                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    </div>
                    </div>

                </div>
            </>
        )
    }
}
