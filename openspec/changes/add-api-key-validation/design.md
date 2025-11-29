# Design: API Key Validation

## Context

The application has a two-layer architecture:
1. **Frontend layer**: Next.js pages with localStorage-based authentication using `NEXT_PUBLIC_AUTH_KEY`
2. **API layer**: Next.js API routes that currently have no authentication

The frontend authentication prevents unauthorized users from accessing the dashboard UI, but the underlying APIs are completely unprotected. This creates a privilege escalation vulnerability where anyone can bypass the UI and directly call the APIs.

## Goals / Non-Goals

**Goals:**
- Close the privilege escalation vulnerability by requiring authentication on all API endpoints
- Maintain consistency with existing frontend authentication mechanism
- Provide clear, actionable error messages when authentication fails
- Minimize code duplication with a reusable authentication utility

**Non-Goals:**
- Implementing role-based access control (RBAC) or fine-grained permissions
- Supporting multiple API keys or key rotation mechanisms
- Migrating to JWT or OAuth (can be addressed in future changes)
- Adding rate limiting or other advanced security features

## Decisions

### Decision 1: Reuse NEXT_PUBLIC_AUTH_KEY

**What**: Use the existing `NEXT_PUBLIC_AUTH_KEY` environment variable for API authentication instead of creating a separate server-side `API_KEY`.

**Why**:
- **Simplicity**: Single source of truth for authentication across frontend and backend
- **User experience**: Users only need to configure one key
- **Consistency**: Same key used for dashboard access and API access

**Trade-offs**:
- Less secure since `NEXT_PUBLIC_*` variables are exposed to the browser, but acceptable for this use case since the key is already shared with frontend users
- Cannot have different keys for UI access vs API access
- If we later need separate keys, we can introduce `API_KEY` in a future change

**Alternatives considered**:
- **Separate API_KEY variable**: More secure isolation but adds configuration complexity and doesn't provide significant security benefit in this single-user/small-team context
- **JWT tokens**: Over-engineered for current needs; can migrate later if needed

### Decision 2: Use X-API-Key Header

**What**: Require clients to send the API key in an `X-API-Key` HTTP header.

**Why**:
- Standard convention for API key authentication
- Clear and explicit (different from `Authorization: Bearer` which implies token-based auth)
- Easy to implement and test

**Alternatives considered**:
- **Authorization: Bearer**: More standard for token-based auth, but misleading since we're using a static key, not a dynamically issued token
- **Query parameter**: Less secure (logged in server logs, browser history) and not RESTful

### Decision 3: Protect All Endpoints

**What**: Apply authentication to all `/api/*` routes including:
- `/api/subscriptions` (GET, POST)
- `/api/subscriptions/[id]` (PUT, DELETE)
- `/api/exchange-rates` (GET)

**Why**:
- **Principle of least privilege**: Default-deny approach is more secure
- **Data privacy**: Exchange rates might be combined with subscription data; better to protect everything
- **Consistency**: Simpler mental model - all APIs require auth

**Alternatives considered**:
- **Public exchange-rates endpoint**: Could leave exchange rates public since they're not user-specific, but protecting them is safer
- **Read-only public access**: Could allow GET without auth, but this still leaks subscription data

### Decision 4: Utility Function vs Middleware

**What**: Create a reusable utility function `lib/api-auth.ts` that can be called at the start of each route handler, rather than Next.js middleware.

**Why**:
- **Explicit and visible**: Each route handler clearly shows it requires authentication
- **Flexibility**: Easy to skip auth for specific endpoints if needed in the future
- **Simplicity**: No need to configure middleware patterns or file-based routing rules
- **TypeScript-friendly**: Return typed response objects that route handlers can immediately return

**Implementation**:
```typescript
// lib/api-auth.ts
export function validateApiKey(request: NextRequest): NextResponse | null {
  const apiKey = request.headers.get('X-API-Key');
  const expectedKey = process.env.NEXT_PUBLIC_AUTH_KEY;

  if (!apiKey || apiKey !== expectedKey) {
    return NextResponse.json(
      { success: false, data: null, error: 'Unauthorized' },
      { status: 401 }
    );
  }

  return null; // null means auth passed
}
```

**Usage in routes**:
```typescript
export async function GET(request: NextRequest) {
  const authError = validateApiKey(request);
  if (authError) return authError;

  // ... proceed with handler logic
}
```

**Alternatives considered**:
- **Next.js middleware.ts**: More automatic but less explicit; harder to debug and configure for route-specific rules
- **Higher-order function wrapper**: More functional but adds complexity for minimal benefit
- **Decorator pattern**: TypeScript decorators are experimental and would add complexity

## Risks / Trade-offs

### Risk 1: Breaking existing API consumers
- **Mitigation**: This is a new application with no external consumers; frontend calls will be updated in the same change

### Risk 2: Key exposed in browser (NEXT_PUBLIC_*)
- **Mitigation**: Acceptable for current use case since frontend users are already trusted with the key; can migrate to server-only key later if needed
- **Future improvement**: Add separate `API_KEY` for server-to-server calls if needed

### Risk 3: Forgetting to add auth to new endpoints
- **Mitigation**: Document the pattern clearly; consider adding a linting rule or test in the future

## Migration Plan

1. Create `lib/api-auth.ts` utility function
2. Update each API route handler to call `validateApiKey()` at the start
3. Update frontend API client code to include `X-API-Key` header:
   - Read key from `localStorage.getItem('authKey')`
   - Include in all `fetch()` calls to `/api/*` endpoints
4. Test each endpoint manually or with automated tests

**Rollback**: Remove the `validateApiKey()` calls from route handlers and remove header from frontend calls.

**Backwards compatibility**: None - this is a breaking change, but acceptable since there are no external API consumers.

## Open Questions

None - all design decisions have been clarified with user input.
