# 回溯

回溯的核心在于选择与撤销选择

通用版子

```js
function backtarck(){
  // 进行判断
  for(...){
    // 选择
    
    // next backtrack
    
    // 撤销选择
  }
}
```



## 例题

[46. Permutations](https://leetcode-cn.com/problems/permutations/)

```js
var permute = function (nums) {
  const ans = []
  let track = []
  backtrack()
  return ans

  function backtrack() {
    if (track.length === nums.length) {
      ans.push(track.slice())
      return
    }
    for (let i = 0; i < nums.length; i++) {
      if (track.includes(nums[i])) continue
      // 选择
      track.push(nums[i])
      // 下一轮
      backtrack()
      // 撤销
      track.pop()
    }
  }
};
```



[39. Combination Sum](https://leetcode-cn.com/problems/combination-sum/)

```js
var combinationSum = function (candidates, target) {

  const sulutionSet = [], temSet = []
  let sum = 0
  backtrack(0)
  return sulutionSet

  function backtrack(start) {
    if (sum === target) {
      sulutionSet.push(temSet.slice())
    } else if (sum > target) {
      return
    }
    for (let i = start; i < candidates.length; i++) {
      // 进行选择
      temSet.push(candidates[i])
      sum += candidates[i]
      // next track
      backtrack(i)
      // 撤销选择
      temSet.pop(candidates[i])
      sum -= candidates[i]
    }
  }
};
```

