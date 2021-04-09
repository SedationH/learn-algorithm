export class Solution {
  /**
   * SquareArray
   *
   * @param A: The array A.
   * @return: The array of the squares.
   */
  SquareArray(nums) {
    {
      let l = 0
      let r = nums.length - 1
      const ans = []
      let i = nums.length - 1
      while (l <= r) {
        const squaredLNum = nums[l] * nums[l]
        const squaredRNum = nums[r] * nums[r]
        if (squaredLNum > squaredRNum) {
          ans[i] = squaredLNum
          l++
        } else {
          ans[i] = squaredRNum
          r--
        }
        i--
      }
      return ans
    }
  }
}
