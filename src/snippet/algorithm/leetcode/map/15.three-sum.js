const description = `
Given an array nums of n integers, are there elements a, b, c in nums such that a + b + c = 0? Find all unique triplets in the array which gives the sum of zero.
Notice that the solution set must not contain duplicate triplets.
`
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
const threeSum = function(nums) {
  // 这他妈是字典序，我吐了
  // nums.sort(); 
  nums.sort((a, b) => a - b); 
  const ret = [];
  console.log(nums)
  // create n two-sum problems;
  let twosum;
  let low, high;

  for (let i = 0; i < nums.length; i++) {
    if (i > 0 && nums[i] === nums[i-1]) continue; // not deal with duplicated;
    twosum = -nums[i];
    low = i + 1, high = nums.length - 1;
    console.log(-twosum)
    while (low < high) {
      if (twosum === nums[low] + nums[high]) {
        ret.push([-twosum, nums[low], nums[high]]);
        low ++;
        high --;

        while (low < high && nums[low] === nums[low - 1]) {
          low ++;
        }
        while (low < high && nums[high] === nums[high + 1]) {
          high --;
        }
      } else if (twosum < nums[low] + nums[high]) { // 当前三个数相加大于 0, twosum 的两个数过大
        high --;
      } else {
        low ++;
      }
    }
  }
  return ret;
};

export default {
  threeSum,
  inputs: [[-1,0,1,2,-1,-4,-2,-3,3,0,4]],
  __description: description
}