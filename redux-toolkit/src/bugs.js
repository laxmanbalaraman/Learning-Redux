import {createAction} from '@reduxjs/toolkit'

// creating actions
export const bugAdded = createAction('bugAdded');
export const bugRemoved = createAction('bugRemoved');
export const bugUpdated = createAction('bugUpdated');


// a reducer takes two params: a state, a action
let lastId = 0;

export default function reducer(state = [] , action){

    if(action.type === bugAdded.type)
    return [
        ...state, 
        {
            id: ++lastId,
            description: action.payload.description,
            resolve: false
        }
    ]

    else if (action.type === bugRemoved.type)
        return state.filter( bug => bug.id !== action.payload.id);

    else if (action.type == bugUpdated.type){
        return state.map(bug => bug.id !== action.payload.id ? bug : {...bug, description: action.payload.description}
        )
    }


    return state;

}