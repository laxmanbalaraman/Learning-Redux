import store from "./store";

const unsubscribe = store.subscribe(() => {
    console.log("store changed", store.getState());
})

store.dispatch({
    type: 'bugAdded',
    payload:{
        description: "Bug1"
    }  
});

unsubscribe();

// subscribe will not trigger from here on.

store.dispatch({
    type: 'bugRemoved',
    payload: {
        id: 1
    }
})
