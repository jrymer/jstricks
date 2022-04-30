## em vs rem
- em looks at the `font-size` of the parent
  - always scale with parent `font-size`, so ems will be relative to size of parent's styling to some degree
  - things other than `font-size` like `margin` and `padding` are relative to the nearest `em`
     ```
      .container {
        font-size: 2.5em;
        margin: 1em: # is actually 2.5em
      }
     ```
- rem  (root em) looks at the `font-size` of the html element
