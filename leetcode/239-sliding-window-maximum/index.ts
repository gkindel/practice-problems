import assert from '../../util/test';

const input = [1, 3, -1, -3, 5, 3, 6, 7];
const k = 3;
const output = [3, 3, 5, 5, 6, 7];

let cost = 0;
const DEBUG = false;

const log = (...args: any): void => {
    if (!DEBUG)
        return;
    console.log.apply(console, args);
}

function maxSlidingWindow(nums: number[], windowSize: number): number[] {


    let i = 0;
    const stop = nums.length - windowSize;
    const ret: number[] = new Array(stop);
    let subset: number[];
    const maxWindowIndex = nums.length - windowSize;
    let lastMax: number;

    const findMax = () => {
        cost++;
        subset = nums.slice(i, i + windowSize);
        lastMax = Math.max.apply(null, subset);
        log(`.. search ${i} [${lastMax}]`, subset);
        return lastMax;
    }

    log(`init`, { windowSize, maxWindowIndex }, nums);

    while (i <= maxWindowIndex) {
        const addVal = nums[i + windowSize - 1];
        let debugset = nums.slice(i - 1, i + windowSize);
        lastMax = ret[i - 1];
        const dropVal = nums[i - 1];
        if (i !== 0) {
            if (addVal <= lastMax && dropVal !== lastMax) {
                ret[i] = lastMax;
                log(`cached hit low ${i}. ${lastMax} [${dropVal}, ${addVal}) => ${lastMax}`, debugset);
            }
            else if (addVal > lastMax) {
                ret[i] = addVal;
                log(`cached hit high ${i}. ${lastMax} [${dropVal}, ${addVal}) => ${addVal}`, debugset);
            }
        }
        if (ret[i] === undefined) {
            ret[i] = findMax();
            log(`loop search ${i}. (${addVal}) findMax() => ${ret[i]}`);
        }
        i++;
    }

    return ret;
};

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


function maxSlidingWindow2(nums: number[], windowSize: number): number[] {

    const maxOffset = nums.length - 1;
    const slice: number[] = [];
    const ret: number[] = [];
    let i: number;
    log({ len: nums.length - 1, maxOffset }, nums);
    for (i = 0; i <= maxOffset; i++) {
        const left = nums;
        const test = nums[i];
        const front = slice[0];
        const back = slice[slice.length - 1];

        log(`(${i}) ${test} start`, slice)

        // .. cleanup any removed numbers
        if (i >= windowSize) {
            const chop = nums[i - windowSize];
            if (chop == front) {
                slice.shift();
                log(`.. ${test} chopping ${chop}`, { chop_i: i - windowSize, windowSize }, slice)
            }
        }

        // walk from right to left
        var compare;
        for (var j = slice.length; j >= 0; j--) {
            compare = slice[j];
            if (test > compare) {
                log(`.. ${test} kills ${compare}`)
                slice.pop();
            }
        }

        // deliver our new value to the back
        slice.push(test);
        log(`.. ${test} updated`, slice);

        // record max once our window is fully within input
        const slice_i = i - windowSize + 1;
        if (slice_i >= 0) {
            const max = slice[0];
            ret.push(max);
            const debug = nums.slice(slice_i, i + 1);
            log(`.. ${test} record`, { i, maxOffset, slice_i, max }, debug);
        }
    }
    return ret;
}


assert(maxSlidingWindow(input, 3), output);
assert(maxSlidingWindow([1, 2, 3, 2, 1], 3), [3, 3, 3]);
assert(maxSlidingWindow([1, 2, 3, 4, 3, 2, 1], 3), [3, 4, 4, 4, 3]);
assert(maxSlidingWindow([7, 6, 5, 4, 3, 2, 1], 3), [7, 6, 5, 4, 3]);

assert(maxSlidingWindow([1, 1, 1, 1, 1], 3), [1, 1, 1]);
// 
assert(maxSlidingWindow2([1, 1, 1, 8, 2, 3, 4, 5, 4, 3], 3), [1, 8, 8, 8, 4, 5, 5, 5]);

/*

 1,  3, -1      -3
 3, -1, -3       5
-1, -3,  5       3
-3,  5,  3       6
 5,  3,  6
 3,  6,  7

 */