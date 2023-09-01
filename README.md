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