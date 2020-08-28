
let twoSum = function (nums, target) {
  let map = new Map();
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] > target) continue;
    const r = map.get(nums[i]);
    if (r !== undefined) return [r, i];
    map.set(target - nums[i], i);
  }
  return 'Not found pair';
}

let inputs = [[2, 7, 11, 15], 9];
module.exports = { twoSum, inputs };