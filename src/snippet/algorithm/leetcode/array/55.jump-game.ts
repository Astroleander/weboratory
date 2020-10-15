function canJump(nums: number[]): boolean {
  if (nums.length === 0) return false;
  if (nums.length === 1) return true;
  /** 维护一个 maxJump 即可 */
  let maxJump = 0;
  let reach = 0;
  for (let i = 0; i < nums.length && reach <= maxJump; i++) {
    reach = i + nums[i];
    console.log(reach)
    if (maxJump >= i && reach > maxJump) {
      maxJump = i + nums[i];
    } 
  }
  if (maxJump >= nums.length - 1) return true;
  return false;
};

export default {
  canJump,
  inputs: [[2, 1, 0, 1]]
}