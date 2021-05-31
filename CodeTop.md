## [206. Reverse Linked List](https://leetcode-cn.com/problems/reverse-linked-list/)

Given the head of a singly linked list, reverse the list, and return the reversed list.

 ![img](https://assets.leetcode.com/uploads/2021/02/19/rev1ex1.jpg)

- 链表

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
  // 链表反转的关键在于如何变换了还不丢失之后的节点
  // 使用更多的指针来进行临时保存
  let prev = null
  let curr = head
  let next = head
  while(curr) {
    // 变换之前先保存
    next = curr.next
    curr.next = prev
    prev = curr
    curr = next
  }
  return prev
};
```



## [215. Kth Largest Element in an Array](https://leetcode-cn.com/problems/kth-largest-element-in-an-array/)

利用选择排序

time: O(n^2)

space: O(1)

```js
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findKthLargest = function (nums, k) {
  // 利用选择排序

  // 定义有序区间 [0,i)
  // 因为i从0开始，所以开始的有序区间长度为0
  // 每次选择最大的元素交换到i这个位置
  for (let i = 0; i < nums.length; i++) {
    let maxValue = nums[i]
    let maxValueIndex = i
    for (let j = i + 1; j < nums.length; j++) {
      const currValue = nums[j]
      if (currValue > maxValue) {
        maxValue = currValue
        maxValueIndex = j
      }
    }
    swap(nums, i, maxValueIndex)
    if (i + 1 === k) {
      return maxValue
    }
  }

  return null


  function swap(nums, i, j) {
    const temp = nums[i]
    nums[i] = nums[j]
    nums[j] = temp
  }
};
console.log(findKthLargest([3, 2, 1, 5, 6, 4], 3))
```



如何更快的定外到需要的元素？

利用快排分区思想 + 二分处理

[快拍思想和细节](https://www.liwei.party/2017/05/06/algorithms-and-data-structures/quick-sort-1/)

```js
// 使用自己实现的partition操作
function quickSort(arr) {
  const len = arr.length
  if (len == 0 || len == 1) {
    // 没有排序的必要
    return arr
  }

  _quickSort(arr, 0, arr.length - 1)

  return arr

  // 对 arr [left, right] 区间的值进行排序
  function _quickSort(arr, left, right) {
    if (left > right) {
      return
    }
    const pivotIndex = partition(arr, left, right)
    _quickSort(arr, left, pivotIndex - 1)
    _quickSort(arr, pivotIndex + 1, right)
  }


  // 对 arr [left, right] 的区间进行partition
  // 最终的效果，以arr[left] 为pivot，使得区间内进行分块
  // 处理完成后，返回pivotIndex
  function partition(arr, left, right) {
    const pivot = arr[left]
    // 循环不变量
    // 严格小于 lt
    // [left+1, lt] 见的所有值都 < pivot
    // lt = left 所以开始这个区间没有值
    let lt = left
    for (let i = left + 1; i <= right; i++) {
      if (arr[i] < arr[lt]) {
        lt++
        swap(arr, i, lt)
      }
    }
    swap(arr, lt, left)
    return lt
  }

  function swap(arr, i, j) {
    const temp = arr[i]
    arr[i] = arr[j]
    arr[j] = temp
  }
}
```

在 `const pivotIndex = partition(arr, left, right)` 操作的时候进行二分查找

```js
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findKthLargest = function (nums, k) {
  let left = 0
  let right = nums.length - 1
  // if len = 6 k = 1 , 则 k = 5 🙆
  k = nums.length - k
  while (true) {
    const pivotIndex = partition(nums, left, right)
    if (pivotIndex === k) {
      return nums[pivotIndex]
      // 找的位置比需要的大
    } else if (pivotIndex > k) {
      right = pivotIndex - 1
      // 找到的位置比需要的小
    } else {
      left = pivotIndex + 1
    }
  }


  function partition(arr, left, right) {
    const pivot = arr[left]
    let lt = left
    for (let i = left + 1; i <= right; i++) {
      if (arr[i] < pivot) {
        lt++
        swap(arr, i, lt)
      }
    }
    swap(arr, lt, left)
    return lt
  }

  function swap(arr, i, j) {
    const temp = arr[i]
    arr[i] = arr[j]
    arr[j] = temp
  }
};
```

