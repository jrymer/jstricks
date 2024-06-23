## Sieve of Eratosthenes
https://en.wikipedia.org/wiki/Sieve_of_Eratosthenes

Finds all primes up to a given limit. 
Given `n = 10` where the number of `primes = 5`, the sieve works but marking **non primes** as `seen`, so that the next pass is quicker. We iterate over each `i = 2` (dont start at 0 or 1 because everything is divisible by 0 and 1) until `i = n` and iterate over a nested loop calculating the *multiples* of `i`.

For example:
At the very beginning of this algorithm we initialize a `seen` array of size `n`. Starting at `i = 2`, we first iterate using `i` and check 
`if (seen[i]) continue`, or, if we've already checked that number, just pass. If `i` has **not** been seen, it is a prime number and we `primes++`. This next step is where the magic happens, up until now we have not touched the `seen` array outside of just checking if our `i` has been seen. This is how we add to the `seen` array and can then safely guarentee that if something *is not* in the `seen` array that it is prime.

The next step is to Since we are still on `i = 2` the first, and smallest prime number, we iterate over a new loop *starting with `i * i`* and then instead of incrementing by 1, we *increment by i*. This works for a few reasons. A number multiplied by itself is inherently **not** prime so that is a good starting point for marking that number as `seen`. Additionally, by incrementing by `i` instead of 1, we are just finding *all the multiples of `i`*, and since they are multiples of `i` they are **not prime**.
```
    for (let multiple = i * i; multiple < n; multiple += i) {
        seen[multiple] = true
    }
```
In the above loop we would have:
```
n = 10
i = 2
seen = [false, false, false, false, false, false, false, false, false, false]
primes = 0
```

2 is prime so mark `prime++` then go into our multiple loop with `multiple = i * i` so `multiple` starts at 4, and again since its a multiple of 2 it is not prime so mark `seen[4] = true`. Increment by `i` to give us `multiple = 6` and again it is a multiple of 2 so mark `seen[6] = true`. Again increment to 8, `seen[8] = true`. The next `multiple` is 10 which is not less than `n` so now we increment `i`. Once we increment `i` our `seen = [false, false, false, true, false, true, false, true, false]` and `i = 3`. Using the multiples again we mark `seen[3] seen[6] seen[9]` as `true`. 3 is again prime so `prime++`. Now that we are onto 4, it has been seen so do nothing because we *already know 4 is a multiple of some other number*. Then continue this for the rest of `i`

