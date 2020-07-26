## 产品经理法

例题

[814. Binary Tree Pruning](https://leetcode-cn.com/problems/binary-tree-pruning/)

树的题目很适合用来递归来做。 基本上和树的搜索有关的，都可以用递归来做，为什么？

因为树是一种递归的数据结构。而穷举搜索一棵树必然需要遍历其所有节点，而搜索的逻辑对所有的子树都是一样的。因此这就很适合用递归来解决了。

这里给大家介绍一种写递归的小方法 **产品经理法**。

---



**产品**

假设我们已经有了一个 `pruneTree` 方法，可以把一棵树中不包含 `1` 的枝节删掉。

**子问题**

明显就是 `pruneTree(root.left)` 和 `pruneTree(root.right)` 啦。

**大小问题的关系**

首先，我们用 `pruneTree(root.left)` 和 `pruneTree(root.right)` 的结果分别替换掉原本的左子树和右子树。接着，再决定这棵树要不要保留。

- 如果此时左右子树有一个不为空的话，那说明这棵树是要保留的，直接返回 `root` 就行。
- 如果左右子树都为空，那我们就判断 `root.val` 的值，等于 1 就返回 `root`，等于 0 就返回 `null` 把这棵树移除。

**递归出口**

空节点直接返回 `null` 就行。

```js
var pruneTree = function (root) {
  if (root === null) return null
  root.left = pruneTree(root.left)
  root.right = pruneTree(root.right)
  return root.val === 0 && root.left === null && root.right === null ? null : root
};
```

