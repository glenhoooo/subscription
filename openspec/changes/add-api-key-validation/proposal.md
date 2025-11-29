# Change: Add API Key Validation to Protect Backend Endpoints

## Why

The application currently has a critical security vulnerability: while frontend authentication exists using `NEXT_PUBLIC_AUTH_KEY`, the backend API endpoints (`/api/subscriptions`, `/api/exchange-rates`) have no authentication or authorization checks. Anyone who knows the API URLs can directly access, create, modify, or delete subscription data without any credentials. This is a privilege escalation vulnerability that must be fixed.

## What Changes

- Create a reusable API authentication utility function that validates the `X-API-Key` header against `NEXT_PUBLIC_AUTH_KEY`
- Add authentication checks to all API route handlers before processing requests
- Return `401 Unauthorized` responses with appropriate error messages when authentication fails
- Ensure consistent error response format across all protected endpoints
- Update frontend API calls to include the `X-API-Key` header from localStorage

**BREAKING**: All API endpoints now require a valid `X-API-Key` header matching the configured authentication key.

## Impact

- **Affected specs**:
  - `api-authentication` (ADDED - new capability for API key validation)
  - `subscriptions-api` (ADDED - documents protected subscription endpoints)
  - `exchange-rates-api` (ADDED - documents protected exchange rate endpoint)
- **Affected code**:
  - `lib/api-auth.ts` - New authentication utility (to be created)
  - `app/api/subscriptions/route.ts` - Add auth check to GET/POST handlers
  - `app/api/subscriptions/[id]/route.ts` - Add auth check to PUT/DELETE handlers
  - `app/api/exchange-rates/route.ts` - Add auth check to GET handler
  - Frontend API calls (wherever `fetch` is used to call these endpoints)
- **Security**: Closes privilege escalation vulnerability by requiring authentication for all API operations
- **Breaking change**: Existing API consumers (if any) must include `X-API-Key` header
