
import * as actions from './actionTypes'; 

export function bugAdded(description){

    return {
        type: actions.BUG_ADDED,
        payload:{
            description: description
        }  
    }
}

export function bugUpdated(id, description){
    return {
        type: actions.BUG_UPDATED,
        payload: {
            id : id,
            description: description
        }
    }
}

export function bugRemoved(id){
    return {
        type: actions.BUG_REMOVED,
        payload: {
            id: id
        }
    }
}