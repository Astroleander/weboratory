function trap(height: number[]): number {
  let left = 0, right = height.length -1;
  let total = 0;
  let maxLeftHeight = 0, maxRightHeight = 0;
  while (left <= right) {
    /* 为了方便管理, 一次只移动一边, 水坑的高度由低端决定, 所以每次移动低的那端
     * 始终移动低端可以保证最后在两个指针 max 处汇合
     * 而 max 处是一定没有水的
     */
    if(height[left] <= height[right]) {
      if (height[left] >= maxLeftHeight) {
        maxLeftHeight = height[left]; // 当前木板遇到另一端, 收拢计数
        // console.log('left',maxLeftHeight)
      } else {
        total += maxLeftHeight - height[left]
        // console.log('l value', total)
      }
      left ++;
    } else {
      if (height[right] >= maxRightHeight) {
        maxRightHeight = height[right];
        // console.log('right',maxRightHeight)
      } else {
        total += maxRightHeight - height[right]
        // console.log('r value', total)
      }
      right --;
    }
  }
  return total;
};

const inputs = [[]]

export {
  trap,
  inputs
}