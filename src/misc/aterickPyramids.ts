// We can render an ASCII art pyramid with N levels by printing N rows of asterisks, where the top row has a single asterisk in the center and each successive row has two additional asterisks on either side.

// Here's what that looks like when N is equal to 3.

//   *  
//  *** 
// *****
// And here's what it looks like when N is equal to 5.

//     *    
//    ***   
//   ***** 
//  ******* 
// ********* 
// Can you write a program that generates this pyramid with a N value of 10?

function generatePyraminds(n: number): void {
    const ar = []
    
    for (let i = n; i > 0; i--) {
        let str = ''
        const spaces = n - i;
        
        str = (' ').repeat(spaces) + '*'.repeat((i*2)-1) + (' ').repeat(spaces)
        ar.push(str)
    }
    
    ar.reverse()
    
    ar.forEach((v) => {
        console.log(v)
    })
}

generatePyraminds(5)