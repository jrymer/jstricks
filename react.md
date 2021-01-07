
# React
### Lifecycle notes
* `React.userEffect()` is called after every render
* `React.useMemo()` will not re evaluate during a render cycle if its dependencies have not changed
### Memoization
#### React.PureComponent
Only available to classes. Implements the componentShouldUdpdate() lifecycle method to compare shallow props and state comparison from the previous render. If these match, the component will not re-render.
#### React.memo()
### children
```
interface Props {
	children: React.ReactNode;
}
const MyComponent: React.FC<Props> = ({children}) => {} 
```
The above code will throw an eslint error that `children is missing in prop validation`.
To fix this, although redundant, double type the props as follow:
```
const MyComponent: React.FC<Props> = ({children}: Props) => {} 
```
### Selectors
#### createSelector
Protects componets from re rendering. Checks to see if anything changed, if nothing in the selector has changed, then do not re render. `createSelector` is a way of cahcing the result of the derived/calculated values based on state so that you don't pay the tax for re-caculating/re-allocating memory every render. If the values of the input-selectors are the same as the previous call to the selector, it will return the previously computed value instead of calling the transform function.
#### useSelector
A selector is a function that returns portions of state or some derived value based on state values.
`useSelector()` is simply a hook that takes one of those functions and returns the results hooked up to your redux state.
The selector will be run whenever the function component renders (unless its reference hasn't changed since a previous render of the component so that a cached result can be returned by the hook without re-running the selector).

### Context API
#### defaultValue
```
const CountStateContext = React.createContext()
function CountDisplay() {
  const {count} = React.useContext(CountStateContext)
  return <div>{count}</div>
}
```
Because we don't have a default value for our `CountStateContext`, we'll get an error on the highlighted line where we're destructing the return value of `useContext`. This is because our default value is `undefined` and you cannot destructure `undefined`.

* All consumers that are descendants of a Provider will re-render whenever the Provider’s value prop changes.
