/**
 Do not return anything, modify matrix in-place instead.
 */
function rotate(matrix: number[][]): void {
  /** 
   * 旋转一个矩阵的数学运算式是
   * 1. 交换横坐标[顺时针] (或纵坐标[逆时针])
   * 2. 沿对角线翻折交换
   */
  let tmp;
  const n = matrix.length;
  /**
   * reverse dimensional
   */
  for (let i = 0; i < n / 2; i++) {
    tmp = matrix[i];
    matrix[i] = matrix[n - 1 - i];
    matrix[n - 1 - i] = tmp;
  }

  /**
   * reverse propotion
   */
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      tmp = matrix[i][j];
      matrix[i][j] = matrix[j][i];
      matrix[j][i] = tmp;
    }
  }
  // console.log(matrix)
};

export default {
  rotate,
  __description: `
    You are given an n x n 2D matrix representing an image, rotate the image by 90 degrees (clockwise).
  `,
  inputs: [
    // [
    //   [1, 2, 3],
    //   [4, 5, 6],
    //   [7, 8, 9],
    // ],
    [
      [1, 2, 3, 4],
      [5, 6, 7, 8],
      [9, 10,11,12],
      [13,14,15,16]
    ],
  ]
}