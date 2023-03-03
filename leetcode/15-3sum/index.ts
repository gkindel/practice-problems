

function threeSum(nums: number[]): number[][] {
}


import assert from '../../util/test';

assert(threeSum([0, 0, 0, 0]), [[0, 0, 0]]);
assert(threeSum([-1, 0, 1, 2, -1, -4]), [[-1, -1, 2], [-1, 0, 1]]);
assert(threeSum([0, 1, 1]), []);
assert(threeSum([-1, 0, 1, 2, -1, -4, -2, -3, 3, 0, 4]), [[-4, 0, 4], [-4, 1, 3], [-3, -1, 4], [-3, 0, 3], [-3, 1, 2], [-2, -1, 3], [-2, 0, 2], [-1, -1, 2], [-1, 0, 1]]);
