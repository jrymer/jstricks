The for loop will usually take O(n) time complexity with n is the length of the string.

## Two Pointers

One usage is while searching for pairs in an array. You're tasked with figuring out the pair of elements where `arr[i] + arr[j]` add up to a certain number `target`. The brute force solution is to compare each element with every other number, but that's a time complexity of `O(n^2)`. If one point begins at the beginning of the array (`i`), and the other begins at the end (`j`), we can check if that `sum` matches the `target`, if the `sum` is greater than the `target`, we can `j--`, and if the `sum` is less than the `target` we can `i++`. This way in some cases we don't actually test every element in the array against each other. This yields a time complexity of `O(n)`

1. Two pointers, each starting from the beginning and the end until they both meet.
2. One pointer moving at a slow pace, while the other pointer moves at twice the speed.

## Sliding Window

Sliding Window is an extension of the two pointer approach where we use two pointers (left and right) to create a “window”. The problem will ask us to return the maximum or minimum subrange that satisfies a given condition. Thus the “window” in between our left and right pointers will be that subrange we are looking for. The sliding window involves expanding and contracting our “window” to find the optimal range.

```
def sliding_window(nums):
    # Iterate over elements in our input
        # Expand the window
        # Meet the condition to stop expansion
            # Process the current window
            # Contract the window
```

#### MAX CONSECUTIVE ONES II

Given a binary array, find the maximum number of consecutive 1s in this array if you can flip at most one 0.

**Input**: [1,0,1,1,0]

**Output**: 4

This description is confusing, but we can rephrase it as “Find the largest window that has **at most** one 0 in it”. So what is the condition that prompts us to stop expanding our window? If we have seen more than one 0.
