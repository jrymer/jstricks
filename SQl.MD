- `Inner join`: keep only records from left and right table where the join condition is true.

- `Left join`: all records from left table are kept, and join to relevant records from right table where the join condition is true. Lack of join results in Null values in selected right table columns.

`Right join` : Left join reversed. 😉

`Outer join`: returns all rows when there is a match in either the left or right table. If there is no match, the result will include NULL for the missing side of the table. Essentially, it combines the results of both LEFT JOIN and RIGHT JOIN.
