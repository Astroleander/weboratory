/**
 * suppose a node like that 
 * 
 * class Node {
 *   constructor(val = 0) {
 *     this.val = val;
 *     this.left = null;
 *     this.right = null;
 *   }
 * }
 */

/**
 * do something
 * @param {*} node 
 */
function exec(node) {
  console.log(node.val)
}

/**
 * @param {Object} root
 */
function inorderTraverseByStack(root) {
  if (root) {
    let cur = root; 
    let stack = [];
    /** traverse all */
    while (stack.length > 0 || cur) {
      if (cur) {
        /** middle */
        stack.push(cur);
        /** if left exists, go to left */
        cur = cur.left;
      } else {
        /** add all right node when backtrack */
        cur = stack.pop();
        exec(cur);
        cur = cur.right;
      }
    }
  }
}

/**
 * @param {Object} root
 */
function inorderTraverseByRecursion(root) {
  if (root) {
    inorderTraverseByRecursion(root.left);
    exec(root)
    inorderTraverseByRecursion(root.right);
  }
}

let inputs = { val: 2, 
    left: { 
      val: 4, 
      left: { 
        val: 6, 
        right: null
      }
    },
    right: 
    {
      val: 5,
      left: {
        val: 6,
        left: {
          val: 4,
          left: {
            val: 9,
            left: null
          }
        }
      }
    }
  };

console.log('=== stack ===')
inorderTraverseByStack(inputs)
console.log('=== recursion ===')
inorderTraverseByRecursion(inputs)