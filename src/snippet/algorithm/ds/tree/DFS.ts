interface MyNode<T> {
  value: T,
  left: MyNode<T>,
  right: MyNode<T>
}

function DFS (root: MyNode<any>): {} {
  /** 类型 + 方括号法 */
  let resultPreOrder: any[] = [];
  /** 泛型法 */
  let resultInOrder: Array<any> = [];
  /** 接口法 */
  interface TArray {
    [index:number]: any;
    push: any,
    reverse: any
  }
  let resultPostOrder: TArray = [];

  let current: undefined|MyNode<any> = root;
  /** 先序遍历 (非递归) */
  let stack: MyNode<any>[] = [];
  while (stack.length > 0 || current) {
    if (current) {
      resultPreOrder.push(current.value);
      stack.push(current);
      current = current.left;
    } else {
      current = stack.pop();
      current = current && current.right;
    }
  }
  /** 中序遍历 (非递归) */
  // stack = []; // no need to clear stack
  current = root; /** reset current */
  while (stack.length > 0 || current) {
    if (current) {
      stack.push(current);
      current = current.left;
    } else {
      current = stack.pop();
      resultInOrder.push(current && current.value);
      current = current && current.right;
    }
  }
  /** 后序遍历 (非递归) (取巧)*/
  /** 
   * 后序遍历的顺序：   左 -> 右 -> 根
   * 那么可以视后序为： 根 -> 右 -> 左，然后反转即可
   */
  current = root;
  while (stack.length > 0 || current) {
    if (current) {
      stack.push(current)
      resultPostOrder.push(current && current.value);
      current = current.right;
    } else {
      current = stack.pop();
      current = current && current.left;
    }
  }
  resultPostOrder = resultPostOrder.reverse();
  return {
    resultPreOrder,
    resultInOrder,
    resultPostOrder
  };
}

export default {
  DFS,
  inputs: [
    { value: 12, 
      left: {
        value: 24,
        left: null,
        right: null,
      }, 
      right: {
        value: 18,
        left: {
          value: 45,
          left: null,
          right: null
        },
        right: {
          value: 36,
          left: null,
          right: null
        }
      }
    }
  ]
}