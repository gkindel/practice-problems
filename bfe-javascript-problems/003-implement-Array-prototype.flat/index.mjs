import { assert } from "../../util/test/index.mjs";

const flat = function (arr, depth = 1) {
    let ret;
    let input = arr;
    let d = 0;
    do {
        ret = [];
        for (var i = 0; i < input.length; i++) {
            let a = input[i];
            if (a instanceof Array) {
                ret = ret.concat(a);
            } else {
                ret.push(a);
            }
        }
        input = ret.slice();
        d++;
    } while (d < depth);
    return ret;
};

const flat_recursive = function (arr, depth = 1) {
    const helper = (arr, depth, ...vals) => {
        const a = arr.shift();
        const p = a instanceof Array && depth > 0 ? flat_recursive(a, depth - 1) : [a];
        if (arr.length > 0) {
            return helper(arr, depth, ...vals, ...p)
        }
        else {
            return [...vals, ...p]
        }
    }
    return helper([...arr], depth);
}

const arr = [1, [2], [3, [4, [5]]]];

console.log("recursive solution")
assert(flat_recursive(arr), [1, 2, 3, [4, [5]]], "default depth");
assert(flat_recursive(arr, 1), [1, 2, 3, [4, [5]]], "depth 1");
assert(flat_recursive(arr, 2), [1, 2, 3, 4, [5]], "depth 2");
assert(flat_recursive(arr, 3), [1, 2, 3, 4, 5], "depth 3");

console.log("looping solution")
assert(flat(arr), [1, 2, 3, [4, [5]]], "default depth");
assert(flat(arr, 1), [1, 2, 3, [4, [5]]], "depth 1");
assert(flat(arr, 2), [1, 2, 3, 4, [5]], "depth 2");
assert(flat(arr, 3), [1, 2, 3, 4, 5], "depth 3");
