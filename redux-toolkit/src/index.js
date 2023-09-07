import store from "./store";
import { bugAdded, bugRemoved, bugUpdated, getAllBugs } from "./bugs";
import { projectAdded } from "./projects";

const unsubscribe = store.subscribe(() => {
    console.log("store changed", store.getState());
})

store.dispatch(bugAdded({description: "Bug1"}));
store.dispatch(bugUpdated({id : 1, description: "Bug2"}));
store.dispatch(projectAdded({name: "project 1"}))

unsubscribe();

// subscribe will not trigger from here on.

console.log(getAllBugs(store.getState()));

store.dispatch(bugRemoved({id: 1}));

