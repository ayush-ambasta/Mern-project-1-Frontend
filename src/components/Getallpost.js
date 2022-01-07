import React, { useState } from 'react'
import { useRef } from 'react';
import {Link} from 'react-router-dom';
import { useSelector } from 'react-redux';
import {useDispatch } from 'react-redux';
import { Createcomment, deletePost,deleteComment } from '../state/action-creators';
import { updatePost,updateComment,likepost,likecomment} from '../state/action-creators';

export const Getallpost = () => {

    const dispatch = useDispatch();
    const posts= useSelector(state=>state.post);
    const [Comment, setComment] = useState("");
    const [postId,setpostId]=useState("");
    const [commentId,setcommentId]=useState("");
    const editpost=useRef(null);
    const editcomment=useRef(null);
    const close=useRef(null);//to close edit post modal
    const closeComment=useRef(null);
    const [econtent,setecontent]=useState("");
    const [ecomment,setecomment]=useState("");
    const currentuser=JSON.parse(localStorage.getItem('profile'));

    if(!currentuser[0]){
        currentuser[0]={_id:''}
    }
    const onchange=(e)=>{
        setecontent(e.target.value);
        setecomment(e.target.value);
    }
    const submitComment=(id)=>{
        dispatch(Createcomment(id,Comment));
        setComment("");
    }

    const clickeditpost=(postid,content)=>{
        setpostId(postid);
        setecontent(content);
        editpost.current.click();
    }
    const clickeditcomment=(commentid,content)=>{
        setcommentId(commentid);
        setecomment(content);
        editcomment.current.click();
    }

    const onupdatePost=(postid)=>{
        let file=document.getElementById('Updatefile');
        dispatch(updatePost(econtent,file.files[0],postid));
        close.current.click();
    }
    const onupdateComment=(commentid)=>{
        dispatch(updateComment(ecomment,commentid));
        closeComment.current.click();
    }

    const clickdeletepost=(postid)=>{
        dispatch(deletePost(postid));
    }
    const clickdeletecomment=(commentid)=>{
        dispatch(deleteComment(commentid));
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
    return (
        <>
        <div>
            {posts.map((post)=>
                <div className="card post-card" key={post._id}>
                    <div className='post-title'>     
                    <h5 className="card-title mx-3 my-3"><Link to={`/profile/${post.user._id}`} style={{textDecoration:'none'}}>{post.user.name}</Link></h5>
                    {(post.user._id===currentuser[0]._id)?<h5 className='my-3 mx-3'>
                    <i type='button' onClick={(e)=>{e.preventDefault();clickeditpost(post._id,post.content)}} className="fas fa-edit mx-3"></i>
                    <i type='button' onClick={(e)=>{e.preventDefault();clickdeletepost(post._id)}} className="fas fa-trash post-delete"></i>
                    </h5>:""}
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
                        <li className='posts-like'><i className="far fa-thumbs-up" style={{color:`${userlikedpost(JSON.parse(localStorage.getItem('profile')),post.likes)?'blue':'black'}`}}type='button' onClick={(e)=>{e.preventDefault();dispatch(likepost(post._id))}}>{(post.likes).length}</i></li>
                        <li className='comment-btn'><i className="fas fa-comment-alt comment accordion-button collapsed" data-bs-toggle="collapse" data-bs-target={`#a${post._id}`} aria-expanded="false" aria-controls="flush-collapseOne" type='button'>Comment</i></li></ul>                   
                        <div className="accordion accordion-flush" id="accordionFlushExample">
                        <div className="accordion-item">
                            <div id={`a${post._id}`} className="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                            <div className="accordion-body">
                                <form>
                                <label htmlFor="comment-content" className="col-form-label">Write Comment</label>
                                <textarea name='comment-content' placeholder='Write some comment...' className="form-control" onChange={e=> setComment(e.target.value)} value={Comment} id='comment-content'></textarea>
                                <button type="submit" onClick={(e)=>{e.preventDefault();submitComment(post._id)}} className="btn btn-primary my-3">Comment</button>
                                </form>
                                {post.comments.map((comment)=>
                                    <div className="card my-3" key={comment._id}>
                                    <div className="card-body">
                                      <div className='comment-title'>
                                        <h6 className="card-subtitle mb-2 text-muted"><Link to={`/profile/${comment.user._id}`} style={{textDecoration:'none'}}>{comment.user.name}</Link></h6>
                                        {(post.user.id===currentuser[0]._id || comment.user._id===currentuser[0]._id)?
                                        <h6>
                                        <i type='button' onClick={(e)=>{e.preventDefault();clickeditcomment(comment._id,comment.content)}} className="fas fa-edit mx-3"></i>
                                        <i type='button' onClick={(e)=>{e.preventDefault();clickdeletecomment(comment._id)}} className="fas fa-trash post-delete"></i>
                                        </h6>:""
                                        }
                                      </div>
                                      <p className="card-text">{comment.content}</p>
                                      <span><i className="far fa-thumbs-up"  style={{color:`${userlikedcomment(JSON.parse(localStorage.getItem('profile')),comment.likes)?'blue':'black'}`}}type='button' onClick={(e)=>{e.preventDefault();dispatch(likecomment(comment._id))}} >{(comment.likes).length}</i></span>
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
                    {/* // modal to edit post */}
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
                                <button ref={close} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            </div>
                            </div>
                        </div>
                    </div>
                    {/* Modal to edit comment */}
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
