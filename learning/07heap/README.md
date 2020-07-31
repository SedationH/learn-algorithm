# heap

感觉heap还是挺难理解的，当然简单的说这个数据结构很容易，但与之相关的操作让我看的有点晕



## precondition

二叉树是理解堆的前提

堆使用的就是完全二叉树的一些特点

> 完全二叉叉树的特点
>
> 1. 反映在树形结构上是与满二叉树序号一致
> 2. 反映在数组结构上是数组没有null的位置,刚好按顺序排满



如果让根节点的序号为0（我们通常用数组实现，保持【下标，序号】一致性）



![teakki](http://picbed.sedationh.cn/201654180627211.png)



如图 有关系如下

1. parent = floor((i-1)/2)
2. left = 2i+1
3. right = 2i+2



有max heap & min heap

区别在于parent与two childs 的关系

max heap:  parent > left && parent > right

所有的节点都严格遵循这一点



## 重要操作

**heapify** 从index开始检查并保持最大堆的性质,还可以加一个调控范围控制的参数

递归执行 自顶向下

使用**前提注意是左右子树是满足条件的堆结构**

参考样例 [5,0,6,1,1] 5、6交换后，无法检测到左子树的错误



**buildHeap**

利用heapify进行自底向上的构建，因为是从底层，所以heapify每次都可以完成目标



**sort**

利用前两个 先buildHeap，再每次挑出最大的放到最后，逐渐缩小heapify的范围



## 代码

```js
class Heap {
  constructor(initArray) {
    this.heap = [...initArray]

  }

  /**
   * 由上至下，从index开始，[index,end],end结束，包含end(下标)检查堆，保持最大堆的性质
   * 使用前提是index的左右均为最大堆
   */
  maxHeapify(index, end) {
    var
      iMax = index,
      iLeft = 2 * index + 1,
      iRight = 2 * index + 2
    
    if (iLeft <= end || iRight <= end) {
      if (this.heap[iMax] < this.heap[iLeft]) {
        iMax = iLeft
      }
      if (this.heap[iMax] < this.heap[iRight]) {
        iMax = iRight
      }
    }
    if (iMax !== index) {
      [this.heap[iMax], this.heap[index]] = [this.heap[index], this.heap[iMax]]
      // 查看调整后的位置时候需要接着调整
      this.maxHeapify(iMax, end)
    }
  }
  /**
   * 通过调用maxHeapify自下而上改造this.heap，建立最大堆
   * 因为是从最底层开始的，所以可以保证了在使用maxHeapify的时候，左右
   * 子树均为满足条件的堆结构
   */
  buildMaxHeap() {
    var
      heapSize = this.heap.length,
      // 找到最后一节点的parent，从这里开始
      iParent = Math.floor((heapSize - 2) / 2)

    for (let i = iParent; i >= 0; i--) {
      this.maxHeapify(i, heapSize - 1)
    }
  }

  showHeap() {
    for (let i = 0; i < this.heap.length; i++) {
      console.log(this.heap[i])
    }
    console.log('-----------')
  }

  /**
   * 依据buildMaxHeap & maxHeapify[可用是因为以一次buildMaxHeap使得所需结构建立]
   * 每次可以把最大的选出来，进行sort
   * 最终是从小到大的排序
   */
  sortByMaxHeap() {
    var heapSize = this.heap.length
    this.buildMaxHeap()

    for (let i = heapSize - 1; i > 0; i--) {
      [this.heap[0], this.heap[i]] = [this.heap[i], this.heap[0]]
      // 缩小范围，挑出最大的
      this.maxHeapify(0, i - 1)
    }
  }
}
```



好开心哈哈哈，开始写确实是不明白的，写着写着清楚了，感觉自己可以出个视频讲讲了



## 参考

[图文详解Heap Sort堆排序算法及JavaScript的代码实现 ](https://teakki.com/p/57df80fd970cec296dca5d23)

[视频](https://www.bilibili.com/video/BV1Eb41147dK)

