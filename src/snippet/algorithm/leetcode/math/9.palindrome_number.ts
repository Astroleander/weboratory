function isPalindrome(x: number): boolean {
  let lowest = 0;
  let newer = 0;
  let older = x;

  if (x < 0) return false;

  while(x) {
    /** 每次把最后一次数字抠下来 */
    lowest = x % 10;
    /** 把抠下来的数字贴在新数字的最后 */
    newer = newer * 10 + lowest;
    x = (x - x %10 ) / 10;
  }
  if (newer === older) {
    return true
  }
  return false
};

export default {
  isPalindrome,
  inputs: [12221]
}