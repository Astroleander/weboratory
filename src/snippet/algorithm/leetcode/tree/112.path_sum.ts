/**
 * @description
 * Given a binary tree and a sum, 
 * determine if the tree has a root-to-leaf path such that adding up all the values along the path equals the given sum.
 * 
 */

class TreeNode {
    val: number
    left: TreeNode | null
    right: TreeNode | null
    constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
        this.val = (val===undefined ? 0 : val)
        this.left = (left===undefined ? null : left)
        this.right = (right===undefined ? null : right)
    }
}

function hasPathSum(root: TreeNode | null, sum: number): boolean {
  const stack:Array<TreeNode | null> = [];
  let current:TreeNode | undefined | null = root;

  /** 因为要取当前节点的值作为子节点的依赖，我们使用先根序 */
  while (stack.length || current) {
    if (current) {
      /** 操作根节点, 操作内容是
       * 1. 检查自己是不是叶节点
       * 2. 是的话，check 一下
       * 3. 不是的话，分发自己的值，并进入子节点
       */
      if (!current.left && !current.right) {
        if (current.val === sum) return true;
        current = stack.pop();
        continue;
      }
      if (current.left) current.left.val += current.val;
      if (current.right) current.right.val += current.val;
      stack.push(current.right);
      current = current.left;
    } else {
      current = stack.pop();
    }
  }
  return false;
};


const tree = () => new TreeNode(
  30,
  new TreeNode(
    17,
    new TreeNode(
      32,
      new TreeNode(12),
      new TreeNode(44),
    )
  ),
  new TreeNode(
    11,
    new TreeNode(
      0
    ),
    new TreeNode(
      14
    )
  )
)

// todo: bug - input
export default {
  inputs: [tree(), 55],
  hasPathSum
}