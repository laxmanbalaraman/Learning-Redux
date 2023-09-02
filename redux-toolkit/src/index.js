import store from "./store";
import { bugAdded, bugRemoved, bugUpdated } from "./actions";

const unsubscribe = store.subscribe(() => {
    console.log("store changed", store.getState());
})

store.dispatch(bugAdded("Bug1"));
store.dispatch(bugUpdated(1, "Bug2"));

unsubscribe();

// subscribe will not trigger from here on.

store.dispatch(bugRemoved(1));

