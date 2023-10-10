### Big O

## Log N

When the number of elements in the problem space get halved each time, that will likely be `O(log N)`

Examples of `log N`: Balanced (sorted) binary search tree

Example: Binary Search Tree
We look for element `x` in an `N`-element **sorted** array.
Compare `x` to the midpoint of the array, if `x == mid point` we are successful, if `x < mid point` we search left half of the array, and if `x > mid point` we search the right half of the array. Staring out our array is length `N`, if we continue, we then have `N/2` length array, and if we still dont find it and continue search we have `N/4` length.

## N^2

Looping over the **same array** twice.

```
function (array) {
   array.forEach(i => {
      array.forEach(j => {
         // O(1) work
      })
   })
}
```

This is `N^2` because we have array length `N` looping over itself twice, so `N*N = N^2`

**NOTE**: If we have **two distinct arrays** it will be different.
Take the following

```
function (ar1, ar2) {
   ar1.forEach(i => {
      ar2.forEach(j => {
         // O(1) work
      })
   })
}
```

Since we have two separate arrays, we have the length of `ar1` (`a`) times `ar2` (`b`) which is `a*b` yielding `O(ab)`
