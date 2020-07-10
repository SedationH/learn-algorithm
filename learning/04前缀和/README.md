# 前缀和

前缀和是一种查询优化处理，可以简单的理解为数列的前n项目和



- 前缀和： 从 第 0 项 到 当前项 的 和
- 如果用一个数组 prefixSum 表示。prefixSum[x]：nums 的 第 0 到 第 x 项 的总和
  prefixSum[x] = nums[0] + nums[1] +…+nums[x]

- 所以，nums 某一项 = 两个相邻 前缀和 之差：
  nums[x] = prefixSum[x] - prefixSum[x - 1]

- 所以，nums 的 第 i 到 j 项 的总和：
  nums[i] +…+nums[j]=prefixSum[j] - prefixSum[i - 1]

- i 可以为 0，此时 i - 1 为 - 1，我们故意让 prefixSum[-1] 为 0，使得通式在边界情况也成立，此时：
  nums[0] +…+nums[j]=prefixSum[j]



## 例题

[560. Subarray Sum Equals K](https://leetcode-cn.com/problems/subarray-sum-equals-k/)

