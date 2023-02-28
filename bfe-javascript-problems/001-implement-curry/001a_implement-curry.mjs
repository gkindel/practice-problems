// This is a JavaScript coding problem from BFE.dev 
// https://bigfrontend.dev/problem/implement-curry

/*
updated to support scope preservation
*/
import harness from './harness.mjs'

function curry(fn) {
    const curried = function (...args) {
        return (args.length >= fn.length)
            ? fn.call(this, ...args)
            : curried.bind(this, ...args);
    }
    return curried;
}

harness(curry);




