https://www.youtube.com/watch?v=tjOO6yPAiyQ

# DB Optimization strategies

## Database Partition:
Subset of a table in a *single database instance*

### Horizontal:
Partition of table rows.
Involves dividing a table based on rows, often using a range or a condition. It is useful when dealing with tables containing a large number of rows, and data can be logically grouped based on certain criteria. This can improve query performance by minimizing the amount of data that needs to be scanned for specific queries and allows for easier data management.
Take rows 0-50 and split them into a diff table, then 50-100 into a diff.

### Vertical:
Partition of table columns
Involves dividing a table based on columns. It is useful when you have tables with many columns, and not all columns are frequently accessed together. This can improve query performance by reducing I/O and allowing for more efficient indexing of relevant columns.

## Database Shard:
Subset of a table in a *distributed database*

### Geo Location:
Keep data in server geographically close to user's locations. This can be US, EU, ETC or smaller regions like East US or West US.
 - Con: May not be even distribution of users per geographical area

### Range Based:
Divides data based on ranges of key value. Using the english alphabet, you should shar based off the first later of a name, giving 26 unique shards.
    - Con: Uneven splits across keys, aka lots of A's and probably not a lot of X's

### Hash Based:
Uses hashing algorithm to generate a hash based on the key value and then uses the hash value to create the partition. Creates a more even spread than Range Based
 - Con: It is likely to assign related rows to different partitions so it is difficult to predict and pre load queries.

### Manual:
- Huge development complexity
- Can lead to uneven distribution

### Automatic:
- Dynamically repartitions the data when it detects an uneven distribution
- Not many servers offer this

# Load Balancing Strategies

## DNS Failover
If one of your resources becomes unavailable, traffic is seamlessly redirected to a healthy resource, offering straightforward yet effective redundancy.

## Round robin and round robin with failover
It evenly distributes traffic among redundant internet connections or web servers. When combined with Failover, it provides an extra advantage: if one resource fails or becomes unhealthy, the remaining healthy resource(s) will handle queries.

## Weighted round robin
It lets you distribute varying traffic loads across your network, allowing you to prioritize resources based on capacity or responsiveness. Weighted Round Robin is also handy for A/B testing, timed rollouts, or targeted user deliveries.

## Latency routing (ITO)
It employs health checks to determine the most suitable resources for managing your web traffic.

## Regional/Multi-location load balancing
This feature enables the creation of customized routing rules according to end-user locations, effectively allowing you to construct your own region-specific content delivery network (CDN).
