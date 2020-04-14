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
 * @recursion who take the last one step
 * 1. get all divisors
 * 2. strategy(N) = strategy(d1) || strategy(d2) || ... || strategy(1)
 * 
 * @bound
 * 0 < x < N and N % x == 0
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