



function threeSum(nums: number[]): number[][] {
    let timestamp = performance.now();

    const timeCheck = function (msg: string) {
        const now = performance.now();
        console.log(msg, now - timestamp);
        timestamp = now;
    };


    const sorted = nums.sort((a, b) => a - b);
    timeCheck('sorting');

    const matrix: number[][] = []
    const seen: { [k: string]: boolean } = {};
    const results: number[][] = []

    let i: number;

    // limit input to a max of 3 of each value
    const uniq: number[] = [];
    for (i = 0; i < sorted.length; i++) {
        if (sorted[i] !== sorted[i + 3]) {
            uniq.push(sorted[i]);
        }
    }
    timeCheck('uniq');

    const len = uniq.length;
    let max_i = len - 1;
    let max_j = len;

    // build out matrix
    for (i = 0; i < max_i; i++) {
        for (let j = i + 1; j < max_j; j++) {
            let a = uniq[i];
            let b = uniq[j];
            let c: number = a + b;
            if (matrix[i] === undefined) {
                matrix[i] = [];
            }
            matrix[i][j] = -c;
        }
    }
    timeCheck('building');

    // walk the matrix
    let j: number, k: number, n: number;
    let haystack: number[], needle: number, triplet: number[];
    let hash: string;
    n = -1;

    function sortedIndexOf(needle: number, haystack: number[]): number {
        for (let x = 0; x < haystack.length; x++) {
            if (needle === haystack[x])
                return x;
            if (needle < haystack[x]) {
                break;
            }
        }
        return -1;
    }

    for (let i = 0; i < max_i; i++) {
        haystack = uniq.slice(i + 1);
        for (j = i + 1; j < max_j; j++) {
            needle = matrix[i][j];
            k = j + 1;
            haystack.shift();

            n = sortedIndexOf(needle, haystack);
            // n = haystack.indexOf(needle);

            if (n > -1) {
                triplet = [uniq[i], uniq[j], uniq[n + k]];
                hash = triplet.join(',');
                if (!seen[hash]) {
                    seen[hash] = true;
                    results.push(triplet);
                }
            }
        }
    }
    timeCheck('walking');
    return results;
}



import assert from '../../util/test';
// assert(threeSum([0, 0, 0, 0, 1, 1]), [[0, 0, 0]]);
// assert(threeSum([-1, 0, 1, 2, -1, -4]), [[-1, -1, 2], [-1, 0, 1]]);
// assert(threeSum([-1, 0, 1, 0, 3]), [[-1, 0, 1]]);
// assert(threeSum([0, 1, -1]), [[-1, 0, 1]]);
// assert(threeSum([-1, 0, 1, 2, -1, -4, -2, -3, 3, 0, 4]), [[-4, 0, 4], [-4, 1, 3], [-3, -1, 4], [-3, 0, 3], [-3, 1, 2], [-2, -1, 3], [-2, 0, 2], [-1, -1, 2], [-1, 0, 1]]);

import monster from './monster_test';
threeSum(monster);
console.log("monster ok")

import monster2 from './monster_2';
// threeSum(monster2);
console.log("monster2 ok")

