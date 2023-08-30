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

