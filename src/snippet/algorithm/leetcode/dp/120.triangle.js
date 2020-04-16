/**
 * @description
 * You are climbing a stair
 * case.It takes n steps to reach to the top.
 * Each time you can either climb 1 or 2 steps.In how many distinct ways can you climb to the top ?
 *
 * [DP]
 * https://leetcode.com/problems/triangle/
 */

/**
 * @recursion
 * @param n layer
 * @param m index
 * Min[n][m] = Min( Min[n+1][m], Min[n+1][m+1] )
 *
 * @bound
 * when n + 1 > triangle.length, Min[n][m] = [n][m]
 * 
 */
/**
 * @param {number[][]} triangle
 * @return {number}
 */
var minimumTotal = function(triangle) {
    /** Bottom to Top */
  var n = triangle.length - 1;
  if (n < 1) return (triangle && triangle[0][0]) || 0;
  var min = new Array(triangle.length)
  // console.log(min)
  while (n >= 0) {
    min[n] = []
    for (var m = 0; m < triangle[n].length; m++) {
      if (triangle[n + 1]) {
        min[n][m] = Math.min(min[n + 1][m], min[n + 1][m + 1]) + triangle[n][m];
      } else {
        /** 输出 output 会把 leetcode 打炸 */
        // console.log(n,m,min,triangle)
        min[n][m] = triangle[n][m];
      }
    }
    n--;
  }
  // return min;
  return min[0][0];
};

let inputs = [
  [
     [2],
    [3,4],
   [6,5,7],
  [4,1,8,3]
]
];
module.exports = {
  minimumTotal,
  inputs,
};
