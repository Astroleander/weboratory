/**
 * Given a string s, find the longest palindromic substring in s. You may assume that the maximum length of s is 1000.
 * 
 * [DP]
 * 
 * P(i, j) = S[i] === S[j] && P(i+1, j-1);
 * 
 * P(i, i) = true
 * p(i, i+1) = S[i] === S[i+1]
 * 
 */

/** 建立一个二维数组例子来帮忙理解自底向上方法 */
/**
 * abaab
 * init:
 * [   a,    ,    ,    ,   ]    [   a,   -, aba,    ,    ]
 * [   x,   b,    ,    ,   ]    [   x,   b,   -,   -,baab]
 * [   x,   x,   a,  aa,   ] => [   x,   x,   a,  aa,    ]
 * [   x,   x,   x,   a,   ]    [   x,   x,   x,   a,    ]
 * [   x,   x,   x,   x,  b]    [   x,   x,   x,   x,   b]
 * 
 * 可以看到 若 P[i+1][j-1] 是回文串，则 P[i][j] 一定是回文串
 * 我们可以从 P[i][j] 开始 从左下到右上 递归求解
 * 
 * 本题的另一个难点是如何迭代 i,j
 * 
 * 归纳法试一试 (没用上) (没用上的原因我觉得是其表现形式和矩阵不一样 我这样的蠢人看不出来)
 * loop 1 : 1,1 2,2 3,3 4,4 5,5
 * loop 2 : 1,2 2,3 3,4 4,5
 * loop 3 : 1,3 2,4 3,5
 * loop 4 : 1,4 2,5
 * loop 5 : 1,5
 * 
 * 注意, 后来的元素在前一个元素的右上角 ([i-1][j+1])
 * 由于 i-1 说明后来元素在 P 中的位置始终更靠前
 * 所以我们必须逆序遍历 i,
 * 再观察 j, 回到矩阵本身, 注意到 每行的有效元素
 * row 1: 1,1 1,2 1,3 1,4 1,5
 * row 2:     2,2 2,3 2,4 2,5
 * row 3:         3,3 3,4 3,5
 * row 4:             4,4 4,5
 * rwo 5:                 5,5
 * 这样一来就太明显了, j 的取值范围是 [i, s.len-1]
 * 
 * 时间复杂度 T(i, j) = T(i - 1)(j + 1) + θ = ij二维数组每一个T(i,j) 都是 n 一共 n 个，其数量为 n^2 = O(n^2)
 * 空间复杂度 P[i][j] size = O(n^2)
 * 
 */

/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function(s) {
  var max = '';
  var updateMax = (comp) => {
    if (comp.length > max.length) {
      max = comp;
    }
  }
  /** while the best algorithm is not dp */
  let P = new Array(s.length).fill(null).map((e, i) => new Array(s.length).fill(''));
  for (let i = s.length - 1; i >= 0; i--) {
    for (let j = i; j < s.length; j++) {
      if (i === j) {
        /** 对角线 */
        P[i][j] = s[i];
        updateMax(P[i][j]);
      } else if (i + 1 === j && s[i] === s[j]) {
        /** 对角线旁边那条 */
        P[i][j] = s[i] + s[j];
        updateMax(P[i][j]);
      } else if (s[i] === s[j] && j > 0 && i < s.length - 1 && P[i + 1][j - 1] !== ''){
        /** 寻找自己的左下节点, 左下节点必须存在且为回文串 */
        P[i][j] = s[i] + P[i + 1][j - 1] + s[j];
        updateMax(P[i][j]);
      }
    }
  }
  console.table(P)
  return max
};
var inputs = ['abaaab'];
module.exports = {
  longestPalindrome,
  inputs
}