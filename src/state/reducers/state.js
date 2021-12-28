

const reducers=(state=localStorage.getItem('state'),action)=>{
    if(action.type==="logout"){
        return false;
    }
    if(action.type==='setState'){
        localStorage.setItem('state',true);
        return true;
    }else{
        return state;
    }
}


export default reducers;