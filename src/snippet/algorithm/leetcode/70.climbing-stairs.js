/**
 * @description
 * You are climbing a stair
 * case.It takes n steps to reach to the top.
 * Each time you can either climb 1 or 2 steps.In how many distinct ways can you climb to the top ?
 * 
 * [DP]
 * https: //leetcode.com/problems/climbing-stairs/
 */

/**
* @recursion
* SUM(n) = SUM (n-1) + SUM (n-2) 
* 
* @bound
* SUM(1) = 1;
* SUM(2) = 2;
*/


/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function (n) {
  if (n === 1) return 1;
  if (n === 2) return 2;
  /** else n > 3, using status function, bottom to top */
  var i = 2;
  let ret = [1, 2];
  while ( i <= n ) {
    ret[i] = ret[i-1] + ret[i-2];
    i++;
  }
  return ret[n-1]
};

let inputs = [4];
module.exports = {
  climbStairs,
  inputs
};
