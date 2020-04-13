/**
 * @description
 * On a staircase, the i - th step has some non - negative cost cost[i] assigned(0 indexed).
 * Once you pay the cost, you can either climb one or two steps.
 * You need to find minimum cost to reach the top of the floor, and you can either start from the step with index 0, or the step with index 1.
 * 
 * [DP]
 * https: //leetcode.com/problems/min-cost-climbing-stairs/
 */

/**
 * @recursion
 * MIN(n) = MIN( MIN(n-1), MIN(n-2) + value(n) )
 * 
 * @bound
 * MIN(1) = 1;
 */

/**
* @param {number[]} cost = [val, val, val]
* @return {number}
*/
var minCostClimbingStairs = function (cost) {
  if (!cost.length || cost.length < 2) return 'Error type';
  if (cost.length === 2) return Math.min(cost[0], cost[1])
  var i = 2;
  while(i < cost.length) {
    cost[i] = Math.min(cost[i - 1] + cost[i], cost[i - 2] + cost[i]);
    i++;
  }
  /** [🚧 review is needed] */
  return Math.min(cost[cost.length - 1], cost[cost.length - 2])
};

let inputs = [[2, 1, 4, 3, 11, 1, 11, 1, 2, 111]];
module.exports = {
  minCostClimbingStairs,
  inputs
};