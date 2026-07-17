# Interview Notes: TanStack Router, React Query, MUI

---

## TanStack Router

### Q1 — `defaultPreload` and `defaultPreloadStaleTime`

**Config:**
```ts
createRouter({
  defaultPreload: "intent",
  defaultPreloadStaleTime: 0,
})
```

**What it does:**
- `defaultPreload: "intent"` — triggers data prefetching when a user hovers over or focuses a `<Link>`. Fires before the click, so navigation feels instant.
- `defaultPreloadStaleTime: 0` — preloaded data is immediately considered stale. Every hover triggers a fresh fetch.
- Setting it to `30_000` would cache the preloaded data for 30s — hover → fetch, hover again within 30s → use cache, no refetch.

**Watch out:** `defaultPreloadStaleTime: 0` can be chatty in production. A small value like `1000–5000ms` is usually a better default.

---

### Q2 — `QueryClient` at module scope vs inside a component

**The bug:**
```tsx
// WRONG — recreated on every render, wiping the cache
const RootLayout = () => {
  const queryClient = new QueryClient();
  ...
}
```

**The fix:**
```tsx
// Correct — created once when the module loads
const queryClient = new QueryClient();

const RootLayout = () => { ... }
```

**SSR caveat:** Module-level singletons are shared across all requests in a server-rendered app, leaking User A's cache into User B's response. In SSR, create a new `QueryClient` per request (factory function or inside the server handler).

---

### Q3 — Route loaders vs `useQuery` in components

**Failure mode of `useQuery` in a component for route-critical data:**
The component must mount and render before the fetch starts — a waterfall. With a loader, TanStack Router kicks off the fetch during the route transition, before the component tree renders.

**Rule of thumb:**
- Route-critical data → loader (`ensureQueryData`)
- Non-blocking, secondary, or user-triggered data → `useQuery` in component

---

### Q4 — Lazy routes and bundle splitting

**How to make a route lazy:** Create a sibling file with the `.lazy.tsx` suffix.

**What gets deferred:** The component and all its imports (e.g., Cesium, chart libraries). The non-lazy file keeps the loader, search param validation, `errorComponent`, and `pendingComponent`.

**Why it matters:** The generated `routeTree.gen.ts` statically imports every route file. Without lazy, all component code — including heavy dependencies — lands in the main bundle. With `.lazy.tsx`, the component chunk is only downloaded on first navigation to that route (or on preload).

---

### Q5 — `ensureQueryData` vs `prefetchQuery`

| | `ensureQueryData` | `prefetchQuery` |
|---|---|---|
| Returns | `Promise<TData>` | `Promise<void>` |
| Use in loader | Yes — when you need to block navigation on the data | Yes — when you want to warm the cache speculatively |
| Behavior | Fetches if stale/absent, returns data | Fetches if stale/absent, fire-and-forget |

**Pattern for fast + slow dependencies in one route:**
```ts
// In the loader:
await queryClient.ensureQueryData({        // blocks navigation — fast, critical
  queryKey: ['asset', assetId],
  queryFn: fetchAsset,
});
queryClient.prefetchQuery({                // non-blocking — slow, non-critical
  queryKey: ['history', assetId],
  queryFn: fetchHistory,
});
```
The component uses `useQuery` for history and handles the loading state itself.

---

### Q6 — `staleTime` vs `gcTime`

- **`staleTime`** — how long before data is considered stale and eligible for a background refetch. Default: `0` (immediately stale).
- **`gcTime`** (formerly `cacheTime`) — how long unused cache entries are kept in memory after all subscribers unmount. Default: `5 * 60 * 1000` (5 min).

**Bug: `gcTime: 0`**
Cache entries are destroyed the moment a component unmounts. Navigate to `/assets/asset-1`, go back, click it again → full refetch, even if `staleTime` says the data is still fresh. The cache is already gone.

**Key insight:** `staleTime` controls *when to refetch*. `gcTime` controls *when to forget entirely*. Both need to be non-zero for caching to work.

---

## React Query Bugs Encountered

### Bug checklist from the practice session

1. **`QueryClient` inside a component** — recreated every render, wipes cache. Move to module scope (or a singleton module for SSR safety).

2. **`prefetchQuery` for critical data** — use `ensureQueryData` when the loader needs to block navigation until data is ready. `prefetchQuery` returns `void`.

3. **Mismatched query keys** — loader populates `["asset", assetId]` but component asks for `["asset"]`. Cache miss, wasted prefetch. Keys must match exactly.

