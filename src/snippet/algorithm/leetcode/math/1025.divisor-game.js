/**
 * @description
 * Alice and Bob take turns playing a game, with Alice starting first.
 * Initially, there is a number `N` on the chalkboard.On each player 's turn, that player makes a move consisting of:
 * * Choosing any `x` with `0 < x < N` and `N % x == 0`.
 * * Replacing the number N on the chalkboard with N - x.
 * 
 * Also, if a player cannot make a move, they lose the game.
 * Return `True` if and only if Alice wins the game, 
 * assuming both players play optimally.
 * 
 * [DP]
 * https: //leetcode.com/problems/divisor-game/
 */

/**
 * @key
 * @see https://leetcode.com/problems/divisor-game/discuss/514275/JS-simple-explanation
 * odd = odd * odd
 * even = odd * even
 * even = even * even
 * so if odd have divisors, they must be odds,
 * 
 * odd - odd = even;
 * so then N is odd, we always give opponent an even number.
 * 
 * but for even we at least have divisor 1, 2
 * even - odd = odd;
 * even - even = even;
 * we can give opponent always an odd number
 * 
 * so if we start with an odd number, we'd always give opponent an even number
 * and none of number's divisor will bigger then its 1/2,
 * so we always approching N(3)
 * 
 * 一句话中文: 处理奇数的人永远给对面偶数，偶数可以永远给对面奇数
 * 最后都会收敛回 N(3) 和 N(2),
 * 奇数永远输
 */

/**
* @param {number} N
* @return {boolean}
*/
const divisorGame = function (N) {
  return N%2 === 0
};
const inputs = [100];
export default {
  divisorGame,
  inputs
}