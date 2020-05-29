function ListNode(val) {
  this.val = val
  this.next = null
}

function showListNode(head) {
  while (head !== null) {
    console.log(head.val)
    head = head.next
  }
}

let head = new ListNode(1)
let second = new ListNode(2)
let third = new ListNode(3)
let fourth = new ListNode(4)
let fifth = new ListNode(5)

head.next = second
second.next = third
third.next = fourth
fourth.next = fifth
