/**
 * @description
 * You are a professional robber planning to rob houses along a street. 
 * Each house has a certain amount of money stashed, 
 * the only constraint stopping you from robbing each of them is that adjacent houses have security system connected and 
 * it will automatically contact the police if two adjacent houses were broken into on the same night.
 *
 * Given a list of non-negative integers representing the amount of money of each house,
 * determine the maximum amount of money you can rob tonight without alerting the police.
 *
 * [DP][ES6]
 * https: //leetcode.com/problems/best-time-to-buy-and-sell-stock/
 */

/**
 * @recursion
 * MAX(n) = MAX( MAX(n-1), MAX(n-2) + n )
 * 
 * @bound
 * MAX(0) = 0
 * MAX(1) = 1
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function(nums) {
  if (nums.length === 0) return 0;
  if (nums.length === 1) return nums[0];
  var i = 2;
  var ret = [nums[0], Math.max(nums[0], nums[1])];
  console.log(ret)
  while (i < nums.length) {
    ret[i] = Math.max(ret[i-1], ret[i-2] + nums[i]);
    i++;
  }
  return ret;
};

let inputs = [[2, 1, 1 ,2]];
module.exports = {
  rob,
  inputs,
};