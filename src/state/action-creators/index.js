import {  toast } from 'react-toastify';

export const signup=(data)=>{
    return async (dispatch)=>{
        try{
            const res=await fetch("http://localhost:5000/user/signup",{
                method:'POST',
                headers:{
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify({name:data.name,email:data.email,password:data.password})
            });
            const json=await res.json();
            if(json.success===true){
                toast.success("Successfully SignedIn");
                localStorage.setItem('token',json.token);
                await dispatch(userProfile());
                dispatch(setState(true));
            }
        }catch(error){
            console.log(error);
        }
    }
}

export const login=(data)=>{

    return async (dispatch)=>{
        try{
            const res=await fetch("http://localhost:5000/user/login",{
                method:'POST',
                headers:{
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify({email:data.email,password:data.password})
            });
            const json=await res.json();
            if(json.success===true){
               toast.success("Successfully LoggedIn");
               localStorage.setItem('token',json.token);
               await dispatch(userProfile());
               dispatch(setState(true));
            }else{
                toast.warn("Invalid Credentials")
            }
        }catch(error){
            console.log(error);
        }
    }
}


export const search=(name)=>{
    return async (dispatch)=>{
        try{
            const res=await fetch("http://localhost:5000/user/search",{
                method:'POST',
                headers:{
                    'Content-Type': 'application/json',
                    'auth-token':localStorage.getItem('token')
                },
                body:JSON.stringify({name:name})
            });
            const json=await res.json();
            if(json.success===true){
               dispatch(searchResults(json.username));
            }
        }catch(error){
            console.log(error);
        }
    }
}

export const userProfile=()=>{
    return async (dispatch)=>{
        try{
            const res=await fetch("http://localhost:5000/user/profile",{
                method:'GET',
                headers:{
                    'Content-Type': 'application/json',
                    'auth-token':localStorage.getItem('token')
                }
            });
            const json=await res.json();
            if(json.success===true){
                localStorage.setItem('profile',JSON.stringify(json.profile));
                dispatch(setProfile(json.profile));
            }
        }catch(error){
            console.log(error);
        }
    }
}



export const updateProfile=(id,name,avatar)=>{
    return async (dispatch)=>{
        let fd=new FormData();
        fd.append('avatar',avatar);

         fd.append('name',name);
    
        try{
            const res=await fetch(`http://localhost:5000/user/update/${id}`,{
                method:'PUT',
                headers:{
                    // 'Content-Type': 'multipart/form-data',
                    'auth-token':localStorage.getItem('token')
                },
                body:fd
            });
            const json=await res.json();
            if(json.success===true){
                dispatch(userProfile());
            }
        }catch(error){
            console.log(error);
        }
    }
}

export const createPost=(content,file)=>{
    return async (dispatch)=>{
        let fd=new FormData();
        fd.append('Postfile',file);

         fd.append('content',content);
    
        try{
            const res=await fetch(`http://localhost:5000/posts/create`,{
                method:'POST',
                headers:{
                    // 'Content-Type': 'multipart/form-data',
                    'auth-token':localStorage.getItem('token')
                },
                body:fd
            });
            const json=await res.json();
            if(json.success===true){
                dispatch(getallPost());
            }
        }catch(error){
            console.log(error);
        }
    }
}

export const getallPost=()=>{
    return async (dispatch)=>{
        try{
            const res=await fetch("http://localhost:5000/posts/allpost",{
                method:'GET',
                headers:{
                    'auth-token':localStorage.getItem('token')
                },
            });
            const json=await res.json();
            if(json.success===true){
                dispatch(allPost(json.post));
            }
        }catch(error){
            console.log(error);
        }
    }
}

export const Createcomment= (id,comment,userid=null)=>{
    return async (dispatch)=>{
        try{
            const res=await fetch("http://localhost:5000/comments/create",{
                method:'POST',
                headers:{
                    'Content-Type': 'application/json',
                    'auth-token':localStorage.getItem('token')
                },
                body:JSON.stringify({content:comment,post:id})
            });
            const json=await res.json();
            if(json.success===true){
                toast.success('Commented Successfully');
                if(userid){
                    dispatch(getpostbyId(userid));
                }
                dispatch(getallPost());
            }else{
                toast.warn("Comments Required");
            }
        }catch(error){
            console.log(error);
        }
    }
}

export const getpostbyId= (id)=>{
    return async (dispatch)=>{
        try{
            const res=await fetch(`http://localhost:5000/posts/getpost/${id}`,{
                method:'GET',
                headers:{
                    'Content-Type': 'application/json',
                    'auth-token':localStorage.getItem('token')
                },
            });
            const json=await res.json();
            if(json.success===true){
                dispatch(postbyId(json.post.posts));
            }
        }catch(error){
            console.log(error);
        }
    }
}

export const deleteAvatar=(id)=>{
    return async(dispatch)=>{
        try{
            const res=await fetch(`http://localhost:5000/user/deleteAvatar/${id}`,{
                method:'DELETE',
                headers:{
                    'Content-Type': 'application/json',
                    'auth-token':localStorage.getItem('token')
                },
            });
            const json=await res.json();
            if(json.success===true){
                toast.success('Deleted Successfully');
                dispatch(userProfile());
            }
        }catch(error){
            console.log(error);
        }
    }
}

export const updatePost=(content,file,id,userid=null)=>{
    return async (dispatch)=>{
        let fd=new FormData();
        fd.append('Postfile',file);

         fd.append('content',content);
    
        try{
            const res=await fetch(`http://localhost:5000/posts/update/${id}`,{
                method:'PUT',
                headers:{
                    // 'Content-Type': 'multipart/form-data',
                    'auth-token':localStorage.getItem('token')
                },
                body:fd
            });
            const json=await res.json();
            if(json.success===true){
                toast.success('Updated Successfully');
                dispatch(getallPost());
                if(userid){
                    dispatch(getpostbyId(userid));
                }
            }
        }catch(error){
            console.log(error);
        }
    }
}

export const updateComment=(content,id,userid=null)=>{
    return async (dispatch)=>{
        try{
            const res=await fetch(`http://localhost:5000/comments/update/${id}`,{
                method:'PUT',
                headers:{
                    'Content-Type': 'application/json',
                    'auth-token':localStorage.getItem('token')
                },
                body:JSON.stringify({content:content})
            });
            const json=await res.json();
            if(json.success===true){
                toast.success('Updated Successfully');
                dispatch(getallPost());
                if(userid){
                    dispatch(getpostbyId(userid));
                }
            }
        }catch(error){
            console.log(error);
        }
    }
}

export const deletePost=(id,userid=null)=>{
    return async(dispatch)=>{
        try{
            const res=await fetch(`http://localhost:5000/posts/delete/${id}`,{
                method:'DELETE',
                headers:{
                    'Content-Type': 'application/json',
                    'auth-token':localStorage.getItem('token')
                },
            });
            const json=await res.json();
            if(json.success===true){
                toast.success('Deleted Successfully');
                dispatch(getallPost());
                if(userid){
                    dispatch(getpostbyId(userid));
                }
            }
        }catch(error){
            console.log(error);
        }
    }
}

export const deleteComment=(id,userid=null)=>{
    return async(dispatch)=>{
        try{
            const res=await fetch(`http://localhost:5000/comments/delete/${id}`,{
                method:'DELETE',
                headers:{
                    'Content-Type': 'application/json',
                    'auth-token':localStorage.getItem('token')
                },
            });
            const json=await res.json();
            if(json.success===true){
                toast.success('Deleted Successfully');
                dispatch(getallPost());
                if(userid){
                    dispatch(getpostbyId(userid));
                }
            }
        }catch(error){
            console.log(error);
        }
    }
}

export const likepost=(id,userid=null)=>{
    return async(dispatch)=>{
        try{
            const res=await fetch(`http://localhost:5000/likes/toggle/?id=${id}&type=post`,{
                method:'POST',
                headers:{
                    'Content-Type': 'application/json',
                    'auth-token':localStorage.getItem('token')
                },
            });
            const json=await res.json();
            if(json.success===true){
                if(userid){
                    dispatch(getpostbyId(userid));
                }
                dispatch(getallPost());
            }
        }catch(error){
            console.log(error);
        }
    }
}

export const likecomment=(id,userid=null)=>{
    return async(dispatch)=>{
        try{
            const res=await fetch(`http://localhost:5000/likes/toggle/?id=${id}&type=comment`,{
                method:'POST',
                headers:{
                    'Content-Type': 'application/json',
                    'auth-token':localStorage.getItem('token')
                },
            });
            const json=await res.json();
            if(json.success===true){
                if(userid){
                    dispatch(getpostbyId(userid));
                }
                dispatch(getallPost());
            }
        }catch(error){
            console.log(error);
        }
    }
}

export const setState=(state)=>{
        return{
            type:'setState',
            payload:state
        }
}

export const logout=(state)=>{
    toast.success('Successfully Logout');
    return{
        type:'logout',
        payload:state,
    }
}

export const searchResults=(results)=>{
    return{
        type:'searchResults',
        payload:results
    }
}

export const setProfile=(profile)=>{
    return{
        type:'setProfile',
        payload:profile
    }
}

export const allPost=(post)=>{
    return{
        type:'allPost',
        payload:post
    }
}

export const postbyId=(post)=>{
    return{
        type:'postbyId',
        payload:post
    }
}