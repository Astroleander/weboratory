const __description = `
Given an array nums of n integers and an integer target, are there elements a, b, c, and d in nums such that a + b + c + d = target? Find all unique quadruplets in the array which gives the sum of target.
`
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[][]}
 */
const fourSum = function(nums, target) {
  nums.sort((a, b) => a - b);
  let res = [];

  let sum;
  let low, high;
  for (let i = 0; i < nums.length - 3; i++) {
    for (let j = i + 1; j < nums.length - 2; j++) {
      low = j + 1;
      high = nums.length - 1;
      // two sum
      while (low < high) {
        sum = nums[low] + nums[high] + nums[i] + nums[j];
        if (target === sum){
          res.push([ nums[i], nums[j], nums[low], nums[high] ]);
          // [ 💀 错误点 ] 2sum 在 push 值以后需要
          // 1. 先过滤所有相同值
          // 2. 再进到下一个值
          // wanna 13 [ 0, 4, 4，4, 5, 6, 9, 9, 11]
          //               ^                 ^
          //          [ 0, 4, 4，4, 5, 6, 9, 9, 11] // after while
          //                     ^        ^
          //          [ 0, 4, 4，4, 5, 6, 9, 9, 11] // end
          //                        ^  ^
          while (nums[high] === nums[high - 1]) { high --; }
          while (nums[low] === nums[low + 1]) { low ++;}
          high --;
          low ++;
        } else if (sum > target) {
          high --;
        } else {
          low ++;
        }
      } // two sum ends
      // [ 💀 错误点 ] i, j 每次前进要直接前进到下一个不一样的值
      while (nums[j] === nums[j + 1]) j++;
    }
    while (nums[i] === nums[i + 1]) i++;
  }
  return res
};

export default {
  fourSum,
  inputs: [[-3,-2,-1,0,0,1,2,3], 0],
  __description
};
