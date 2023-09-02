import {createAction, createReducer} from '@reduxjs/toolkit'

// creating actions
export const bugAdded = createAction('bugAdded');
export const bugRemoved = createAction('bugRemoved');
export const bugUpdated = createAction('bugUpdated');

let lastId = 0;

export default createReducer([], {

    [bugAdded.type] : (bugs, action) => {
        bugs.push({
            id: ++lastId,
            description: action.payload.description,
            resolve: false
        })
    },

    [bugUpdated.type]: (bugs, action) => {
        const index = bugs.findIndex( bug => bug.id === action.payload.id);
        bugs[index].description = action.payload.description;
    },

    [bugRemoved.type] : (bugs, action) => {
        const index = bugs.findIndex(bug => bug.id == action.payload.id);
        index != -1 && bugs.splice(index, 1);
    }

 })

// a reducer takes two params: a state, a action
// let lastId = 0;

// export default function reducer(state = [] , action){

//     if(action.type === bugAdded.type)
//     return [
//         ...state, 
//         {
//             id: ++lastId,
//             description: action.payload.description,
//             resolve: false
//         }
//     ]

//     else if (action.type === bugRemoved.type)
//         return state.filter( bug => bug.id !== action.payload.id);

//     else if (action.type == bugUpdated.type){
//         return state.map(bug => bug.id !== action.payload.id ? bug : {...bug, description: action.payload.description}
//         )
//     }


//     return state;

// }