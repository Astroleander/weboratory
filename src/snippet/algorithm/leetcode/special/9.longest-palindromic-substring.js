/**
 * Given a string s, find the longest palindromic substring in s. You may assume that the maximum length of s is 1000.
 * 
 * 用一种更显然的方法
 * 对于 n 长的字符串而言, 其最长回文串 m 一定满足有中心 (中心元素可能是一个或两个) c 有
 * 
 * n[c - i] = n[c + i]
 * 
 * 我们从每个字符开始, 逐一对其进行扩大操作，操作到最后的值必然是最大值
 * 
 * 复杂度：
 * 表面上, 每个元素最多扩展 n/2 次, 平均拓展 logn 次
 * 且不占用额外空间
 * 
 * 时间复杂度为 O(n)O(n/2) = O(n^2)
 * (我觉得该是O(nlogn))
 * 空间复杂度为 1
 */

var longestPalindrome = function(s) {
  const expandAroundCenter = (L, R) => {
    let ret = ''
    /** 这里是包含 0 位置的 */
    /** 没有必要操作字符串，直接管理下标, 事实上 用字符串过不了 leetcode 测试用例 */
    while (L >= 0 && R < s.length && s[L] === s[R]) {
      L--;
      R++;
    }
    return R - L - 1 /** length of substring */
  }
  var start = 0, end = 0;
  let len1 = 0, len2 = 0, len;
  for (let index = 0; index < s.length; index++) {
    /** leetcode solution 给的思路很好, 既然单旋和对称唯一的区别是 L 和 R 初始指向的位置不同 */
    len1 = expandAroundCenter(index, index);
    len2 = expandAroundCenter(index, index + 1);
    len = len1 > len2 ? len1 : len2;
    if (len > end - start) {
      /** 如果当前值更大, 这时才去获取字符串 */
      /** ~~JavaScript 的小数是截断机制, 对于 center - x.5 的结果 y.5 而言, 应该是向上取整的~~ */
      /** 
       * 更正, 上面这种是常见的误区, 实际上问题根源根本不在这里
       * 以 [a,b,c,b] 和 [a,b,c,c,b] 为例子
       * 由于中心扩展循环的初始化条件为 index,index 和 index, index+1, 
       * 1 中 [c] 的下标是 [2], start = 2 - 1.5 + 1, 此时 c 在确实因为向下取整的原因需要我们手动补回
       * 2 中 [c,c] 的下标是 [2,3]，[b,c,c,b] 下标是 [1,2,3,4], 发现没, 对于中心 [index, index+1] 而言,
       * 中心取整以后我们可以认为标定是在左侧中心(即index), 左侧的数量 = 右侧的数量 - 2
       * start = 2 - 2 + 1 (右侧实际只有 len/2 - 1 个元素, 需要把多剪的加回去)
       * end = 2 + 2 = 4 (区间是闭区间, 所以上界不用额外+1)
       */
      /** 
       * let c = '1234567'
       * c.substring(c.length/2, c.length) (3.5)
       * > 4567
       * c.substring(c.length/2 + 1, c.length) (4.5)
       * > 567
       */
      start = index - len / 2 + 1;
      /** end 向下取整, 正好没问题 */
      end = index + len / 2;
    }
  }
  return s.substring(start, end + 1)
};
var inputs = ['cc'];
module.exports = {
  inputs,
  longestPalindrome
}