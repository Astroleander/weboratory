/**
 * 
 * https://leetcode.com/problems/range-sum-query-2d-immutable/
 * 1. You may assume that the matrix does not change.
 * 2. There are many calls to sumRegion function.
 * 3. You may assume that row1 ≤ row2 and col1 ≤ col2.
 */

/**
 *                    sum[r1](c1....c2)
 * sum(r1,c1,r2,c2) = sum[r1+1](c1...c2)
 *                    ...
 *                    sum[r1+n](c1....cn)
 */

/**
 * 首先我们尝试只对第一步(行)按照 303 进行 DP, 第二步我们采用暴力的方式对列直接进行加和
 * @param {number[][]} matrix
 */
var NumMatrix = function(matrix) {
  var sum = [];
  for (let i = 0; i < matrix.length; i++) {
    sum[i] = [];
    sum[i][-1] = 0;
    for (let j = 0; j < matrix[i].length; j++) {
      sum[i][j] = sum[i][j - 1] + matrix[i][j];
    }
  }
  this.sum = sum;
  console.log(this.sum);
};

/**
 * @param {number} row1
 * @param {number} col1
 * @param {number} row2
 * @param {number} col2
 * @return {number}
 */
NumMatrix.prototype.sumRegion = function(row1, col1, row2, col2) {
  return this.sum.slice(row1, row2+1).reduce(function(pv, cv){
    console.log(cv[col2] - cv[col1 - 1]);
    return pv + cv[col2] - cv[col1 - 1]
  }, 0)
};

/**
 * Your NumMatrix object will be instantiated and called as such:
 * var obj = new NumMatrix(matrix)
 * var param_1 = obj.sumRegion(row1,col1,row2,col2)
 */
var inputs = [[[1,2,3],[4,-5,6],[7,8,9]], 0, 0, 2, 2];
// var inputs = [[2, 2, -3, 4]];
// var inputs = [[-2, -1]];
module.exports = {
  exec: function(nums, r1, c1, r2, c2) {
    var obj = new NumMatrix(nums);
    var param_1 = obj.sumRegion(r1, c1, r2, c2);
    return param_1;
  },
  inputs,
};