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

## [3. Longest Substring Without Repeating Characters](https://leetcode-cn.com/problems/longest-substring-without-repeating-characters/)

经典滑动窗口

注意明晰在维护什么状态

```js
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
  const len = s.length
  let ans = 0
  const memo = {}
  let l = 0
  let r = -1
  // 在[l, r]区间进行答案搜寻，开始区间长度为0，满足ans的对应关系
  while (r < len - 1) {
    // 进行扩展
    r++
    const currChar = s[r]
    memo[currChar] = memo[currChar] ? memo[currChar] + 1 : 1
    // 可行性维持 让新加入的满足要求
    while (memo[currChar] !== 1) {
      const deleteChar = s[l]
      memo[deleteChar]--
      l++
    }
    // 执行到此处[l, r] 一定没有重复char
    ans = Math.max(ans, r - l + 1)
  }
  return ans
};
```



## [146. LRU Cache](https://leetcode-cn.com/problems/lru-cache/)

Design a data structure that follows the constraints of a Least Recently Used (LRU) cache.

Implement the LRUCache class:

- LRUCache(int capacity) Initialize the LRU cache with positive size capacity.
- int get(int key) Return the value of the key if the key exists, otherwise return -1.
- void put(int key, int value) Update the value of the key if the key exists. Otherwise, add the key-value pair to the cache. If the number of keys exceeds the capacity from this operation, evict the least recently used key.

Follow up:
Could you do get and put in O(1) time complexity?



### 背景解释

LRU (Least Recently Used)

这是一个Policy 策略

考虑如下情况：

限制大小为4

1. if

cache =  4、3、1、2

add 5

cache = 5、4、3、1

2. if

cache = 3、4、2、1

get 2

cache = 2、3、4、1

简而言之，在这样的策略下，最经常使用的会放到整个cache的前面



what is cache?

典型的用空间换取时间

提前准备可能会用到的时间，或者计算过程中产生过的数据，下次查询的时候减少已经经历的重复计算

good vedios https://www.youtube.com/watch?v=S6IfqDXWa10



所以LRU Cache就是使用LRU作为eviction policy的cache



### 数据结构和逻辑分析

现在考虑数据结构

Get time:O(1): HashTable

Remove: O(1): Linked List (Double)





考虑操作逻辑

```js
function get(key) {
  const node = memo.get(key)
  if(node) {
    提前
  } else {
    return -1
  }
}

function put(key, val) {
  const node = memo.get(key)
  if(node) {
    变化值、提前
  } else {
    if(当前存储大小 == 限制大小) {
      删除最后一个、添加、提前
    }else{
      添加、提前
    }
  }
}
```

提前 等价于 删除原有的、在头部添加

问题得以转化为

实现下面两个基础函数

```js
// 添加直接添加到头部
function add(Node) {
  
}
  
// 移出指定的节点
function remove(Node) {
  
}
```

### 整体实现

```js
function Node(key, val) {
  this.key = key
  this.val = val
  this.next = null
  this.prev = null
}

/**
 * @param {number} capacity
 */
var LRUCache = function (capacity) {
  this.capacity = capacity

  // 初始化double list 存储结构
  this.dummyHeadNode = new Node(null, null)
  this.dummyTailNode = new Node(null, null)
  this.dummyHeadNode.next = this.dummyTailNode
  this.dummyTailNode.prev = this.dummyHeadNode

  // 初始化Map<number, Node>
  this.cacheMemo = new Map()
};

/** 
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function (key) {
  const node = this.cacheMemo.get(key)
  let result = -1
  if (node) {
    // 提前
    this.remove(node)
    this.add(node)
    result = node.val
  }
  return result
};

/** 
 * @param {number} key 
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function (key, value) {
  // 复用还是删除看具体情况吧，这里感觉差异不大
  // 出于简化考虑，直接删除
  const oldNode = this.cacheMemo.get(key)
  const newNode = new Node(key, value)
  if (oldNode) {
    this.remove(oldNode)
    this.add(newNode)
    this.cacheMemo.set(key, newNode)
  } else {
    const currSize = this.cacheMemo.size
    if (currSize === this.capacity) {
      const lastNode = this.dummyTailNode.prev
      this.cacheMemo.delete(lastNode.key)
      this.remove(lastNode)
    }
    this.add(newNode)
    this.cacheMemo.set(key, newNode)
  }
};

LRUCache.prototype.add = function (node) {
  const dummyHeadNodeNext = this.dummyHeadNode.next

  // 处理node和dummyHeadNode
  this.dummyHeadNode.next = node
  node.prev = this.dummyHeadNode

  // 处理node和dummyHeadNodeNext
  node.next = dummyHeadNodeNext
  dummyHeadNodeNext.prev = node
}

LRUCache.prototype.remove = function (node) {
  node.prev.next = node.next
  node.next.prev = node.prev
}
```



put中容易犯错误

明晰两个数据结构之间的关系可以降低错误发生的可能



memo 是为了 查找双向链表上的具体元素而存在的

