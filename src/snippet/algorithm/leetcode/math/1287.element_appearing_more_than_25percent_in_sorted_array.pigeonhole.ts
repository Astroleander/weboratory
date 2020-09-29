export const __description = `
Given an integer array sorted in non-decreasing order, there is exactly one integer in the array that occurs more than 25% of the time.
`;
export function findSpecialInteger(arr: number[]): number {
  /**
   * 用鸽巢原理做这个题: 若有n个笼子和kn+1只鸽子，所有的鸽子都被关在鸽笼里，那么至少有一个笼子有至少k+1只鸽子。
   *
   * 把 k (k > n) 个数放在 4n 长里的数组里，
   * 则划分四个笼子 [0, n][n, 2n][2n, 3n][3n, 4n], k 必然位于至少两个笼子内, 且 k 连续
   * 则 0,n,2n,3n,4n值中必有一个 === k
   *
   * 设端点为 j
   * + 若有不止 1 个笼子的端点 v(j)=== k, 则可以立即返回
   * + 若笼子端点数字均不同
   *    + case 1: v( j-n/2 )(小段中点) === v( j+n/2 )(大段中点) === v(j) 立即返回
   *    + case 2: v( j-n/2 )(小段中点) === v(j) => [j-n/2, j] 这 1/8 是 j
   *    + case 3: v( j+n/2 )(大段中点) === v(j) => [j, j+n/2] 这 1/8 是 j
   * 随后基于端点左右扩张，对于每一个 j 点, 有 high - low > 0 时即找到结果
   * Space: O(4 + 2) = nums(n) + low + high
   * Time: O(4 + n): for worst case, you must expand every j
   *
   * 优化一下
   * 如果把笼子缩小一倍
   * 则划分 8 个笼子 [0, 0.5n][0.5n, n][n, 1.5n][1.5n, 2n][2n, 2.5n][2.5n, 3n][3n, 3.5n][3.5n, 4n]
   * k 必然位于至少三个笼子内, 且 k 连续
   * 我们已知旧的 case 2, case 3 下的 1/8, 必然是个闭合区间,
   * 则如果这 8 个笼子如果有 三个边界相等 则 0.5 + 0.5 >= 1 直接可以返回值
   * 对其进行左右搜索, 直到 high - low > n
   *
   * 随后我们发现，实际上还是需要左右扩展，只是此时的代价向 n/2 收拢
   * Space: O(4 * 2 + 2) = nums(n) + low + high
   * Time: O(8 + n/2): for worst case, you must expand every j
   *
   * 所以其实没有优化的必要
   * 实际上求较多数有专门的算法，用鸽巢进行二分优化进一步优化的空间很小, O 介于 O(logn) 到 O(n) 之间，
   * 由于切分 n 次时切分代价不再是常数，所以不会趋近于 O(logn)
   */
  let piovt: number[] = [0.25, 0.5, 0.75];
  let base;
  let mid, low, high;
  for (let pidx: number = 0; pidx < piovt.length; pidx++) {
    mid = low = high = Math.floor(arr.length * piovt[pidx]);
    base = arr[mid];
    do {
      low--;
    } while (arr[low] === base);
    do {
      high++;
    } while (arr[high] === base);
    if (high - low - 1> arr.length * 0.25) {
      return arr[mid]
    }
  }
  return -1
  // return arr[0];
}
export const inputs = [
  [1, 2, 2, 3]
];
