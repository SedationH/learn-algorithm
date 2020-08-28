# 回溯

回溯算法就是在树形图上的深度优先遍历

具体来说回溯：指回到上一个节点(树的角度)/回到上一次选择 -> 回溯

回溯是现象，本质是DFS

通过track对每个选择的信息进行保存



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



## Tip

track因为是引用传递，具体修改的是地址，调用栈无法为我们进行管理（仔细体会值传递和引用传递  又或者说是 Primitives & Object的区别）

但当我们所需要的状态是string (Primitive stirng)进行维护的，那么我们便不用自己维护了

e.g. [22. Generate Parentheses](https://leetcode-cn.com/problems/generate-parentheses/)

