/**
 * 
 * Given a string _s_ and a string _t_, check if _s_ is subsequence of _t_.
 * You may assume that there is only lower case English letters in both s and t. t is potentially a very long (length ~= 500,000) string, and s is a short string (<=100).

A subsequence of a string is a new string which is formed from the original string by deleting some (can be none) of the characters without disturbing the relative positions of the remaining characters. (ie, "ace" is a subsequence of "abcde" while "aec" is not).
 */

/**
 * 由状态转移方程:
 * isSubsequence(s[0 : m] in t) = isSubsequence(s[0 : m-1] in t[k-1]) && s[m] in t[k : n];
 * 
 * ~~我们可以观察到，必须保留变量 k 来标志当前已匹配字符串量~~
 * 👆 没必要 直接删了前面的串就行了
 */

/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isSubsequence = function(s, t) {
  var n = 0; /** Match from head */
  var cur_match_ret = -1;
  while (n < s.length) {
    t = t.substring(cur_match_ret + 1, t.length);

    cur_match_ret = t.indexOf(s[n]);
    if(cur_match_ret === -1) return false;

    // console.log(`s[${n}]:${s[n]} is in t, and t[k:] is ${t}`);
    n++;
  }
  return true
};

var inputs = ["abc", "cabcde"]
module.exports = {
  isSubsequence,
  inputs
}

/**
 * note
 * 一开始的版本包含记录匹配位置的 k
 * 第二个版本中发现如果我们用一个数组 r 来保存"每个子串匹配的位置"的话状态转移到子问题的时候是不用 k 的 (两个值是一个含义)
 * 但是如果用 substring 来不断切割子串的话, 匹配值就没什么特别的意思 
 *  - 这个时候的匹配值基于上一次状态的偏移值, 如果想要知道子串被匹配的字符 m, 需要把 r 所有的结果加一遍
 *  - 想要解决这个问题的方法是不使用 substring 来切割, 说起来根本没必要额外去堆栈一次, 维护好 r 就好
 *  - 好像有一个题就是要求像 ↑ 上面这条这么做 那我就不改了
 */