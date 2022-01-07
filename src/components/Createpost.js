import React,{useState,useRef} from 'react'
import {useDispatch } from 'react-redux';
import { createPost } from '../state/action-creators';


export const Createpost = () => {
    
    const dispatch = useDispatch();
    const [Content,setContent]=useState({content:""});
    const close=useRef(null);

    const onchange=(e)=>{
        setContent({...Content,[e.target.name]:e.target.value});
    }

    const onsubmit=(e)=>{
        e.preventDefault();
        let file=document.getElementById('Postfile');
        dispatch(createPost(Content.content,file.files[0]));
        close.current.click();
    }

    return (
        <>
            <button type="button" className="btn btn-primary create-post" data-bs-toggle="modal" data-bs-target="#create-post">Create-Post</button>

            <div className="modal fade" id="create-post" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">New Post</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <form onSubmit={onsubmit}>
                    <div className="mb-3">
                        <label htmlFor="Postfile" className="col-form-label">Post Photo/Video</label>
                        <input type="file" className="form-control" id="Postfile"/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="content" className="col-form-label">Message:</label>
                        <textarea name='content' placeholder='Write Something...' className="form-control" onChange={onchange} id='content'></textarea>
                    </div>
                    <button type="submit"  className="btn btn-primary">Post</button>
                    </form>
                </div>
                <div className="modal-footer">
                    <button ref={close} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
                </div>
            </div>
            </div>
        </>
    )
}
