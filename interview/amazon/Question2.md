//Amazon Studios receives video files from various television and movie productions happening across the globe. 
//Each production (movie/show) sends video files that are at varying frame rates (positive integers). 
//In order to send these to Prime Video Team so that customers across the world can view them, 
//we only need the largest subset such that every pair of elements in the subset (i, j) satisfies either i % j = 0 or j % i = 0. 
//This is to ensure that customers get a uniform experience in the client players across various consumer devices.


//For example, if given input is [3, 5, 10, 20, 21], you should return [5, 10, 20]. 
//Given [1, 3, 6, 24], return [1, 3, 6, 24].

[3, 5, 10, 20, 21], 30- < > 
// [5, 10, 20, 30]

// [1,3,5,7,11] < 
// [1,3] [1,5] [1,7] [1,11]


// [3, 5, 10, 20, 21] //
// [3,6,24]
/*
[1, 3, 6, 24]
[1,3,6,24]
i: 0, 1
j: 1, 3

[[1,3,6,24], [3,6,24], [6,24]]
[1,3,6,24]

[14, 6, 21, 1, 5, 7]
     6  21
     
     6,1

[1,7,14,21]
[[14,1,7],[6,1],[],[14,21,1,7]]

[1,3,5,6,7,14,21,24]
{
    1
    3: 6, 21, 24
    5
    6: 3, 24
    7: 14
    21: 3
    24: 3, 6
}

*/
function (items) {
    if (!items) return []
    
    /*
        {}
        3
        
    */
    const result = []
    const sorted = items.sort()
    for(let i = 0; i < sorted.length; i++) {
        let tempSubAr = []
        for(let j = i + 1; j < sorted.length; j++) {
            if (items[i] % items[j] === 0) {
                // 3,5
                // result: []
                // result: [[],[1,3], [1,5]
                1,3,5
            }
    }
}

