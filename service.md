# Service
Debugging with `print()`
```bin/compose logs -t -f compose_1```

### String templates
```
for n in names:
   print(f'name: {n}')
```
A relatively new feature of the python language called `f-strings`

### [:]
I think it's basically like `existing_nodes = []` will create a new list and have existing_nodes point at it while leaving the old array in memory, and `existing_nodes[:] = []` will actually replace each item as needed in the old array.
