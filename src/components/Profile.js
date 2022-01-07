import React,{useRef,useState,useEffect} from 'react'
import {useParams,Redirect, useHistory,Link} from 'react-router-dom';
import { useSelector } from 'react-redux';
import {deleteAvatar, updateProfile} from '../state/action-creators';
import { useDispatch } from 'react-redux';
import { getpostbyId } from '../state/action-creators';
import { Createcomment,deletePost,updatePost,deleteComment,updateComment,likepost,likecomment} from '../state/action-creators';
import defaultprofile from '../default/profile/profile.jpg';
import './profile.css'

export const Profile = () => {
    
    const dispatch = useDispatch();
    const history=useHistory();
    const {id}=useParams();
    let user=useSelector(state=>state.profile);
    let state= useSelector(state=>state.state);
    let posts=useSelector(state=>state.postbyId);
    const [profile,setProfile]=useState({name:""});
    const ref=useRef(null);
    const close=useRef(null);
    const [data,setData]=useState([{}]);
    const [Comment, setComment] = useState("");
    const [postId,setpostId]=useState("");
    const [commentId,setcommentId]=useState("");
    const editpost=useRef(null);
    const editcomment=useRef(null);
    const closeditpost=useRef(null);
    const closeComment=useRef(null);
    const [econtent,setecontent]=useState("");
    const [ecomment,setecomment]=useState("");
    const currentuser=JSON.parse(localStorage.getItem('profile'));

    useEffect(() => {
        if(state){
            fetchUser(id);
            dispatch(getpostbyId(id));
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
                document.title=`Profile | ${json.profile[0].name}`
            }else{
                history.push('/');
            }
        }catch(error){

            console.log(error);
        }
    }
    if(!currentuser[0]){
        currentuser[0]={_id:''}
    }
    let userurl="http://localhost:5000"+user[0].avatar;
    let url="http://localhost:5000"+data[0].avatar;

    if(!user[0].avatar){
        userurl=defaultprofile;
    }

    if(!data[0].avatar){
        url=defaultprofile;
    }

    const onchange=(e)=>{
        setecontent(e.target.value);
        setProfile({...profile,[e.target.name]:e.target.value});
        setecomment(e.target.value);
    }
    const onclick=(e)=>{
        e.preventDefault();  
        ref.current.click();
    }

    //to deleteAvatar
    const ondelete=(e)=>{
        e.preventDefault();
        dispatch(deleteAvatar(id));
    }

    //to update profile name and avatar
    const onsubmit=(e)=>{
        e.preventDefault();  
        let avatar=document.getElementById('avatar');
        dispatch(updateProfile(user[0]._id,profile.name,avatar.files[0]));
        close.current.click();
    }

    //to create post
    const submit=(postid,userid=id)=>{
        dispatch(Createcomment(postid,Comment,userid));
        setComment("");
    }

    //open post modal
    const clickeditpost=(postid,content)=>{
        setpostId(postid);
        setecontent(content);
        editpost.current.click();
    }

    //to update post
    const onupdatePost=(postid,userid=id)=>{
        let file=document.getElementById('Updatefile');
        dispatch(updatePost(econtent,file.files[0],postid,userid));
        closeditpost.current.click();
    }

    //open comment modal
    const clickeditcomment=(commentid,content)=>{
        setcommentId(commentid);
        setecomment(content);
        editcomment.current.click();
    }

    //to update comment
    const onupdateComment=(commentid,userid=id)=>{
        dispatch(updateComment(ecomment,commentid,userid));
        closeComment.current.click();
    }

    //to delete post
    const clickdeletepost=(postid,userid=id)=>{
        dispatch(deletePost(postid,userid));
    }

    //to delete comment
    const clickdeletecomment=(commentid,userid=id)=>{
        dispatch(deleteComment(commentid,userid));
    }

    const commentModal=()=>{
        return(
            <>
            <button type="button" className="btn btn-primary d-none" ref={editcomment} data-bs-toggle="modal" data-bs-target="#update-comment">
                    update comment
                    </button>

                    <div className="modal fade" id="update-comment" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Update Comment</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={(e)=>{e.preventDefault();onupdateComment(commentId)}}>
                            <div className="mb-3">
                                    <label htmlFor="c-content" className="col-form-label">Comment:</label>
                                    <textarea name='c-content' className="form-control" onChange={onchange} id='c-content' value={ecomment}></textarea>
                            </div>
                            <button type="submit"  className="btn btn-primary">Update Comment</button>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" ref={closeComment} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                        </div>
                    </div>
                    </div>
            </>
        )
    }

     //userwholikedpost
     const userlikedpost=(profile,likes)=>{
        let isPresent=false;
        likes.forEach((element)=>{if(profile[0]._id === element.user){isPresent=true}});
        return isPresent;
    }

    //userwholikedcomment
    const userlikedcomment=(profile,likes)=>{
        let isPresent=false;
        likes.forEach((element)=>{if(profile[0]._id === element.user){isPresent=true}});
        return isPresent;
    }

    //to show logged in user profile
    if(user[0]._id===id){
            return (
                <>
                <div className='profile-container'> 
                    <div className="card my-3 profile-pic">
                    <img src={`${userurl}`} className="card-img-top profile-img" alt="profile"/>
                    <div className="card-body">
                        <h5 className="card-title">{user[0].name}</h5>
                        <button className="btn btn-outline-success" onClick={onclick}>Update</button>
                        <button type="button" className="btn btn-outline-danger mx-2"data-toggle="tooltip" data-placement="top" title="Remove Profile Picture" onClick={ondelete}>Delete</button>
                    </div>
                    </div>
                <div className='post-container'>
                {/* Post */}
                {posts.map((post)=>
                <div className="card post-card my-3 profile-mid"key={post._id}>
                    <div className='post-title'>     
                    <h5 className="card-title mx-3 my-3"><Link to={`/profile/${post.user}`} style={{textDecoration:'none'}}>{user[0].name}</Link></h5>
                    <h5 className='my-3 mx-3'>
                    <i type='button' onClick={(e)=>{e.preventDefault();clickeditpost(post._id,post.content)}} className="fas fa-edit mx-3"></i>
                    <i type='button' onClick={(e)=>{e.preventDefault();clickdeletepost(post._id)}} className="fas fa-trash post-delete"></i>
                    </h5>
                    </div>
                    <hr style={{marginTop:"-10px"}}/>
                    <div className="card-body">
                    <p className="card-text">{post.content}</p>
                    
                    {(()=>{
                        if(post.file){
                            if(post.file){
                                let ext=post.file.split('.').pop();
                                if(ext==='png' ||ext==='jpg'||ext==='jpeg'){
                                    return <img src={`http://localhost:5000${post.file}`} className="img" alt="..."/>
                                }else{
                                    return <video controls>
                                    <source src={`http://localhost:5000${post.file}`} type="video/mp4"/>
                                    Your browser does not support the video tag.
                                  </video>
                                }
                            }
                        }
                    })()}
                    </div>
                    {/* Comment */}
                    <hr style={{marginBottom:"0px"}}/>
                    <ul type='none' id='posts'>
                        <li className='posts-like'><i className="far fa-thumbs-up" style={{color:`${userlikedpost(JSON.parse(localStorage.getItem('profile')),post.likes)?'blue':'black'}`}}type='button' onClick={(e)=>{e.preventDefault();dispatch(likepost(post._id,id))}}>{(post.likes).length}</i></li>
                        <li className='comment-btn'><i className="fas fa-comment-alt comment accordion-button collapsed" data-bs-toggle="collapse" data-bs-target={`#a${post._id}`} aria-expanded="false" aria-controls="flush-collapseOne" type='button'>Comment</i></li></ul>                   
                        <div className="accordion accordion-flush" id="accordionFlushExample">
                        <div className="accordion-item">
                            <div id={`a${post._id}`} className="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                            <div className="accordion-body">
                                <form>
                                <label htmlFor="comment-content" className="col-form-label">Write Comment</label>
                                <textarea name='comment-content' placeholder='Write some comment...' className="form-control" onChange={e=> setComment(e.target.value)} value={Comment} id='comment-content'></textarea>
                                <button type="submit" onClick={(e)=>{e.preventDefault();submit(post._id)}} className="btn btn-primary my-3">Comment</button>
                                </form>
                                {post.comments.map((comment)=>
                                    <div className="card my-3" key={comment._id}>
                                    <div className="card-body">
                                    <div className='comment-title'>
                                        <h6 className="card-subtitle mb-2 text-muted"><Link to={`/profile/${comment.user._id}`} style={{textDecoration:'none'}}>{comment.user.name}</Link></h6>
                                        <h6>
                                        <i type='button' onClick={(e)=>{e.preventDefault();clickeditcomment(comment._id,comment.content)}} className="fas fa-edit mx-3"></i>
                                        <i type='button' onClick={(e)=>{e.preventDefault();clickdeletecomment(comment._id)}} className="fas fa-trash post-delete"></i>
                                        </h6>
                                      </div>
                                      <p className="card-text">{comment.content}</p>
                                      <span><i className="far fa-thumbs-up"  style={{color:`${userlikedcomment(JSON.parse(localStorage.getItem('profile')),comment.likes)?'blue':'black'}`}}type='button' onClick={(e)=>{e.preventDefault();dispatch(likecomment(comment._id,id))}} >{(comment.likes).length}</i></span>
                                    </div>
                                  </div> 
                                )}
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>
            )}
            </div>      
            </div>      
                {/* MODAL For Update Avatar*/}
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

                    {/* Modal to update userpost */}
                     <button type="button" className="btn btn-primary create-post d-none" ref={editpost} data-bs-toggle="modal" data-bs-target="#update-post">Update-Post</button>

                        <div className="modal fade" id="update-post" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Update Post</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={(e)=>{e.preventDefault();onupdatePost(postId)}}>
                                <div className="mb-3">
                                    <label htmlFor="Updatefile" className="col-form-label">Post Photo/Video</label>
                                    <input type="file" className="form-control" id="Updatefile"/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="content" className="col-form-label">Message:</label>
                                    <textarea name='content' className="form-control" onChange={onchange} id='content' value={econtent}></textarea>
                                </div>
                                <button type="submit"  className="btn btn-primary">Update Post</button>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button ref={closeditpost} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            </div>
                            </div>
                        </div>
                        </div>

                    {/* Modal to edit comment */}
                    {commentModal()}
                </>
            )
    }else{
        return(
            <>
                <div className='profile-container'>
                    <div className="card my-3 profile-pic">
                    <img src={`${url}`} className="card-img-top profile-img" alt="profile"/>
                    <div className="card-body">
                        <h5 className="card-title">{data[0].name}</h5>
                    </div>
                    </div>

                <div className='post-container'>
                {/* Post */}
                {posts.map((post)=>
                <div className="card post-card my-3"key={post._id}>
                    <h5 className="card-title mx-3 my-3"><Link to={`/profile/${post.user}`} style={{textDecoration:'none'}}>{data[0].name}</Link></h5>
                    <hr style={{marginTop:"-10px"}}/>
                    <div className="card-body">
                    <p className="card-text">{post.content}</p>
                    
                    {(()=>{
                        if(post.file){
                            if(post.file){
                                let ext=post.file.split('.').pop();
                                if(ext==='png' ||ext==='jpg'||ext==='jpeg'){
                                    return <img src={`http://localhost:5000${post.file}`} className="img" alt="..."/>
                                }else{
                                    return <video controls>
                                    <source src={`http://localhost:5000${post.file}`} type="video/mp4"/>
                                    Your browser does not support the video tag.
                                  </video>
                                }
                            }
                        }
                    })()}
                    </div>
                    <hr style={{marginBottom:"0px"}}/>
                    {/* comment */}
                    <ul type='none' id='posts'>
                    <li className='posts-like'><i className="far fa-thumbs-up" style={{color:`${userlikedpost(JSON.parse(localStorage.getItem('profile')),post.likes)?'blue':'black'}`}}type='button' onClick={(e)=>{e.preventDefault();dispatch(likepost(post._id,id))}}>{(post.likes).length}</i></li>
                        <li className='comment-btn'><i className="fas fa-comment-alt comment accordion-button collapsed" data-bs-toggle="collapse" data-bs-target={`#a${post._id}`} aria-expanded="false" aria-controls="flush-collapseOne" type='button'>Comment</i></li></ul>                   
                        <div className="accordion accordion-flush" id="accordionFlushExample">
                        <div className="accordion-item">
                            <div id={`a${post._id}`} className="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                            <div className="accordion-body">
                                <form>
                                <label htmlFor="comment-content" className="col-form-label">Write Comment</label>
                                <textarea name='comment-content' placeholder='Write some comment...' className="form-control" onChange={e=> setComment(e.target.value)} value={Comment} id='comment-content'></textarea>
                                <button type="submit" onClick={(e)=>{e.preventDefault();submit(post._id)}} className="btn btn-primary my-3">Comment</button>
                                </form>
                                {post.comments.map((comment)=>
                                    <div className="card my-3" key={comment._id}>
                                    <div className="card-body">
                                    <div className='comment-title'>
                                        <h6 className="card-subtitle mb-2 text-muted"><Link to={`/profile/${comment.user._id}`} style={{textDecoration:'none'}}>{comment.user.name}</Link></h6>
                                        {(comment.user._id===currentuser[0]._id)?<h6>
                                        <i type='button' onClick={(e)=>{e.preventDefault();clickeditcomment(comment._id,comment.content)}} className="fas fa-edit mx-3"></i>
                                        <i type='button' onClick={(e)=>{e.preventDefault();clickdeletecomment(comment._id)}} className="fas fa-trash post-delete"></i>
                                        </h6>:""}
                                      </div>
                                      <p className="card-text">{comment.content}</p>
                                    </div>
                                  </div>
                                )}
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>
            )}
            </div>
            </div>
            {commentModal()}         
            </>
        )
    }
}
