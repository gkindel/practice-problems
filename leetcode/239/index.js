"use strict";
exports.__esModule = true;
var index_1 = require("../../javascript-problems/test/index");
var input = [1, 3, -1, -3, 5, 3, 6, 7];
var k = 3;
var output = [3, 3, 5, 5, 6, 7];
var cost = 0;
var DEBUG = false;
var log = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    if (!DEBUG)
        return;
    console.log.apply(console, args);
};
function maxSlidingWindow(nums, windowSize) {
    var i = 0;
    var stop = nums.length - windowSize;
    var ret = new Array(stop);
    var subset;
    var maxWindowIndex = nums.length - windowSize;
    var lastMax;
    var findMax = function () {
        cost++;
        subset = nums.slice(i, i + windowSize);
        lastMax = Math.max.apply(null, subset);
        log(".. search ".concat(i, " [").concat(lastMax, "]"), subset);
        return lastMax;
    };
    log("init", { windowSize: windowSize, maxWindowIndex: maxWindowIndex }, nums);
    while (i <= maxWindowIndex) {
        var addVal = nums[i + windowSize - 1];
        var debugset = nums.slice(i - 1, i + windowSize);
        lastMax = ret[i - 1];
        var dropVal = nums[i - 1];
        if (i !== 0) {
            if (addVal <= lastMax && dropVal !== lastMax) {
                ret[i] = lastMax;
                log("cached hit low ".concat(i, ". ").concat(lastMax, " [").concat(dropVal, ", ").concat(addVal, ") => ").concat(lastMax), debugset);
            }
            else if (addVal > lastMax) {
                ret[i] = addVal;
                log("cached hit high ".concat(i, ". ").concat(lastMax, " [").concat(dropVal, ", ").concat(addVal, ") => ").concat(addVal), debugset);
            }
        }
        if (ret[i] === undefined) {
            ret[i] = findMax();
            log("loop search ".concat(i, ". (").concat(addVal, ") findMax() => ").concat(ret[i]));
        }
        i++;
    }
    return ret;
}
;
/*
[8,7,5,6,9]
[8]
 .. add 7 back
[8,7]
 .. add 5 back
 8,7,5]
    # record 8
 .. rem 8, add 6
    [7,5]
 .. add 6 back, kill 5
 
[7,6]
    # record 7
.. rem 7, add 9
    [6]
    .. add 9 back kill 5
[9]
    # record 9

[8,6,5]
    ... add 7
    .. cmp 5, rm 5
    .. cmp 6, rm 6
    .. cmp 8, push back

[8,6,5]
    ... add 8
    .. cmp 5, rm 5
    .. cmp 6, rm 6
    .. cmp 8, drop


[8,6,5]
    ... add 9
    .. cmp 5, rm 5
    .. cmp 6, rm 6
    .. cmp 8, drop 8
    .. empty queue, add
*/
function maxSlidingWindow2(nums, windowSize) {
    var maxOffset = nums.length - 1;
    var slice = [];
    var ret = [];
    var i;
    log({ len: nums.length - 1, maxOffset: maxOffset }, nums);
    for (i = 0; i <= maxOffset; i++) {
        var left = nums;
        var test = nums[i];
        var front = slice[0];
        var back = slice[slice.length - 1];
        log("(".concat(i, ") ").concat(test, " start"), slice);
        // .. cleanup any removed numbers
        if (i >= windowSize) {
            var chop = nums[i - windowSize];
            if (chop == front) {
                slice.shift();
                log(".. ".concat(test, " chopping ").concat(chop), { chop_i: i - windowSize, windowSize: windowSize }, slice);
            }
        }
        // walk from right to left
        var compare;
        for (var j = slice.length; j >= 0; j--) {
            compare = slice[j];
            if (test > compare) {
                log(".. ".concat(test, " kills ").concat(compare));
                slice.pop();
            }
        }
        // deliver our new value to the back
        slice.push(test);
        log(".. ".concat(test, " updated"), slice);
        // record max once our window is fully within input
        var slice_i = i - windowSize + 1;
        if (slice_i >= 0) {
            var max = slice[0];
            ret.push(max);
            var debug = nums.slice(slice_i, i + 1);
            log(".. ".concat(test, " record"), { i: i, maxOffset: maxOffset, slice_i: slice_i, max: max }, debug);
        }
    }
    return ret;
}
(0, index_1["default"])(maxSlidingWindow(input, 3), output);
(0, index_1["default"])(maxSlidingWindow([1, 2, 3, 2, 1], 3), [3, 3, 3]);
(0, index_1["default"])(maxSlidingWindow([1, 2, 3, 4, 3, 2, 1], 3), [3, 4, 4, 4, 3]);
(0, index_1["default"])(maxSlidingWindow([7, 6, 5, 4, 3, 2, 1], 3), [7, 6, 5, 4, 3]);
(0, index_1["default"])(maxSlidingWindow([1, 1, 1, 1, 1], 3), [1, 1, 1]);
// 
(0, index_1["default"])(maxSlidingWindow2([1, 1, 1, 8, 2, 3, 4, 5, 4, 3], 3), [1, 8, 8, 8, 4, 5, 5, 5]);
/*

 1,  3, -1      -3
 3, -1, -3       5
-1, -3,  5       3
-3,  5,  3       6
 5,  3,  6
 3,  6,  7

 */ 
