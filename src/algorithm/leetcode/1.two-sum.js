/**
 * 
 */
let twoSum = function (nums, target) {
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] > target) continue;
    for (let j = 0; j < nums.length; j++) {
      if (nums[j] > target) continue;
      else if (nums[i] + nums[j] === target) return [i, j];
    }
  }
  return 'Not found pair';
}

let inputs = [[2, 7, 11, 15], 9];
module.exports = { twoSum, inputs };