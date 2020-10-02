export const __description = `
1
`
export const __solution = /* md */`
/**
 * 你可以把这道题视作一个快慢指针的变种，
 * 0, 1, 1, 1, 2, 2, 3, 1, 3
 *    ^slow    ^fast
 * 0, 2, 1, 1, 1, 2, 3, 1, 3
 *       ^slow    ^fast
 * 0, 2, 2, 1, 1, 1, 3, 1, 3
 *          ^        ^
 * 0, 2, 2, 3, 1, 1, 1, 1, 3
 *             ^           ^
 * 0, 2, 2, 3, 3,
 *             ^ fast loop over, return slow
 * 
 * p_fast 不断 + 1
 * p_slow 只在遇到非指定元素的时候 + 1
 * 
 * 这种类型的题的本质都是都是依赖一个额外的指针，在数组里重新维护一份符合标准的子数组
 */
`

export function removeElement(nums: number[], target: number): number {
 if (nums.length === 0) return 0;

 let p_slow = 0;
 for (let p_fast = 0, tmp; p_fast < nums.length; p_fast++) {
   if (nums[p_fast] !== target) {
    if (p_fast !== p_slow) {
      tmp = nums[p_fast];
      nums[p_fast] = nums[p_slow];
      nums[p_slow] = tmp;
      p_slow++;
    } else {
      p_slow++;
    }
   }
 }
 return p_slow;
};
export const inputs = [[1,2,1,2,1,2,3,4,5,1,2,3,4,5], 1]