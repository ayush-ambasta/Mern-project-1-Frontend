const reducers=(posts=[],action)=>{
    if(action.type==="allPost"){
        return action.payload;
    }
    else{
        return  posts;
    }
}


export default reducers;