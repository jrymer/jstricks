# API Design Interview Prep — Answers

## API Design & Architecture

**1. REST vs GraphQL vs RPC-style (tRPC/gRPC)**

REST fits resource-oriented domains with broad, external, or public consumers — it's cacheable by default (HTTP semantics), well understood, and easy for third parties to integrate against. GraphQL fits when clients have genuinely varied data needs (a mobile app and a dashboard wanting different slices of the same graph) and you control both ends closely enough to manage its complexity (N+1 query risk, caching is harder, requires a resolver layer). tRPC/gRPC fit internal, same-org, type-shared systems (a TypeScript monorepo, or polyglot internal services) where you want compile-time contract safety and don't need broad external consumability.

Regret scenarios a year in: REST — you've accumulated a dozen slightly-different endpoints because different clients needed different shapes ("BFF sprawl"). GraphQL — a single bad query is silently doing 200 downstream calls (N+1) and nobody set up query complexity limits early. tRPC — a non-TypeScript client (mobile native, a partner integration) needs to consume the API and there's no OpenAPI-style contract to hand them.

**2. What makes an API well-designed (consumer's perspective)**

Predictable, consistent naming and structure across endpoints (so learning one endpoint teaches you the shape of the rest); errors that are structured and actionable, not just an HTTP status and a string; good, accurate documentation that doesn't drift from the actual behavior; sensible defaults so simple cases don't require reading docs; and stability — not changing response shapes without a version bump. A common pain example: an API where the same concept has different casing or nesting depth in different endpoints (`created_at` in one, `createdAt` nested under `metadata` in another) — every integration ends up special-cased instead of reusable.

**3. Versioning and deprecation without breaking clients**

Version explicitly — via URL (`/v2/orders`), header, or content-negotiation — rather than mutating a live endpoint's shape. Additive changes (new optional fields) don't need a version bump if clients are built to ignore unknown fields; breaking changes (removing/renaming a field, changing a type) do. For deprecation: announce with a timeline, add a `Deprecation`/`Sunset` HTTP header so tooling can detect it automatically, keep the old version alive and monitored for actual traffic (not assumed-zero), and only remove it once telemetry shows real usage has dropped, not just when the timeline says so.

```ts
// Signal deprecation in the response itself, not just docs
res.setHeader('Deprecation', 'true');
res.setHeader('Sunset', 'Wed, 01 Oct 2026 00:00:00 GMT');
res.setHeader('Link', '</v2/orders>; rel="successor-version"');
```

**4. Pagination at scale: offset vs cursor**

Offset (`?page=40&limit=50`) is simple and lets you jump to an arbitrary page, but breaks down at scale in two ways: performance (the database still has to scan/skip all prior rows, which gets slow deep into a large table) and correctness (if rows are inserted/deleted between page requests, offset pagination can skip or duplicate rows for the client). Cursor-based pagination (`?after=<opaque_cursor>&limit=50`) uses a stable pointer — typically an indexed column like `id` or `created_at` plus tiebreaker — so each page is a fast indexed lookup and insertions elsewhere don't shift results. The real tradeoff: cursor pagination gives up "jump to page 40" random access in exchange for stability and performance, which is almost always the right trade for large, actively-written datasets (feeds, logs, telemetry).

```ts
// Cursor-based: stable, indexed, no drift under concurrent writes
GET /assets?after=eyJpZCI6ImFfNDU2In0&limit=50

// Server decodes the cursor, queries WHERE id > :cursorId ORDER BY id LIMIT 50
```

**5. Consistent error responses**

Define one error envelope shape used everywhere — a machine-readable `code` (stable, not the human message), a `message` for developers/logs, and optionally `details` for field-level validation errors — plus the right HTTP status class (4xx client error, 5xx server error) so generic retry/handling logic can key off status alone when it needs to.

```ts
{
  "error": {
    "code": "VALIDATION_FAILED",
    "message": "One or more fields are invalid",
    "details": [{ "field": "email", "issue": "must be a valid email address" }]
  }
}
```

This lets frontend code branch on `error.code` (stable, won't change with copy edits) rather than string-matching `error.message`, which breaks the moment someone rewords a message for clarity.

---

## Contracts & Frontend Integration

**6. Where validation should live**

Both — but for different reasons, and one must be the source of truth. Frontend validation is for UX: instant feedback before a round trip. API validation is the actual security/data-integrity boundary and must never be skipped, because the frontend can always be bypassed (curl, a modified client, a bug). To keep them from drifting: define the schema once (e.g., a Zod schema in a shared package in a monorepo, or generated from an OpenAPI spec) and have both frontend and backend import/derive from that single source rather than hand-writing two parallel rule sets.

```ts
// shared/schemas/asset.ts — single source of truth
export const createAssetSchema = z.object({
  name: z.string().min(1).max(120),
  status: z.enum(['online', 'offline', 'degraded']),
});

// Frontend: instant UX feedback
createAssetSchema.safeParse(formValues);

// API: the actual enforcement boundary
app.post('/assets', (req, res) => {
  const parsed = createAssetSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error });
  // ...
});
```

**7. Backend-for-Frontend (BFF)**

A BFF is a thin API layer owned by (or tailored to) a specific frontend, sitting between that client and the underlying services — it aggregates multiple backend calls into the shape a specific UI actually needs, and can own concerns like session handling or response shaping that don't belong in shared backend services. It pays for its complexity when you have multiple, meaningfully different frontends (web, mobile, partner API) hitting the same backend services with different data-shape needs, or when calling services directly from the client would mean multiple round trips / over-fetching. It's not worth it for a single frontend talking to a small, already-cohesive API — that's just an extra hop with no real benefit.

**8. Designing response shape to avoid over/under-fetching without GraphQL**

Support sparse fieldsets and includes via query params, so the client asks for what it needs rather than the server guessing: `?fields=id,name,status` to trim response, `?include=owner,history` to expand related data the client would otherwise need a second round trip for. This gets you most of GraphQL's flexibility for the common cases without the operational overhead of a full graph layer.

```
GET /assets/a_456?fields=id,name,status&include=owner
```

**9. API team ships a breaking change, frontend finds out via production error**

This is a process failure, not just a technical one — the fix is upstream of the incident. In the moment: roll back or hotfix the frontend to tolerate the new shape, communicate impact clearly, don't assign blame in the incident channel. Afterward: the real fix is a contract — versioned APIs with a required deprecation window, contract tests (e.g., consumer-driven contract testing, or shared TypeScript types generated from the API schema) that fail CI on the API side *before* a breaking change ships, and a shared changelog/notification process so frontend teams aren't discovering changes via Sentry.

---

## Reliability, Auth & Performance

**10. Authentication vs authorization**

Authentication answers "who are you" (verifying identity — login, tokens, sessions). Authorization answers "what are you allowed to do" (permissions, roles, resource-level access checks) — and it happens *after* authentication succeeds. In practice, authentication breaks down around token expiry/refresh (a client silently sending an expired token and getting confusing 401s instead of a clean re-auth flow), while authorization breaks down around staleness (a user's role changes but their existing session/token still carries old permissions until it's refreshed or revoked) and around resource-level checks being forgotten (checking "is this user logged in" but not "does this user own *this specific* asset").

**11. Idempotent retries for a non-idempotent operation**

Have the client generate a unique idempotency key (e.g., a UUID) per logical operation and send it as a header; the server stores a record of keys it's already processed and, on a retry with the same key, returns the original result instead of creating a second order. This decouples "network retry safety" from "the operation is inherently non-idempotent" — the server enforces idempotency at the request layer regardless of what the operation does underneath.

```ts
// Client generates once, reuses on retry
const idempotencyKey = crypto.randomUUID();
await fetch('/orders', {
  method: 'POST',
  headers: { 'Idempotency-Key': idempotencyKey },
  body: JSON.stringify(orderPayload),
});

// Server: check before executing
const existing = await db.idempotencyKeys.findOne({ key: idempotencyKey });
if (existing) return res.json(existing.response); // don't re-create
```

**12. API-layer caching vs frontend caching**

API/HTTP-layer caching (ETags, `Cache-Control`, CDN edge caching) reduces load and latency for *any* client, including ones you don't control, and works at the transport level — a `304 Not Modified` avoids re-sending a payload entirely. Frontend caching (TanStack Query, etc.) is about avoiding redundant requests within a single client's session and enabling instant UI from cached state, plus features like background refetching and optimistic updates that only make sense client-side. They complement each other — TanStack Query decides *whether* to make a request at all, HTTP caching makes that request cheap *if* it does happen — but they can conflict if TTLs disagree (e.g., the CDN serves a stale response for longer than the client thinks is fresh), so cache lifetimes should be reasoned about together, not independently.

**13. Rate limiting without breaking legitimate power users**

Tier limits by authenticated identity (API key/user), not just IP, so shared IPs (corporate NAT) don't get punished and so power users can be given explicit higher limits. Use a sliding-window or token-bucket algorithm rather than a hard fixed-window reset (which causes bursty "thundering herd right at the minute boundary" behavior). Return `429` with a `Retry-After` header and current-limit headers (`X-RateLimit-Remaining`) so well-behaved clients can self-throttle instead of hammering the API. For genuine power users, offer a documented path to higher limits (paid tier, request-based increase) rather than a silent wall.

---

## Real-time / Streaming

**14. WebSockets vs Server-Sent Events vs polling**

Polling is simplest and fine when "real-time" really just means "reasonably fresh" (every 10-30s) — no persistent connection overhead, works through any proxy/infra without special handling. SSE gives true server-to-client push over a plain HTTP connection (auto-reconnect built into the browser API) but is one-directional — fine for live feeds/notifications where the client doesn't need to send data back over the same channel. WebSockets give full bidirectional, low-latency communication, but cost more operationally (stateful connections, harder to load-balance/scale horizontally, need your own reconnect/heartbeat logic) — worth it when the client genuinely needs to send frequent messages back (chat, collaborative editing, live control commands), not just receive updates.

**15. Combining paginated REST + real-time updates without local drift**

Treat the real-time channel as a stream of *events* (created/updated/deleted with an id and version/timestamp), not a full re-fetch trigger, and reconcile them into the already-paginated local cache: apply an update in place if the item is already loaded, ignore it if it's outside the currently-loaded pages (or track it in a "new items available" banner instead of silently reshuffling the list), and always include a version/updated-at field on each item so the client can detect and discard out-of-order events. The key discipline: the REST pagination establishes the initial, authoritative page state; the real-time channel only patches items already in that state, it never becomes a second source of truth for "what page is what."
