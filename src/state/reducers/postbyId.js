const reducers=(posts=[],action)=>{
    if(action.type==="postbyId"){
        return action.payload;
    }
    else{
        return  posts;
    }
}


export default reducers;