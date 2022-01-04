if(!localStorage.getItem('profile')){
    localStorage.setItem('profile',JSON.stringify([]));
}
const reducers=(state=JSON.parse(localStorage.getItem('profile')),action)=>{
    if(action.type==="setProfile"){
        return action.payload
    }
    if(action.type==="logout"){
        localStorage.setItem('profile',JSON.stringify([]));
        return []
    }
    else{
        return state;
    }
}


export default reducers;