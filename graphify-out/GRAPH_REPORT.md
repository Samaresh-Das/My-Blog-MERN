# Graph Report - BLOG TECH  (2026-05-07)

## Corpus Check
- 53 files · ~242,714 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 117 nodes · 66 edges · 52 communities (48 shown, 4 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 1 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `83256e02`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- [[_COMMUNITY_Project Overview & Tech Stack|Project Overview & Tech Stack]]
- [[_COMMUNITY_Server Core & Middleware|Server Core & Middleware]]
- [[_COMMUNITY_Client Posts & User UI|Client Posts & User UI]]
- [[_COMMUNITY_Auth Hook & App Root|Auth Hook & App Root]]
- [[_COMMUNITY_About Me Component|About Me Component]]
- [[_COMMUNITY_Upload Handler|Upload Handler]]

## God Nodes (most connected - your core abstractions)
1. `MERN Stack` - 7 edges
2. `shortingDesc()` - 4 edges
3. `Express App` - 4 edges
4. `useAuth()` - 3 edges
5. `Posts Routes` - 3 edges
6. `App()` - 2 edges
7. `HttpError` - 2 edges
8. `React` - 2 edges
9. `CRUD posts` - 2 edges
10. `Users Routes` - 2 edges

## Surprising Connections (you probably didn't know these)
- `App()` --calls--> `useAuth()`  [INFERRED]
  client/src/App.jsx → client/src/components/hooks/auth-hook.js
- `Express App` --mounts--> `Posts Routes`  [EXTRACTED]
  server/app.js → server/routes/posts-routes.js
- `Express App` --mounts--> `Users Routes`  [EXTRACTED]
  server/app.js → server/routes/user-routes.js
- `Posts Routes` --calls--> `Posts Controller`  [EXTRACTED]
  server/routes/posts-routes.js → server/controllers/posts.js
- `Posts Routes` --requires_auth--> `Auth Middleware`  [EXTRACTED]
  server/routes/posts-routes.js → server/middleware/check-auth.js

## Communities (52 total, 4 thin omitted)

### Community 0 - "Project Overview & Tech Stack"
Cohesion: 0.2
Nodes (10): Authentication and Authorization, CRUD posts, Express.js, MERN Stack, MongoDB, Node.js, React, TinyMCE Rich Text Editor (+2 more)

### Community 1 - "Server Core & Middleware"
Cohesion: 0.25
Nodes (8): Express App, Mongoose Connection, Posts Controller, Users Controller, Global Rate Limiter, Auth Middleware, Posts Routes, Users Routes

## Knowledge Gaps
- **13 isolated node(s):** `Vite`, `MongoDB`, `Express.js`, `Node.js`, `TinyMCE Rich Text Editor` (+8 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **4 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What connects `Vite`, `MongoDB`, `Express.js` to the rest of the system?**
  _13 weakly-connected nodes found - possible documentation gaps or missing edges._