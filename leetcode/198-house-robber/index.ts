
/*
Given an integer array nums representing the amount of money of each house, return the maximum amount of money you can rob tonight without alerting the police.

Example 1:
Input: nums = [1,2,3,1]
Output: 4
Explanation: Rob house 1 (money = 1) and then rob house 3 (money = 3).
Total amount you can rob = 1 + 3 = 4.
Example 2:

Input: nums = [2,7,9,3,1]
Output: 12
Explanation: Rob house 1 (money = 2), rob house 3 (money = 9) and rob house 5 (money = 1).
Total amount you can rob = 2 + 9 + 1 = 12.
*/


/*
cache would look like
for a given (index)
- remember max path of 1
- remember skip 2 
*/

function rob(nums: number[]): number {
    const cache: number[] = [];

    const nodeValue = (offset: number): number => {
        // console.log(`walking i=${offset}`);

        if (cache[offset] !== undefined) {
            // cache[offset];
            // console.log('.. cache hit!', cache[offset]);
            return cache[offset];
        }
        const val = nums[offset];


        if (offset >= nums.length) {
            // console.log(".. out of bounds")
            return cache[offset] = 0;
        }

        // we're done if we're at the end of the array
        if (offset >= nums.length - 2) {
            // console.log(".. at end")
            return cache[offset] = val;
        }

        // console.log(`.. digging into #${offset} (${val})`);

        const choice1 = nodeValue(offset + 2)
        const choice2 = nodeValue(offset + 3)
        const max = Math.max(choice1, choice2)
        // console.log(".. results", `#${offset} [${choice1}, ${choice2}] => ${max}`);

        return cache[offset] = val + max;
    }

    return Math.max(nodeValue(0), nodeValue(1));
};


import assert from '../../util/test';

assert(rob([1, 2, 3, 1]), 4);
assert(rob([2, 7, 9, 3, 1]), 12)
// console.log(rob([2, 7, 9, 3, 1]));
console.log(
    // rob([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])
    // rob([1, 2, 3])
);