/**
 * https://leetcode.com/articles/range-sum-query-2d-immutable/#approach-4-caching-smarter-accepted
 * 核心思路
 * 假设四个点按照 CSS 顺序为 ABCD, 原点为 O
 * sumMartix(ABCD) = sumMartix(OD) 
 *                   - sumMartix(OB) - sumMartix(OC)
 *                   + sumMartix(OA) 
 * note: OB = OA + AB; OC = OA + AC; 所以需要补一个回去
 */
var NumMatrix = function(matrix) {
  /** 这里也非常有趣，显然 fill 的实现是引用的参数, 我们需要一个 map 来帮助我们 */
  var sum = new Array(matrix.length).fill(null).map(each => each = new Array());
  for (var i = 0; i < matrix.length; i++) {
    // sum[i] = []
    /** sum 计算式和 sumMartix 一样, 都是 OD - OB - OC + OA */
    for (var j = 0; j < matrix[i].length; j++) {
        sum[i][j] = matrix[i][j] + 
          /** 左侧 */ (j > 0 ? sum[i][j - 1] : 0) +
          /** 上侧 */ (i > 0 ? sum[i - 1][j] : 0) +
          /** 对角线区域 */ - (i > 0 && j > 0 ? sum[i - 1][j - 1] : 0);
      console.log(JSON.stringify(sum));
      console.log({
        last: i > 0 && j > 0 ? sum[i - 1][j - 1] : 0,
        left: j > 0 ? sum[i][j - 1] : 0,
        above: i > 0 ? sum[i - 1][j] : 0,
        self: matrix[i][j],
      });
    }
  }
  this.sum = sum;
};

/**
 * @param {number} row1
 * @param {number} col1
 * @param {number} row2
 * @param {number} col2
 * @return {number}
 */
NumMatrix.prototype.sumRegion = function(row1, col1, row2, col2) {
  row1 -= 1;
  col1 -= 1;
  console.log(row1,col1)
  console.log({
    OD: this.sum[row2][col2],
    OB: row1 < 0 ? 0 : this.sum[row1][col2],
    OC: col1 < 0 ? 0 : this.sum[row2][col1],
    OA: row1 < 0 || col1 < 0 ? 0 : this.sum[row1][col1],
  });
  /** 注意颠倒符号会多出等号来 > 对应 <=, && 也要变成 || */
  return /** OD */  this.sum[row2][col2]
         /** OB */- (row1 < 0 ? 0 : this.sum[row1][col2])
         /** OC */- (col1 < 0 ? 0 : this.sum[row2][col1])
         /** OA */+ (row1 < 0 || col1 < 0 ? 0 : this.sum[row1][col1])
};

/**
 * Your NumMatrix object will be instantiated and called as such:
 * var obj = new NumMatrix(matrix)
 * var param_1 = obj.sumRegion(row1,col1,row2,col2)
 */
var inputs = [
  [
    [-4,-5]
  ],
  0,1,0,1,
];
// var inputs = [[2, 2, -3, 4]];[2,1,4,3],[1,1,2,2],[1,2,2,4]
// var inputs = [[-2, -1]];
module.exports = {
  exec: function(nums, r1, c1, r2, c2) {
    var obj = new NumMatrix(nums);
    var param_1 = obj.sumRegion(r1, c1, r2, c2);
    return param_1;
  },
  inputs,
};