// a reducer takes two params: a state, a action

let lastId = 0;

function reducer(state = [] , action){

    if(action.type === 'bugAdded')
    return [
        ...state, 
        {
            id: ++lastId,
            description: action.payload.description,
            resolve: false
        }
    ]

    else if (action.type === 'bugRemoved')
        return state.filter( bug => bug.id !== action.payload.id);


    return state;

}