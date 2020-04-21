/**
 * Given an integer array nums, find the sum of the elements between indices i and j (i ≤ j), inclusive.
 */
/**
 * Note:
 * 1. You may assume that the array does not change.
 * 2. There are many calls to sumRange function.
 */

/* [Cache] 这道题就是建个缓存完事 */

/**
 * @param {number[]} nums
 */
var NumArray = function(nums) {
  var sum = [];
  sum[-1] = 0;
  for (var i = 0; i < nums.length; i++) {
    sum[i] = sum[i-1] + nums[i];
  }
  this.sum = sum;
};

/** 
 * @param {number} i 
 * @param {number} j
 * @return {number}
 * sumRange[i, j] = sum(i,i+1,i+2...j-2,j-1,j) = sum[j] - sum[i-1]
 */
NumArray.prototype.sumRange = function(i, j) {
  console.log(this.sum, this.sum[j], this.sum[i])
  this.sum.forEach((e, i)=>{
    console.log(i, ":", e)
  })
  /** [😁 note] 注意，当你在计算 sum[n] - sum[m] 的时候第 m 个数是被一起剪掉了的 */
  /** 比如 sum[0, 3] = [0,1,2,3] - [0] <- 直接相减的话是开区间， 0 被剪掉了 */
  return this.sum[j] - this.sum[i - 1]
};
/** 
 * Your NumArray object will be instantiated and called as such:
 * var obj = new NumArray(nums)
 * var param_1 = obj.sumRange(i,j)
 */
var inputs = [[-2, 1, -3, 4, -1, 2, 1, -5, 4], 0, 2];
// var inputs = [[2, 2, -3, 4]];
// var inputs = [[-2, -1]];
module.exports = {
  exec: function(nums, i, j) {
    var obj = new NumArray(nums)
    var param_1 = obj.sumRange(i,j)
    return param_1;
  },
  inputs,
};