/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
class ListNode {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

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
      l1.next = new ListNode(0)
    }

    if (l1.next && !l2.next) {
      l2.next = new ListNode(0)
    }

    l1 = l1.next
    l2 = l2.next
  }
  return head
};

// ??? 为什么这个的耗时比上面长
let addTwoNumbers2 = function (l1, l2) {
  let head = l1;
  let tail = l1;
  let addon = 0;

  while (l1 && l2) {
    let cur = l1.val + l2.val + addon;
    l1.val = cur % 10;
    addon = ~~(cur / 10);
    tail = l1;
    l1 = l1.next;
    l2 = l2.next;
  }
  if (l2) {
    l1 = tail;
    l1.next = l2;
    l1 = l1.next;
  }
  while (l1) {
    l1.val += addon;

    addon = ~~(l1.val / 10);
    l1.val = l1.val % 10;

    tail = l1;
    l1 = l1.next;
  }
  if (addon) {
    tail.next = {
      val: 1,
      next: null
    }
  }
  return head
}
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
  addTwoNumbers2,
  inputs
};
/** [❌ BUG] module.exports 似乎调用了 node 接口, 并不支持 es6 语法, 有 class 就会报错*/
// module.exports = {
//   addTwoNumbers2,
//   inputs
// };