因此memo的更新要和对双向链表的修改同步



我感觉这个操作绑定到add 和 remove中更合理



下面进行修改

```js
function Node(key, val) {
  this.key = key
  this.val = val
  this.next = null
  this.prev = null
}

/**
 * @param {number} capacity
 */
var LRUCache = function (capacity) {
  this.capacity = capacity

  // 初始化double list 存储结构
  this.dummyHeadNode = new Node(null, null)
  this.dummyTailNode = new Node(null, null)
  this.dummyHeadNode.next = this.dummyTailNode
  this.dummyTailNode.prev = this.dummyHeadNode

  // 初始化Map<number, Node>
  this.cacheMemo = new Map()
};

/** 
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function (key) {
  const node = this.cacheMemo.get(key)
  let result = -1
  if (node) {
    // 提前
    this.remove(node)
    this.add(node)
    result = node.val
  }
  return result
};

/** 
 * @param {number} key 
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function (key, value) {
  // 复用还是删除看具体情况吧，这里感觉差异不大
  // 出于简化考虑，直接删除
  const oldNode = this.cacheMemo.get(key)
  const newNode = new Node(key, value)
  if (oldNode) {
    this.remove(oldNode)
    this.add(newNode)
  } else {
    const currSize = this.cacheMemo.size
    if (currSize === this.capacity) {
      const lastNode = this.dummyTailNode.prev
      this.remove(lastNode)
    }
    this.add(newNode)
  }
};

LRUCache.prototype.add = function (node) {
  const dummyHeadNodeNext = this.dummyHeadNode.next

  // 处理node和dummyHeadNode
  this.dummyHeadNode.next = node
  node.prev = this.dummyHeadNode

  // 处理node和dummyHeadNodeNext
  node.next = dummyHeadNodeNext
  dummyHeadNodeNext.prev = node

  this.cacheMemo.set(node.key, node)
}

LRUCache.prototype.remove = function (node) {
  node.prev.next = node.next
  node.next.prev = node.prev

  this.cacheMemo.delete(node.key)
}
```





![image-20210601164411461](http://picbed.sedationh.cn/image-20210601164411461.png)



## [912. Sort an Array](https://leetcode-cn.com/problems/sort-an-array/)

Given an array of integers nums, sort the array in ascending order.

 

Example 1:

> Input: nums = [5,2,3,1]
> Output: [1,2,3,5]

Example 2:

>  Input: nums = [5,1,1,2,0,0]
> Output: [0,0,1,1,2,5]



### 题目分析

自己实现快速排序

快排的大致思想

按照一定标准每次在待排序区间中选择一个元素 pivot

以pivot作为partition的标准去分隔区间

目前实现的标准是使用区间left对应的值作为pivot



比如 2, 0, 1, 3, 5

以 2 作为pivot

形成

1, 0, 2, 3, 5

(这里为啥1 在 0 前面？和具体的swap 和 partition过程有关系，不过核心是 1 小于2 ，所以在放在2的右边任意位置即可)

ok 经过这样的过程，2就被放到了对应的位置 pationtion返回相应的pivotIndex = 2

再根据这个结果再进行quickSort(left, pivotIndex - 1)  quickSort(pivotIndex + 1, right)



### 具体实现

下面说两种方法，第一种很好理解，但内存消耗太大了

第二个是正常的在一个数组上进行操作

```js
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortArray = function (nums) {
  return quickSort(nums)

  function quickSort(nums) {
    if (nums.length === 1 || nums.length === 0) {
      return nums
    }
    const pivot = nums[0]
    const subNums = nums.slice(1)
    const leftNums = subNums.filter(num => num < pivot)
    const rightNums = subNums.filter(num => num >= pivot)

    return [
      ...quickSort(leftNums),
      pivot,
      ...quickSort(rightNums)
    ]
  }
};
```



```js
/**
* @param {number[]} nums
* @return {number[]}
*/
var sortArray = function (nums) {
  quickSort(nums, 0, nums.length - 1)
  return nums

  // sort nums [left, right] 区间中的所有值
  function quickSort(nums, left, right) {
    if (left >= right) {
      return
    }

    const pivotIndex = partition(nums, left, right)
    quickSort(nums, left, pivotIndex - 1)
    quickSort(nums, pivotIndex + 1, right)
  }

  // 对nums [left, right]区间中的值进行partition
  function partition(nums, left, right) {
    const pivot = nums[left]
    // less than 严格小于 要求 [left+1, lt] 之间的值都小于pivot
    // lt 初始等于left 所以开始区间大小为0 
    let lt = left
    for (let i = left + 1; i <= right; i++) {
      if (nums[i] < pivot) {
        lt++
        swap(nums, lt, i)
      }
    }
    swap(nums, left, lt)
    return lt
  }

  function swap(nums, i, j) {
    const temp = nums[i]
    nums[i] = nums[j]
    nums[j] = temp
  }
};
```



### 想法

快排的核心思想是分治，这也是在许多算法中很重要的设计点。