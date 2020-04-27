/**
 * Given a string s, find the longest palindromic substring in s. You may assume that the maximum length of s is 1000.
 * 
 * [🚩 core] 
 * manacher 算法的核心是利用回文串左右两侧相等的特性, 对朴素的中心扩展算法进行优化
 * 
 * 1. 为了同时处理奇数和偶数的情况，我们给原字符串插入 # 符号
 * 2. 遍历每一个字符, 尽可能利用对称性 即 distance[i] = distance[i_mirror]
 * [🚩 core] 关键在于我们什么时候可以复用 distance
 *    case 1: i > R, i_mirror 和 i 都在 LPS(Longest Palindrome Substring) 的范围外, 无法复用
 *    case 2: i <= R
 *        case 2.1: 若 distance[i_mirror] < i_mirror - L, 
 *                  由于左右对称, 也就是 distance[i_mirror] < R - i
 *                  此时 i_mirror 处最大 LPS 完全处在以 center 为中心的 LPS 包围中
 *                  此时 distance[i_mirror] = distance[i]
 *        case 2.2: 若 distance[i_mirror] = i_mirror - L = R - i
 *                  即 i_mirror 处最大 LPS 的左边界 L 与当前 center 处最大 LPS 左边界重合,
 *                  由于对称性, i 处 LPS 至少拓展到 R 处, 但是可能会更长, 所以在此基础上需要进行继续扩展
 *        case 2.3: 若 distance[i_mirror] > i_mirror - L, 即 distance[i_mirror] > R - i
 *                  意味着 i_mirror 处的 LPS 长度超过了 center 点 LPS 的范围, 则 distance[i] = R - i
 *                  证明如下:
 *                  若 i 点 LPS 长度超过 R, 考虑 R+1 点的情况, 在 R+1 点关于 i 对称点 m 点必然在 center 的 LPS 范围内,
 *                  再求 m 点关于 center 的对称点 n, n 关于 i_mirror 的对称点必为 L - 1
 *                  因为过程中的对称性, 有 R+1 = m = n = L-1, 其结论 R+1 = L-1 显然与 center 最大 LPS 长度为 2R 矛盾 
 */

var longestPalindrome = function(s) {
  /** add hash to allow to handle ever odd or even */
  let r = s;
  s = '#' + Array.from(s).join('#') + '#';

  let slen = s.length;
  let distance = new Array(slen).fill(0);

  let center = 0;
  let right = 0;
  /** 从第一个实际字符开始 */
  let idx_mirror;
  for (let idx = 1; idx < slen; idx++) {
    /** [1.] 找到 idx 在 center 右侧的镜像位置 */
    /** center - idx_mirror = idx - center  */
    idx_mirror = 2 * center - idx;
    /** [2.] 尝试复用左侧对称的部分
     * 如果当前最大子回文串的最右指示位(right)大于 idx, 
     * 则我们可以复用左侧的结果
     **/

    /** [case 2.1] */
    /** [case 2.3] distace[idx_mirror] > R - i 不会发生*/
    if (right > idx) {
      /** idx_mirror 处的 distance 值显然不能超出到右边界的距离即 right - idx, 边界外是没有校验的, 需要停下来 */
      // console.log(distance,idx,':', distance[idx_mirror], right -idx)
      distance[idx] = Math.min(distance[idx_mirror], right - idx)
    }

    /** [case 2.2] */
    /** s[idx] 为中心进行朴素拓展 */
    while (
      idx + 1 + distance[idx] < slen &&
      idx - 1 - distance[idx] >= 0 &&
      s[idx + 1 + distance[idx]] === s[idx - 1 - distance[idx]]
    ) {
      distance[idx] += 1;
    }
    null

    /** 如果 LPS 右边界大于先前的值, 表示我们扫描过的值更多了, 则更新先前的值 */
    if (idx + distance[idx] > right) {
      center = idx;
      right = idx + distance[idx]
    }
  }

  let idx = distance.findIndex(e => e === Math.max(...distance));
  let start = (idx - distance[idx]) / 2
  return r.substring(start, start+distance[idx])
};
var inputs = ['bccabac'];
export default {
  inputs,
  longestPalindrome
}