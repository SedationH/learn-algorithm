/*
 * @Author: SedationH
 * @Date: 2020-07-08 21:10:32
 * @LastEditTime: 2020-07-13 16:00:27
 * @FilePath: /learn-algorithm/leetcode/kit/ListNode.js
 */
function ListNode(val) {
  this.val = val
  this.next = null
}
function Array2ListNode(arr) {
  let head = new ListNode(arr[0]),
    p = head
  for (let i = 1; i < arr.length; i++) {
    p.next = new ListNode(arr[i])
    p = p.next
  }

  return head
}
function ShowListNode(head) {
  while (head !== null) {
    console.log(head.val)
    head = head.next
  }
}

export function CompleteBinaryTree(arr) {
  /**
   * 传入数组中的元素应该按照2n+1 2n+2 n为index的格式填入
   * 2n+1 left
   * 2n+2 right
   */
  let root = null
  for (let i = 0; i < arr.length; i++) {
    let tem = new ListNode(arr[i])
    tem.left = new ListNode(arr[2 * i + 1])
    tem.right = new ListNode(arr[2 * i + 2])
    if (i === 0) root = tem
  }
  return root

  function ListNode(val) {
    if (val === undefined) {
      val = null
    }
    this.val = val
    this.left = this.right = null
  }
}

function BinaryTree(arr) {
  /**
   * 传入数组中的元素应该按照2n+1 2n+2 n为index的格式填入
   * 2n+1 left
   * 2n+2 right
   */
  // for (let i = 0; i < arr.length; i++) {
  //   if (arr[i] === null) continue
  //   let tem = new ListNode(arr[i])
  //   if (i === 0) {
  //     var root = tem
  //   }
  //   tem.left = new ListNode(arr[2 * i + 1])
  //   tem.right = new ListNode(arr[2 * i + 2])
  // }
  // return root

  /**
   * 但发现lc的传入数组并不满足完全二叉树的映射规则，具体实现问了问问大佬
   * 采用队列的方式
   */
  if (!arr.length) return null
  const root = new ListNode(arr[0])
  const queue = [root]
  let i = 1
  // 每次拿出队列首位，后面的两个元素（能够放入的queue）就是它的左右子元素
  // 每次创建成功子元素，都加入队列中
  while (i < arr.length) {
    const top = queue.shift()
    if (i < arr.length) {
      if (arr[i] !== null) {
        top.left = new ListNode(arr[i])
        queue.push(top.left)
      }
      i++
    }
    if (i < arr.length) {
      if (arr[i] !== null) {
        top.right = new ListNode(arr[i])
        queue.push(top.right)
      }
      i++
    }
  }
  return root

  function ListNode(val) {
    if (val === undefined) {
      val = null
    }
    this.val = val
    this.left = this.right = null
  }
}
