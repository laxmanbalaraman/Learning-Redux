import store from "./store";



store.dispatch({
    type: 'bugAdded',
    payload:{
        description: "Bug1"
    }  
});

console.log('after adding bug', store.getState());

store.dispatch({
    type: 'bugRemoved',
    payload: {
        id: 1
    }
})

console.log('after removing bug', store.getState());