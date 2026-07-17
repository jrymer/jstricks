# React

### Lifecycle notes

- `React.useEffect()` after browser paint
- `React.useLayoutEffect()` before browser paint
- `React.useMemo()` will not re evaluate during a render cycle if its dependencies have not changed
- `useTransition` lets you render a part of the UI in the background. State updates marked as Transitions will be non-blocking and will not display unwanted loading indicators. The function passed to startTransition is called an “Action”. By convention, any callback called inside startTransition (such as a callback prop) should be named action or include the “Action” suffix:

```
onClick={() => {
  startTransition(async () => {
    await submitAction();
  });
}}
```

- `useDeferredValue`lets you defer updating a part of the UI.
- `difference between useTransition and useDeferredValue` Use `useTransition` when you have direct access to the state updater function and want to keep the UI responsive. Use `useDeferredValue` when you don't control the state update (e.g., the value comes from a parent component as a prop or a third-party library).

**`useTransition` — you own the state update:**
```tsx
function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isPending, startTransition] = useTransition();

  const handleChange = (e) => {
    // Urgent: update the input immediately
    setQuery(e.target.value);

    // Non-urgent: defer the expensive results update
    startTransition(() => {
      setResults(expensiveSearch(e.target.value));
    });
  };

  return (
    <>
      <input value={query} onChange={handleChange} />
      {isPending ? <Spinner /> : <ResultsList results={results} />}
    </>
  );
}
```

**`useDeferredValue` — the value comes from outside (prop or library):**
```tsx
// Parent owns the state — you can't wrap its setter in startTransition
function SearchResults({ query }: { query: string }) {
  const deferredQuery = useDeferredValue(query);

  // true while deferredQuery is still the OLD value and React is re-rendering
  // ExpensiveList in the background with the new one.
  // Once the background render commits, deferredQuery catches up to query
  // and isStale flips back to false — no explicit loading state needed.
  const isStale = query !== deferredQuery;

  // There is NO spinner here. The old list stays visible but dimmed while
  // React works on the new render in the background (low priority, interruptible).
  // If the user types again before it finishes, React throws away the
  // in-progress render and starts over with the latest value.
  // Wrap ExpensiveList in <Suspense> if you want a fallback during the transition.
  return (
    <div style={{ opacity: isStale ? 0.5 : 1 }}>
      <ExpensiveList query={deferredQuery} />
    </div>
  );
}

function App() {
  const [query, setQuery] = useState('');
  return (
    <>
      <input value={query} onChange={e => setQuery(e.target.value)} />
      <SearchResults query={query} />
    </>
  );
}
```
**`useTransition` + Suspense — keep showing old content while async data loads:**
```tsx
// Without useTransition: clicking a tab immediately unmounts the current tab
// and shows the Suspense fallback (<Spinner />) while the new tab's data loads.
// With useTransition: React keeps the current tab visible until the new one
// is fully ready, then swaps atomically. isPending lets you show a subtle indicator.
function TabContainer() {
  const [tab, setTab] = useState<'home' | 'profile'>('home');
  const [isPending, startTransition] = useTransition();

  return (
    <>
      <nav style={{ opacity: isPending ? 0.6 : 1 }}>
        {/* isPending dims the nav so the user knows something is happening,
            but the current tab content stays visible — no jarring spinner */}
        <button onClick={() => startTransition(() => setTab('home'))}>Home</button>
        <button onClick={() => startTransition(() => setTab('profile'))}>Profile</button>
      </nav>

      {/* Suspense fallback only shows on the very first load of a tab,
          or if React cannot keep the old content (e.g., the tab unmounts).
          During a transition, React suppresses this fallback and shows
          the previous content until the new render is ready. */}
      <Suspense fallback={<Spinner />}>
        {tab === 'home' ? <HomeTab /> : <ProfileTab />}
      </Suspense>
    </>
  );
}
```

**`useDeferredValue` + Suspense — show old results until new ones are ready:**
```tsx
function SearchResults({ query }: { query: string }) {
  const deferredQuery = useDeferredValue(query);
  const isStale = query !== deferredQuery;

  return (
    // Suspense provides the fallback for the very first render (no previous
    // results to show yet). On subsequent searches, React keeps showing the
    // previous <ExpensiveList> result (dimmed) instead of the fallback while
    // deferredQuery catches up — same "suppress fallback during transition" behaviour.
    <Suspense fallback={<Spinner />}>
      <div style={{ opacity: isStale ? 0.5 : 1 }}>
        {/* ExpensiveList suspends while fetching — React uses deferredQuery
            so it re-fetches with the old value first, buying time.
            The moment deferredQuery updates, a new suspended render starts
            in the background. Old content stays until it resolves. */}
        <ExpensiveList query={deferredQuery} />
      </div>
    </Suspense>
  );
}
```

- `use` lets you read the value of a Promise or context. Despite its name, use is not a Hook. Unlike Hooks, it can be called inside loops and conditional statements like if. If the component that calls use is wrapped in a Suspense boundary, the fallback will be displayed while the Promise is pending.

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

- All consumers that are descendants of a Provider will re-render whenever the Provider’s value prop changes.

### Imports

There is a difference with certain libraries who bundle in a modern way. So `import DatePicker from 'something/DatePicker'` only includes `something/DatePicker.tsx` into your bundle, vs `import {DatePicker} from 'something'` which imports all of something. This depends a bit on your build pipeline of `something` .Tree shaking is essentially the thing that turns: `import {DatePicker} from 'something'` into just “shaking away” the code that isnt a part of DatePicker

### Stale Closure

Sometimes dependencies may not be updating as you expect them to when using hooks due to misuse of either the dependency array or not leveraging the `setState()` callback
https://dmitripavlutin.com/react-hooks-stale-closures/
