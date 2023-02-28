// This is a JavaScript coding problem from BFE.dev 
// https://bigfrontend.dev/problem/implement-curry

import harness from './harness.mjs'

function curry(fn) {
    const c = (...args) => {
        if (args.length >= 3) {
            return fn(...args)
        }
        else {
            return (...args2) => {
                return c(...args, ...args2);
            }
        }
    }
    return c;
}

harness(curry);