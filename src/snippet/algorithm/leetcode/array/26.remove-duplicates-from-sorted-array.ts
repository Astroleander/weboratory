const __description = `
Given a sorted array nums, remove the duplicates in-place such that each element appear only once and return the new length.

Do not allocate extra space for another array, you must do this by modifying the input array in-place with O(1) extra memory.`

function removeDuplicates(nums: number[]): number {
  if (nums.length < 1) return 0;
  let finder = 0;
  let last = 0;
  for (let last = 0; last < nums.length; last++) {
    // 找到下一个不同的元素
    while (nums[finder] === nums[last]) {
      finder ++;
      if (finder == nums.length) { // 如果遍历 finder 全是重复的，则返回
        return last + 1;
      }
    }
    // 把下一个元素(last + 1)换为找到的不同的元素(finder)
    nums[last + 1] = nums[finder];
    console.log(nums)
  }
  return finder + 1;
};

export default {
  removeDuplicates,
  __description,
  inputs: [[1, 1, 2, 2, 2, 3, 4, 4, 5]]
}