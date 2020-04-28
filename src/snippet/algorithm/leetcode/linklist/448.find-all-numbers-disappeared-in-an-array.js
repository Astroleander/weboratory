/**
 * @param {number[]} nums
 * @return {number[]}
 * Given an array of integers where 1 ≤ a[i] ≤ n (n = size of array), some elements appear twice and others appear once.
 * Find all the elements of [1, n] inclusive that do not appear in this array.
 * Could you do it without extra space and in O(n) runtime? You may assume the returned list does not count as extra space.
 * 
 * [💥 core] 将每个 nums[key] 的 value 视为指向nums[value] 的指针,只需要标记指向过的位置即可
 * 
 * 并非真正的链表 但是我们可以把数组的值看作链表, 把其指向位置标记为负数即可区分是否访问过, 一轮遍历过后, value 不是负数的 key2 表示没有 nums[key1] === value,
 * 也就是没有这个数
 * 用负值来标记是为了节约缓存位
 * 
 * (为了方便演示假设从 0 开始)
 * [1, 2, 0, 3, 2]
 * => 1, [1, -2, 0, 3, 2]
 * => 2, [1, -2, -0, 3, 2]
 * => 0, [-1, -2, -0, 3 2] // 你甚至能用 0 开始看出为什么题干要求从1开始: 0 不能简单标记 
 * => 3, [-1, -2, -0, -3, 2]
 * => 2, 无变化
 * index = 4 没有发生变化, 说明没有指针指向4
 * => 结束
 * 则只有 index = 4 为正数
 * 返回 [4]
 */
var findDisappearedNumbers = function(nums) {
  let ret = [], value;
  for (let key = 0; key < nums.length; key++) {
    /** 取绝对值, 有可能已经被访问过而变成负数了 */
    /** key 从 0 开始, value 从 1 开始, 需要对齐 */
    value = Math.abs(nums[key]) - 1;

    /** 访问 */
    if (nums[value] > 0) { /** 未访问过 */
      nums[value] = -nums[value]
    } 
  }

  /** 检查 value 没有被颠倒的 keys */
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] > 0) {
      ret.push(i + 1) /** 下标从 1 开始 */
    }
  }
  return ret
};

var inputs = [[1,2,4,5,2]];
module.exports = {
  findDisappearedNumbers,
  inputs
}