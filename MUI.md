
# MUI
### Default theme
[Docs](https://material-ui.com/styles/basics/#material-ui-core-styles-vs-material-ui-styles)
The gist of why we don’t use `@material-ui/styles` is it doesn’t get MUI’s default theme, it’s only meant to be use as a standalone styling option for use without MUI. `@material-ui/core/styles` on the other hand is a re-exported version of the same code but with the MUI default theme. `ThemeProvider` should also be imported from `@material-ui/core/styles` for the same reasons.

### Overridding styles
To access an inner component (`TextField` is a wrapper over `InputBase`). Use the `InputProps` property
```
InputProps: {{
	classes: {
		input: classes.override
	}
}}
```

#### Icon size override
Set the font size to change the size
```
imageIcon: {
    height: 200,
    fontSize: 200,
  },
<BrokenImageIcon classes={{ root: classes.imageIcon }} />
```

### Hover
```
const useStyles = makeStyles(() => ({
  container:{
    '&:hover': {
      // hover stuff
    },
    ```
