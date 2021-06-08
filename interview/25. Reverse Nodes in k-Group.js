/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
var reverseKGroup = function (head, k) {
  // 1 -> 2 -> 3 -> 4 -> 5; k = 2
  let nextOldHead = head
  let cnt = 0
  while (nextOldHead && cnt !== k) {
    // cnt = 0, nextOldHead -> 1
    // cnt = 1, nextOldHead -> 2
    // cnt = 3, nextOldHead -> 3 定位到下一个的头部
    nextOldHead = nextOldHead.next
    cnt++
  }
  if (cnt === k) {
    const oldHead = head
    const newHead = reverseKGroup(nextOldHead)

    // k = 2 会执行两次
    while (k) {
      k--
    }
  }
  return head
}
