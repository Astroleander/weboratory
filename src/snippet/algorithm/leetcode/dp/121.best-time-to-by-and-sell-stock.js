/**
 * @description
 * Say you have an array
 * for which the ith element is the price of a given stock on day i.
 * If you were only permitted to complete at most one transaction(i.e., buy one and sell one share of the stock), design an algorithm to find the maximum profit.
 * Note that you cannot sell a stock before you buy one.
 * 
 * [DP][ES6]
 * https: //leetcode.com/problems/best-time-to-buy-and-sell-stock/
 */

/**
 * @recursion
 * make deviation first
 * MAX(n) = MAX( MAX(n-1), MAX(n-1) + n )
 * 
 * @bound
 * SUM(0) = 0;
 * 
 * @update
 * deviation[i, j] < 0 -> set j as another hold-lifecycle start
 */

 /**
  * @param {number[]} prices
  * @return {number}
  */
var maxProfit = function (prices) {
  /** [ ⛔ error ] what if the value of a[i-1] equals to number 0 ? 👇 */
  // let deviation = prices.map((v, i, a) => a[i-1] ? v - a[i - 1] : 0);
  let deviation = prices.map((v, i, a) => i !== 0 ? v - a[i - 1] : 0);
  let i = 1;
  let ret = [0];
  let max = 0;
  while(i < prices.length) {
    /** it's too hard for me to expain by english */
    /** 目前还是赚的, 可以继续持有,看能不做赚更多 vs. 从头到今天居然是亏的, 还不如重新来过 (当前值记为新的起点) */
    ret[i] = ret[i - 1] + deviation[i] > 0 ? ret[i - 1] + deviation[i] : 0;
    max = Math.max(max, ret[i]);
    i++;
  }
  /** for display */
  return [deviation,ret, max];
  /** for sumbit */
  // return max;
};

let inputs = [
  [2, 1, 2, 1, 0, 1, 2]
];

export default {
  maxProfit,
  inputs
};