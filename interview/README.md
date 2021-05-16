## 206

**分析**

条件 单向链表

问题 改变了节点的指向  那么节点所存的原先节点的信息会被覆盖

因此需要改变之前需要能够保存指向的下一个值

又因为是单向 所以前面的元素也需要临时保存

所以整体使用三个指针

prev 保留前面的

curr 当前进行修改的

next 防止修改覆盖的

**CODE**

```js
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function(head) {
  let prev = null
  let curr = head
  let next = head
  while (curr){
    next = next.next
    curr.next = prev
    prev = curr
    curr = next
  }
  return prev
};
```









## 区间合并问题



直接上去处理会很麻烦



利用sort进行优化

有两种sort的可能

以start为标准进行sort

56 https://leetcode-cn.com/problems/merge-intervals/



以end作为标准进行sort

452 https://leetcode-cn.com/problems/minimum-number-of-arrows-to-burst-balloons/







## FROM

https://juejin.cn/post/6947842412102287373#heading-0

https://leetcode-cn.com/explore/interview/card/bytedance/243/array-and-sorting/1021/



## 142

![image-20210413164600672](http://picbed.sedationh.cn/image-20210413164600672.png)

