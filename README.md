# Learning-Redux


**Before going in to Redux, let look at a bit of javascipt**

Functions in JS can take functions as arguments and can return function as well.

such functions are called higher order functions.


### Piping and composing 

The concept is to execute more than a single function, in a given order and pass the result of a function to the next one.

ugly way,

```
function1(function2(function3(initialArg)))
```

**composing**

```
compose(function3, function2, function1)(initialArg);
```

**piping**

```
pipe(function1, function2, function3)(initialArg);
```

To make it short, composition and piping are almost the same, the only difference being the execution order; If the functions are executed from left to right, it's a pipe, on the other hand, if the functions are executed from right to left it's called compose.


_In piping one functions output becomes input paramter for another function, but it may be so that the next function expects two or more parameter. To solve this problem **Currying** comes to the rescue!_


### Currying

Transform a function with multiple arguments into a sequence of nesting functions. It returns a new function that expects the next argument inline.  

Traditional

```
function sum(a, b, c) {
    return a + b + c;
}
sum(1,2,3); // 6
```

Curried

```
function sum(a) {
    return (b) => {
        return (c) => {
            return a + b + c
        }
    }
}
console.log(sum(1)(2)(3)) // 6
```

or 

```
const sum = a => b => c => a + b + c
```

**Curring in action while piping**

```
pipe(function1, function2, function3(arg1)(arg2))
```

### Pure Functions

A pure function in JavaScript is a function that returns the same result if the same arguments(input) are passed in the function.


```
// a pure function

const add = (x, y) => x + y;

add(2, 4); // 6

```

```
// an impure function

let x = 2;

const add = (y) => {
  x += y;
};

add(4); // x === 6 (the first time)

```

why pure functions? 

+ Self documenting -> we know what are all the input dependents
+ easily testable
+ concurrency
+ cacheable (as result are consisten, we can use the result for same input just like _DP_)

### Immutability 

By default objects and arrays are mutable. Immutability gives stricter control over your data immediately making your code safer and more predictable.

So to acheive immutability, we don't let objects and arrays to modify, instead create a copy and add all new/modified data in this new copy.

To acheive this in objects we can use ```object.assign``` or the "..." operator.

For arrays we can use the map() or filter() or slice() funtions and copy the new values in another array, thereby not touching the original array/objects.

Or we can also used libraries like *immuatable.js* or *immer*


## Redux


We store the state in a JS object called the store (more like frontend for DB)
When handling stores, we cant mutate it, instead have to use spread operators to assign state data to a new object

Reducer is the function that is responsible for handling store data.
Action is an event that triggers the change in the store data

Thus Three Building blocks of Redux are:

1. Action
2. State
3. Reducer


#### Creating Actions:

Tell which part of the store date to be modified

**Syntax**

```
{
    type: "bugAdded", // mandatory, anyting apart from this is optional
    payload: {
        description: "...",
        id: "..."
    }
}
```


#### Reducer

Reducer is just a simple function that takes in state and action and return new value of state based on action.

```
function reducer(state, action){
    if(action.type == 'something')
        return [
            ...state,
            {};
        ]
}
```

we will feed this funtion as a param to other higher oder components


#### Store
![Alt text](https://miro.medium.com/v2/resize:fit:1400/1*fMBzrTeHx2_7whzDgir6DA.png)

We create a store using the ```CreateUser()``` after taking reducer as an input.

```
import {CreateUser} from 'redux'
const store  = CreateUser(reducer);
```

**Dispatching action**

```
store.dispatch({
    type: 'action type',
    payload; {
        something ; something
    }
});
```

when action happens, store dispatches the action to the reducer, reducer changes the state.

**Subscribe and unsubscribe**

subscribe is a method which detectes changes in the store.

so here is where we can trigger react to re-render DOM.

```subscribe``` returns a function called unsubscribe

It's possible that when one component loads, it can trigger many actions. The action will be subscribing until a response comes, which can lead to a huge bottleneck or memory leaks.

So, its always advisable to unsubscribe an action as soon as the component gets unmounted.


#### Middleware

Redux Middleware allows you to intercept every action sent to the reducer so you can make changes to the action or cancel the action. Middleware helps you with logging, error reporting, making asynchronous requests, and a whole lot more.

(store, action) ➡️ middleware(s) ➡️ reducer


**Middleware in redux**

We can include middleware in ```configureStore()``` of reduxToolkit that takes middleware as a array property in its object argument.

```

configureStore({
    reducer: reducer,
    middleware: [......]
})

```

> Middleware function is curried [redux-toolkit/src/Middleware/logger.js](redux-toolkit/src/Middleware/logger.js)

However, if you are using pure redxux using ```createStore()```, then you can use applyMiddleware function like this

```

createStore( reducer, applyMiddleware(....));
```


**Creating a middleware**

a middleware function takes in three arguments

*store, next, action*

+ store to modify or do "action" on the store.
+ next to call the next function middleware or a reducer.
+ action to tell what action to do on the store using a reducer.

**Paramterised middleware**

just give paramter to the middleware and in the function definition add the extra paramter in "Curried" way

```const logger = param => store => next => action => {}```

```middleware: [logger({destination: 'console'})]``` in *configStore()*


**Dispatching functions**

sometime we want to perform an action only after certain step (may be after calling an API). So in that case we dispatch an funtion instead of an action.
once that function in perform, the function itself calls the action.


