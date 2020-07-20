# 并查集

[不错的学习资料](https://coderscat.com/using-disjoint-set-union-find-to-create-maze)

并查集解决的主要问题是图的连通性问题，有趣的是，通过使用一种简单的线性数据结构（数组），构建出了一种树形结构。

这种树形结构，每个节点指向他们的父节点（注意，过去我们的树形结构都是父节点指向子节点），根节点指向自己，作为整个树的代表。



## 实现

实现的方式很简单，要完成三件事情

1. 初始化集合，每个节点把自己作为根节点
2. Find，查询某个节点的根节点
3. Union，能够合并集合



```js
class UnionFind {
  constructor(size) {
    this.parent = Array(size)
      .fill(0)
      .map((_, i) => i)
  }
  find(x) {
    while (x !== this.parent[x]) {
      x = this.parent[x]
    }
    return x
  }
  /**
   * 把b加入a的集合中
   */
  union(a, b) {
    const fa = this.find(a), fb = this.find(b)
    if (fa !== fb) {
      this.parent[fb] = fa
    }
  }
}
```



## 优化

### #1 路径压缩

![](https://coderscat.com/wp-content/uploads/2020/01/2020_01_16_disjoint-set-or-union-find-to-create-maze.org_20200119_122911.png)

如果使用迭代(while)的方法，只能减少一半

```js
function find(x){
  while(x !== parent[x]){
    // 隔代压缩
    parent[x] = parent[parent[x]]
  }
}
```

![image-20200720144222199](http://picbed.sedationh.cn/image-20200720144222199.png)

递归方案下，可以都指向根节点

```js
function find(x){
  if(x === parent[x]) return x
  parent[x] = find(parent(x))
}
```

对于递归的理解，就是边界是root，即每个find的返回值全是root，那么就成功让所有节点直接指向root



### #2 Rank

懒得用了，**就这吧😎**

