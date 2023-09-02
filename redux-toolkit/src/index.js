import store from "./store";
import { bugAdded, bugRemoved, bugUpdated } from "./bugs";

const unsubscribe = store.subscribe(() => {
    console.log("store changed", store.getState());
})

store.dispatch(bugAdded({description: "Bug1"}));
store.dispatch(bugUpdated({id : 1, description: "Bug2"}));

unsubscribe();

// subscribe will not trigger from here on.

store.dispatch(bugRemoved({id: 1}));

