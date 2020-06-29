# binarySearch 总结

注意体会边界情况

[参考](https://segmentfault.com/a/1190000016825704#item-2-1)

对于二分的灵活使用是建立在对内部流程熟悉的情况下的，所以在

- 标准二分
- 左边界
- 与x最接近的两个值

中，用dev debug去体会中间的流程



## 标准二分查找

```js
function binarySearch(arr, tar) {
  let left = 0, right = arr.length - 1
  while (left <= right) {
    let mid = Math.floor((left + right) / 2)
    if (arr[mid] < tar) {
      left = mid + 1
    } else if (arr[mid] > tar) {
      right = mid - 1
    } else {
      return mid
    }
  }
  return -1
}
```

值得注意的细节

即因为mid对于长度为偶数的区间总是偏左的，所以当区间长度小于等于2时，mid 总是和 left在同一侧。



## 左边界查找

```js
// 寻找arr中大于等于tar的一个元素
function searchFirst(arr, tar) {
  let left = 0, right = arr.length - 1
  while (left < right) {
    let mid = Math.floor((left + right) / 2)
    if (arr[mid] < tar) {
      left = mid + 1
    } else {
      right = mid
    }
  }
  return left
}

// 寻找arr中大于等于tar的最后一个元素
function searchLast(arr, tar) {
  let left = 0, right = arr.length - 1
  while (left < right) {
    let mid = Math.floor((left + right) / 2)
    if (arr[mid] > tar) {
      right = mid - 1
    } else {
      left = mid
    }
  }
  return right
}
```

因为是查找左边界，所以说即使等于tar也要接着找，搜索范围从右边开始，不断向左收缩,反映在代码上就是对left的操作没有等号，相对操作少一些，主要让right不断减小

右边届反之

循环结束条件都是left = right 



## 与x最相近的两个值

```js
// 寻找最接近的两个，if tie choose smaller
function search(arr, tar) {
  let left = 0, right = arr.length - 1
  while (left + 1 < right) {
    let mid = Math.floor((left + right) / 2)
    if (arr[mid] < tar) {
      left = mid
    } else {
      right = mid
    }
  }
  return [left, right]
}
```

循环结束条件是left和right挨着了