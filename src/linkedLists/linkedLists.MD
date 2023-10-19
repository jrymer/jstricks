The last node points to `null`
Or consider a list `a,b,c,d` it would be "linked" as follows `a > b > c > d > null`
Write logic around the `current` node, dont have conditionals of like `current.next.val` just check `current.val`. Checking `current.next` too much assumes you know the length of the list.

**Head**: First node in list
**Tail**: Last node in list

A linked list is an inherently ordered data structure. Every node has a position.

## How a linked list compares to an array

**array**: `[a,b,c,d]`: The indices refer to the position of the elements

- Must be stored contiguously in memory. All of the elements in the array are stored next to each other in memory.
- To insert `q` at position 2, not overwrite, we need to leverage the space at the back of the array after `d`. Push `d` and `c` to the right one spot, so `c` is now at position 3, and `d` is not at position 4, and we can then insert `q` into the empty spot in index 2. This is relatively costly and slow operation for such a simple operation. `O(n)` insertion time, we need to at worst case adjust `n` (length of the array) elements to make room for the new one.

**linked list**: `a > b > c > d`

- Nodes are not contiguous in memory
- To insert `q` at position 2, not overwrite, we just need to adjust `b`'s pointer to point at node `q` then adjust `q`'s pointer to point at node `c`. `O(1)` insertion time, we only ever need to adjust the two node's pointers, a constant number of adjustments.
