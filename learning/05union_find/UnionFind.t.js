/*
 * @Author: SedationH
 * @Date: 2020-07-25 10:13:43
 * @LastEditTime: 2020-07-25 10:32:10
 * @FilePath: /learn-algorithm/learning/05union_find/UnionFind.t.js
 */
class UnionFind {

  constructor(size) {
    this.parents = Array(size)
      .fill(0)
      .map((_, i) => i)
    this.sizes = Array(size).fill(1)
  }

  find(x) {
    if (x === this.parents[x]) return x
    parent[x] = this.find(parent[x])
  }

  /**
   * 获取所在集合的大小
   */
  getSize(x) {
    return this.sizes[
      this.find(x)
    ]
  }

  /**
   * 比对size的大小，把小的加入大的，相等就b加入a
   */
  union(a, b) {
    const fa = this.find(a), fb = this.find(b)
    if (fa !== fb) {
      if (this.sizes[fa] < this.sizes[fb]) {
        this.parents[fa] = fb
        // fb是root
        this.sizes[fb] += this.sizes[fa]
      } else {
        this.parents[fb] = fa
        // fa是root
        this.sizes[fa] += this.sizes[fb]
      }
    }
  }
}