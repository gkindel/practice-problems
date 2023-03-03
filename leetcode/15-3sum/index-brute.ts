

function numsort(a: number, b: number): number {
    return a - b;
}

function threeSum(nums: number[]): number[][] {
    // brute force!
    let a: number, b: number, c: number;
    let len = nums.length;
    let input = nums.sort(numsort);
    let i = 0;
    const seen: { [k: string]: boolean } = {};
    let results: number[][] = []

    const isNewResult = (found: number[]): boolean => {
        const key = found.join(',');
        if (seen[key])
            return false;
        return seen[key] = true;
    }
    while (i < len) {
        a = input[i++];
        let j = i;
        while (j < len) {
            b = input[j++];
            let ab = a + b;
            let k = j;
            while (k < len) {
                c = input[k++];
                if (ab + c > 0) {
                    break;
                }
                let found = [a, b, c];
                if (a + b + c === 0) {
                    if (isNewResult(found))
                        results.push(found);
                }
            }
        }
    };
    return results;
}

/*
Input: nums = [-1,0,1,2,-1,-4]
Output: [[-1,-1,2],[-1,0,1]]
*/

import assert from '../../util/test';

assert(threeSum([0, 0, 0, 0]), [[0, 0, 0]]);
assert(threeSum([-1, 0, 1, 2, -1, -4]), [[-1, -1, 2], [-1, 0, 1]]);
assert(threeSum([0, 1, 1]), []);
assert(threeSum([-1, 0, 1, 2, -1, -4, -2, -3, 3, 0, 4]), [[-4, 0, 4], [-4, 1, 3], [-3, -1, 4], [-3, 0, 3], [-3, 1, 2], [-2, -1, 3], [-2, 0, 2], [-1, -1, 2], [-1, 0, 1]]);


let long: number[] = [];
// for (let i = Math.pow(10, 3) * 2; i > 0; i--) {
// long.push(i);
// }

import monster from './monster_test';
console.log("monster test has ", monster.length)
let time = performance.now();
console.log(threeSum(monster))

console.log(performance.now() - time);
console.log('ok');
