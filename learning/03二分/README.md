# 二分

二分学来学习，折腾边界，尝试记忆细节，如今发现大可不必



From [二分分析](https://www.liwei.party/2019/06/17/leetcode-solution-new/search-insert-position/)

感谢作者的分享



## 分析

二分从逻辑上来看，就是一种**减治策略**

- 我们需要找到能够进行减治的条件判定
- 根据最大熵原理 -> 二分log降低规模是最合理的





## 细节处理

1. [left,mid] [mid+1,right]   
   1. right = mid
   2. left = mid+1
   3. floor 让区间偏向left 让即使right = mid 也能逐渐缩小区间 -> 防止死循环
2. [left,mid-1] [mid,right]
   1. right = mid -1
   2. left = mid
   3. ceil 让区间偏向right 让即使left = mid 也能缩小区间  -> 防止死循环



先找到容易缩小区间的判断条件 再 else 一半另一个区间就好了