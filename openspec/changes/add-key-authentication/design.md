# Design: Key-Based Authentication

## Context

The subscription management application needs a simple authentication mechanism to control access. A key-based approach is chosen for simplicity, where administrators configure a single shared key in environment variables that authorized users must know to gain access.

## Goals / Non-Goals

**Goals:**
- Provide basic access control to protect subscription management features
- Simple authentication flow: landing page → auth page → dashboard
- Persist authentication state across browser sessions
- Clear user feedback for successful/failed authentication attempts

**Non-Goals:**
- Multi-user authentication with individual accounts
- Password hashing or advanced cryptography (simple comparison)
- Role-based access control
- OAuth or third-party authentication providers
- Password reset or account recovery flows

## Decisions

### Authentication Flow

1. **Unauthenticated user visits landing page** → sees "Get Started" button
2. **Clicks button** → navigates to `/auth` page
3. **Enters key** → client-side comparison with environment variable
4. **If valid** → store auth flag in localStorage, redirect to `/dashboard`
5. **If invalid** → show error message, allow retry

### State Management

- **Client-side storage**: Use `localStorage.setItem('isAuthenticated', 'true')` after successful auth
- **Auth check**: Read `localStorage.getItem('isAuthenticated')` to determine auth status
- **Protected routes**: Check auth state on dashboard page, redirect to `/auth` if not authenticated
- **Logout**: Clear localStorage item (can be added later if needed)

### Environment Configuration

- **Variable name**: `AUTH_KEY`
- **Location**: `.env.local` file (git-ignored)
- **Access**: Exposed to client via `NEXT_PUBLIC_AUTH_KEY` prefix
- **Security note**: This is basic access control, not production-grade security. The key will be visible in client-side JavaScript bundles.

### Component Architecture

```
app/
├── page.tsx (landing) - Add Link button to /auth
├── auth/
│   └── page.tsx (client component) - Form for key input, validation logic
└── dashboard/
    └── page.tsx (client component) - Protected page with auth check
```

### Error Handling

- Invalid key: Display error message "Invalid authentication key. Please try again."
- Empty input: Display error message "Please enter an authentication key."
- Already authenticated: Redirect from `/auth` to `/dashboard` automatically

## Risks / Trade-offs

### Risk: Client-Side Key Exposure
- **Mitigation**: Document that this is basic access control, not secure authentication
- **Alternative considered**: Server-side validation via API route
  - **Rationale for decision**: Keeping it simple for MVP; can upgrade to server-side later if needed

### Risk: localStorage Persistence Issues
- **Mitigation**: Provide clear feedback if auth state is lost; users can simply re-authenticate
- **Alternative considered**: Cookies with httpOnly flag
  - **Rationale for decision**: localStorage is simpler for client-only auth check

### Trade-off: Single Shared Key vs Multi-User
- **Decision**: Single shared key for simplicity
- **Future upgrade path**: Can migrate to database-backed user accounts later

## Migration Plan

N/A - This is a new feature with no existing data to migrate.

### Rollout Steps
1. Add environment variable configuration to documentation
2. Deploy landing page with button
3. Deploy authentication page
4. Deploy dashboard page
5. Test full authentication flow

### Rollback
Remove button from landing page and delete `/auth` and `/dashboard` routes if issues arise.

## Open Questions

None - design is straightforward and well-scoped.
