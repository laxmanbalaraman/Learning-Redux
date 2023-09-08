const func = ({dispatch, getState}) => next => action => {

    // if action is a function then execute the function 
    // else pass it to the next middleware 
    if(typeof(action) == 'function')
        action(dispatch, getState);

    else
        next(action);    
}


export default func;

// not to worry, this above logic is alreay implement by redux-thunk library 
// that comes with redux-toolkit
// all we have to do is when middleware property is used, add/spred in ...getDefaultMiddleware array 