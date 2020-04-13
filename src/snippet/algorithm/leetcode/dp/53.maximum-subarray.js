/**
 * @description
 * Given an integer array nums, find the contiguous subarray(containing at least one number) which has the largest sum and
 * return its sum.
 * 
 * [DP]
 * https: //leetcode.com/problems/climbing-stairs/
 */

/**
 * @recursion
 * MAX(n) = MAX(MAX(nleft), MAX(nright), MAX(ncross));
 *
 * @bound
 * n.length === 1
 * MAX(n) = n[0]
 */

 /**
  * @param {number[]} nums
  * @return {number}
  */
var maxSubArray = function (nums) {
  var maxSubArrayRecursion = function (arr, start, end) {
    // console.log(start, end)
    if (end - start < 1) return arr[start];
    var partition = ~~((start + end) / 2) + 1;
    /** for left branches */
    var leftacc = 0, leftmax = -Infinity;
    var i = partition - 1;
    /** for right branches */
    var rightacc = 0, rightmax = -Infinity;
    var j = partition;
    while(i >= start) {
      leftacc += arr[i];
      leftmax = Math.max(leftmax, leftacc)
      i--;
    }
    while(j <= end) {
      rightacc += arr[j];
      rightmax = Math.max(rightmax, rightacc)
      j++;
    }
    console.log(leftacc,leftmax,rightacc,rightmax)
    return Math.max(
      maxSubArrayRecursion(arr, start, partition - 1),
      maxSubArrayRecursion(arr, partition, end),
      leftmax + rightmax
    )
  }
  return maxSubArrayRecursion(nums, 0, nums.length - 1);
};
// var inputs = [[-1, 12, 41, -25, 13, -5, -1 , 6, -11, 23, -1, 11]];
var inputs = [[-2, 1, -3, 4, -1, 2, 1, -5, 4]];
// var inputs = [[2, 2, -3, 4]];
// var inputs = [[-2, -1]];
module.exports = {
  maxSubArray,
  inputs
};