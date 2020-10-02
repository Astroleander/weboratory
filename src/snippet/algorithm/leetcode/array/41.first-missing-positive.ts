export function firstMissingPositive(nums: number[]): number {
  /** 第一趟标记所有负数和 0, 让它们也可以使用正负号来标记，同时不会影响标记值 */
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] <= 0) {
      nums[i] = 0.5;  // index 只能是整数
    }
  }
  console.log(nums)
  /** 第二趟, 此时回到了查找 missing index 的问题 */
  let index, max = 0;
  for (let i = 0; i < nums.length; i++) {
    index = Math.abs(nums[i]);
    if (index <= nums.length && index > max) {
      max = index;
    }
    if (nums[index] > 0) nums[index] = -nums[index];
  }


  console.log(nums)
  /** 第三趟, 让我康康谁没被调用 */
  /** positive number -> 0 is no need to checking -> start and 1 */
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] > 0) {
      return i
    }
  }
  return Math.floor(max) + 1
};

export const inputs = [[0, 1, 0, 2,0, 2, 3, 3, 3, 3]]
// export const inputs = [[3,4,-1,1]]
// export const inputs = [[7,8,9,11,12]]
// export const inputs = [[-1,-2]]
// export const inputs = [[0, -1]]
// export const inputs = [[0, -1, 1, 2, 3, 4, 1]]
// export const inputs = [[-6]]
// export const inputs = [[3]]
// export const inputs = [[0]]
// export const inputs = [[1]]
// export const inputs = [[1,0,3,3,0,2]]
