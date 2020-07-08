/*
 * @Author: SedationH
 * @Date: 2020-07-08 21:10:32
 * @LastEditTime: 2020-07-08 21:10:32
 * @FilePath: /learn-algorithm/leetcode/kit/ListNode.js
 */
function ListNode(val) {
  this.val = val;
  this.next = null;
}
function Array2ListNode(arr) {
  let head = new ListNode(arr[0]), p = head
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