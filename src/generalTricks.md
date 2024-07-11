Fill an array from N
`Array.from(Array(N))`
Fill an array from N with initial values
`Array.from(Array(N)).fill(false)`

Sort a number array
`const ar = [2,3,5,1,3].sort((a,b) => a - b).reverse()`
# You have to do the `a - b` bit or else numbers like `10` would end up like the following:
    `const ar = [2,3,5,1,3,10].sort()`  = `[1,10,2,3,3,5]`

Remove from array at index
`array.splice(index, 1);`
- changes the contents of an array by removing or replacing existing elements *in place*