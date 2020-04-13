/**
 * @description
 * Given an integer array nums, find the contiguous subarray(containing at least one number) which has the largest sum and
 * return its sum.
 * 
 * [BF]
 * https: //leetcode.com/problems/climbing-stairs/
 */

/**
 * 
 */

 /**
  * @param {number[]} nums
  * @return {number}
  */
var maxSubArray = function (nums) {
  var maxSum = -Infinity;
  var subSum = 0;
  /** iteratively compare all subarray */
  for(var i = 0; i < nums.length; i++) {
    subSum += nums[i];
    if (subSum > maxSum) maxSum = subSum;
    if (subSum < 0) subSum = 0;
  }
  return maxSum;
};
// var inputs = [[-1, 12, 41, -25, 13, -5, -1 , 6, -11, 23, -1, 11]];
var inputs = [[-2, 1, -3, 4, -1, 2, 1, -5, 4]];
// var inputs = [[2, 2, -3, 4]];
// var inputs = [[-2, -1]];
module.exports = {
  maxSubArray,
  inputs
};