### Binary tree

- Binary tree has **at most** two children (hence the bi)
- Single root node
- Exactly one path between root node and any other node

**Root**: No parent
**Leaf**: No children
**Stack**: Seqential data structure where you can only add or remove from the top

// a
// / \
// b c
// / \ \
// d e f

## Depth first traversal

Time: O(n): We only visit each node once
Space: O(n): The biggest our `stack` can be is `n`

Must go deeper into the tree before we move laterally.
a,b,d,e,c,f

We will have 3 objects.

1. `stack`: Order to look at nodes
2. `current`: Current node we are viewing
3. `values`: Nodes we have already viewed

4. `stack`: [a]
5. `current`: null
6. `values`: []
   We use the `stack` to determine the order in which we look at the nodes. So we start with our root `a` and put it on the stack. We then take `a` off the stack and move it to `current` and ask if we have any children. Once we determine if we have children, we can then move those children onto the `stack` with the `right` child coming first, and the `left` child coming second. So looking at `a` we put `c` and then `b` on the stack so `b` is at the top.

7. `stack`: [b,c]
8. `current`: a
9. `values`: []

We have determined `a` has children, so we move it to `values` and begin looking at the top of our `stack` `b`.

1. `stack`: [c]
2. `current`: b
3. `values`: [a]

We see `b` has two children as well, `d` and `e`. Again moving `right` first then `left` we put those children on the stack.

1. `stack`: [d,e,c]
2. `current`: b
3. `values`: [a]

Since we saw `b` has chilren, we move it to `values` and pick a new node from the top of the stack.

1. `stack`: [e,c]
2. `current`: d
3. `values`: [a,b]

`d` has no children so we pop the `stack`

1. `stack`: [c]
2. `current`: e
3. `values`: [a,b,d]

We repeat the above until we end with `values` being a depth first traversal of `[a,b,d,e,c,f]`
