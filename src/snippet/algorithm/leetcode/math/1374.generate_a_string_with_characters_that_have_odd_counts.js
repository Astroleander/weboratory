/**
 * @param {number} n
 * @return {string}
 */
var generateTheString = function(n) {
    // odd + odd = even
    // odd + odd + odd = odd
    /** ↑ 但是这个思路涉及找点 怪麻烦的 */
    /** 来点暴力的, 取其中两个 odd = 1*/
    // odd + 1 = even
    // odd + 1 + 1 = odd
    let ret = '';
    if (n === 0) return ''
    if (n === 1) return 'c'
    if (n % 2) { // odd
      ret = 'z'
      n = n - 1;
    }
    ret += 'x';
    /** 如果是奇数, 已经有 zx, 填充 (n-1)-1 个 o */
    /** 如果是偶数, 已经有一个 x, 填充 n - 1 个 o */
    if (n - 1 > 0) {
      ret += 'o'.repeat(n - 1);
    }
    return ret;
};
const inputs = [100];
export default {
  generateTheString,
  inputs
}