4. **Awaiting a non-critical prefetch** — `await queryClient.prefetchQuery(...)` for a slow, non-critical query blocks navigation unnecessarily. Drop the `await`.

5. **`gcTime: 0`** — silent cache destruction. Looks fine in dev (data is usually still warm), breaks navigation patterns in production.

6. **Missing `<Outlet />`** in a layout route — child routes match and URL changes but content never renders. Classic TanStack Router gotcha.

---

## MUI

### Q1 — Spreading a `Theme` into `createTheme`

**The bug:**
```ts
// WRONG — lightTheme is a resolved Theme object, not ThemeOptions
export const darkTheme = createTheme({
  ...lightTheme,
  palette: { mode: "dark", ... },
});
```

**Why it breaks:** `createTheme` returns a fully resolved `Theme` object with computed values, merged defaults, and internal functions. Spreading it back into `createTheme` feeds resolved output as input. Component overrides may be in the wrong internal shape, and auto-derived palette values (like `palette.text`, `palette.action`, `palette.divider`, computed from `mode: "dark"`) get polluted by the spread light values.

**Fix — Option 1: shared `ThemeOptions` object:**
```ts
const baseOptions: ThemeOptions = {
  typography: { ... },
  components: { ... },
};
export const lightTheme = createTheme({ ...baseOptions, palette: { mode: "light", ... } });
export const darkTheme  = createTheme({ ...baseOptions, palette: { mode: "dark",  ... } });
```

**Fix — Option 2: `createTheme`'s second argument (deep merge, MUI-aware):**
```ts
export const darkTheme = createTheme(lightTheme, {
  palette: { mode: "dark", primary: { main: "#60a5fa" } },
});
```

---

### Q2 — `sx` prop performance

**What happens at runtime:** Every render, MUI takes the `sx` object, runs it through a theme-aware transform (resolving shorthands like `p: 2` → `padding: 16px`), then passes the result to Emotion which serializes the styles, hashes them, and checks whether that class is already injected. Even for a static `sx={{ p: 2 }}`, the full pipeline runs each render.

**When it matters:** A virtualized list with 200 rows, each with 3–4 MUI components using `sx` → potentially 600+ Emotion pipeline calls per render cycle.

**Fix for hot paths:**
```tsx
// Instead of sx on every instance:
<Paper sx={{ p: 2, borderRadius: 2 }}>

// Extract to styled — Emotion processes it once at module load:
const CardPanel = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius * 2,
}));
```

---

### Q3 — Dark mode re-renders

**What re-renders on toggle:** The component owning the `useState` re-renders, causing the full subtree to re-render. Expected for a theme change — all MUI components need to pick up new colors.

**The compound problem:** Any component calling `useColorMode()` subscribes to `ColorModeContext`. With 50 components subscribed, that's 50 extra re-renders on every toggle.

**Fix — split stable and volatile context:**
```tsx
const ColorModeToggleContext = createContext(() => {});          // reference-stable, never re-renders consumers
const ColorModeValueContext  = createContext<"light"|"dark">("light"); // re-renders only consumers that need the value
```

---

### Q4 — `styleOverrides` vs `sx`

**`styleOverrides` in theme:**
- Processed once at theme creation, injected as CSS at startup
- Zero per-render cost
- Single source of truth — change one line to update every instance in the app
- Lower specificity than `sx` (intentional — `sx` can still override it for one-offs)

**`sx` on every instance:**
- Runs Emotion's style pipeline on every render
- Invisible to the next engineer — leads to drift on large teams
- Rebrand requires grepping the whole codebase

**Large team failure mode:** Engineers add `sx={{ textTransform: "none" }}` in 40 places independently. Design changes button radius → someone has to touch 40 files instead of 1 line in `theme.ts`.

**Principal-level pattern:** Each design variant is its own `styled()` component (`PrimaryButton`, `GhostButton`) that bakes in the right styles at definition time. Call sites stay clean, the design system is auditable in one place.

---

## Key Architectural Principles (Principal-Level)

- **Loaders block navigation intentionally** — use them for critical data, not convenience.
- **Query keys are your cache address** — if they don't match between loader and component, the prefetch was wasted.
- **`staleTime` ≠ `gcTime`** — one controls refetch frequency, one controls memory lifetime. You need both.
- **`sx` is for exceptions, `styleOverrides` is for rules** — a design system where every button has `sx` is not a design system.
- **Context splits prevent cascade re-renders** — separate stable callbacks from volatile values.
- **Theme options vs theme objects** — `ThemeOptions` is input, `Theme` is output. Don't use output as input.
