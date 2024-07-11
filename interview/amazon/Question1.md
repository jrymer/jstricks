// Given a list of sorted movies from multiple providers based on rating, produce a list of movies that are sorted across all providers.



// sorted by rating
/*
      |        
In: [[0, 4, 5], [1, 3, 4], [2, 6]]

Out: [0, 1, 2, 3, 4, 4, 5, 6]

*/

/* Approach 3 
O(n) == log(n) where n is length of lists in array (3)
// internal index counter 
[[0, 4, 5], [1, 3, 4], [2, 6]]
     ^          ^          ^

count: 0
0,1,2

remainder [5,4]

6
*/ 



/* Approach 2 
const result = []
// O(n)
for (inner of items) {
    // inner: [1,3,4]
    result.push(...inner)
    //result: [0,4,5,1,3,4]
    
}

/*
count: 0
*/
// O(n)
result result.sort((a,b) => a-b)
O(2n) => O(n)
*/

// (2n^2) ==> (n^2)
function foo(items) {
  var i;
  let ratingObj = {}
  let result = []
  
  for (i = 0; i < items.length; i++) {
    for (j = 0; j < items[i].length; j++) {
        /*
           j:0 i: [1,3,4]
           rating: 1
           ratingObj: {0: 1, 1: 1, 3:1, 4: 2, 5: 1 }
           
        */
        // 
        const rating = items[i][j]
        if (ratingObj[rating]) {
            ratingObj[rating] = ratingObj[rating] + 1
        } else {
            ratingObj[rating] = 1
        }
    }
    }
    
    // ratingObj: {0: 1, 1: 1, 3:1, 4: 2, 5: 1 }
    let count = 0;
    let max = Math.max(Object.keys(ratingObj))
    
    while(count < max) {
        /*
        count: 0
        {0: 1}
        ratingObj[count] = 1
        */
        if (ratingObj[count]) {
            // add it to our result array.
        } else {
            continue
        }
    }
    
  }
}

// db partitions
// load balancer strategies
// ways to decrease RDB load

