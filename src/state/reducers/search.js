
const reducers=(results=[],action)=>{
    if(action.type==="searchResults"){
        return action.payload;
    }
    else{
        return results;
    }
}


export default reducers;