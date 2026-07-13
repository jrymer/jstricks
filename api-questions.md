# API Design Interview Prep — Questions

Answers are in `api-answers.md`. Try to answer each out loud or in writing before checking.

## API Design & Architecture
1. How do you decide between REST, GraphQL, and RPC-style (tRPC/gRPC) for a new API, and what would make you regret each choice a year in?
2. What makes an API "well-designed" from a consumer's perspective? Walk through a real API you found painful to integrate with and what specifically made it painful.
3. How do you version an API without breaking existing clients — and how do you eventually deprecate a version without breaking them either?
4. What's your approach to pagination for a resource with millions of rows? Compare offset-based vs cursor-based and explain when offset genuinely breaks.
5. How do you design consistent error responses across an API so frontend code can handle failures generically instead of parsing error strings?

## Contracts & Frontend Integration
6. Where should validation live when the same rules exist in both frontend and API — and how do you keep them from drifting apart?
7. What's a Backend-for-Frontend (BFF), and when does introducing one actually pay for its complexity versus just calling services directly from the client?
8. How would you design an API response shape to avoid frontend over-fetching or under-fetching, without going all the way to GraphQL?
9. How do you handle a situation where the API team ships a breaking change and your frontend team finds out from a production error?

## Reliability, Auth & Performance
10. Explain the difference between authentication and authorization in an API context, and where each typically breaks down in practice (expired tokens, stale permissions, etc.).
11. How do you design an API to support idempotent retries for a non-idempotent operation like "create an order"?
12. What's the role of caching at the API layer (ETags, Cache-Control, CDN) versus caching in the frontend (React Query/TanStack Query), and how do the two interact — or conflict?
13. How would you design rate limiting so it protects the backend without silently breaking a legitimate power user's workflow?

## Real-time / Streaming
14. When do you reach for WebSockets vs Server-Sent Events vs polling for "live" data, and what's the actual tradeoff (not just "websockets are more real-time")?
15. How would you design an API to support both a paginated REST list endpoint and real-time updates to that same data, without the client's local state drifting out of sync?
