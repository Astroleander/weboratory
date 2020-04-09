
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 * 
 * ⛔ 要用 while 直接拉完必须考虑到
 * 1. l1.next 置空后无法回指，必须保留额外变量
 * 2. 如果以 l1.next/l2.next 为循环变量, js 又没有 do-while
 */
let addTwoNumbers = function (l1, l2) {
  let head = l1
  let addon = 0
  let val = 0

  while (l1 && l2) {
    val = l1.val + l2.val + addon
    l1.val = val % 10;
    addon = ~~(val / 10);

    if ((addon || l2.next) && !l1.next) {
      l1.next = { val: null, next: null }
    }

    if (l1.next && !l2.next) {
      l2.next = { val: null, next: null }
    }

    l1 = l1.next
    l2 = l2.next
  }
  return head
};

let inputs = [{
    val: 2,
    next: {
      val: 4,
      next: {
        val: 6,
        next: null
      }
    }
  },
  {
    val: 5,
    next: {
      val: 6,
      next: {
        val: 4,
        next: {
          val: 9,
          next: null
        }
      }
    }
  }
];
let inputs2 = [
  // { val: 1, next: null},
  null,
  null
];
export default {
  addTwoNumbers,
  inputs
};
/** [❌ BUG] module.exports 似乎调用了 node 接口, 并不支持 es6 语法, 有 class 就会报错*/
// module.exports = {
//   addTwoNumbers2,
//   inputs
// };