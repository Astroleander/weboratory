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
  if (!root) {
    return false;
  }

  if (!root.left && !root.right) {
    return sum === root.val;
  }
  /** 递归思路实际上是在做减法 ———— 到了这个节点我们还剩这么多 */
  return hasPathSum(root.left, sum - root.val) || hasPathSum(root.right, sum - root.val);
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