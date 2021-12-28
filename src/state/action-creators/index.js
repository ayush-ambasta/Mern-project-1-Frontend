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
               localStorage.setItem('token',json.token);
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
               localStorage.setItem('token',json.token);
               dispatch(setState(true));
               dispatch(userProfile());
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

export const setState=(state)=>{
        return{
            type:'setState',
            payload:state
        }
}

export const logout=(state)=>{
    return{
        type:'logout',
        payload:state
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

