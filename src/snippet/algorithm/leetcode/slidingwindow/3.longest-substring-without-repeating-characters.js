/**
 * 1. 初始化字符串游标，窗口，窗口游标
 * 2. 循环
 *    2.1 对字符串的每一位进行循环
 *    2.2 当前窗口从第 0 位开始从小到大遍历，是否有第 n 位等于当前扫描到的 字符串里的 字符
 *        2.2.1 若有 将包含这位及以前的所有窗口滑出 (p_sliding + 1)
 *    2.3 把当前字符串字符加入窗口
 *    2.4 比较窗口值和最大值 若最大值可更新则进行更新
 * 3. 返回最大值
 */
var lengthOfLongestSubstring = function(target) {
  var max = '';
  var sliding = '';
  var p_sliding, p_target = 0;
  while (p_target < target.length) {
    p_sliding = 0;
    while (p_sliding < sliding.length) {
      if (sliding[p_sliding] === target[p_target]) {
        sliding = sliding.slice(p_sliding + 1);
      }
      p_sliding ++;
    }
    sliding += target[p_target];
    if (sliding.length > max.length) {
      max = sliding
    }
    p_target ++;
  } 
  return max.length;
};
const inputs = ['abcda'];
export default {
  lengthOfLongestSubstring,
  inputs
}