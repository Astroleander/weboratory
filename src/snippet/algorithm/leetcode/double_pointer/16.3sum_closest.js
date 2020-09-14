const __description = `
Given an array nums of n integers and an integer target, find three integers in nums such that the sum is closest to target. Return the sum of the three integers. You may assume that each input would have exactly one solution.
`
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
const threeSumClosest = function(nums, target) {
  let diff = Infinity, ret;
  nums.sort((a,b) => a - b);
  let sum;
  for (let i = 0; i < nums.length - 2; i++) {
    for (let j = i + 1, k = nums.length - 1; j < k; null) {
      sum = nums[i] + nums[j] + nums[k];
      if (Math.abs(sum - target) < diff) {
        diff = Math.abs(sum - target);
        console.log(Math.abs(sum - target))
        ret = sum;
      }
      if (sum === target) return ret;
      else if (sum > target) {
        k--;
      } else {
        j++;
      }
    }
  }
  return ret;
};

export default {
  threeSumClosest,
  inputs: [
    [-1,2,1,-4], 1],
  __description
}