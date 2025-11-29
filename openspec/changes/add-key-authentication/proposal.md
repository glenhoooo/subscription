# Change: Add Key-Based Authentication

## Why

The application currently has no access control mechanism. To protect the subscription management features and ensure only authorized users can access the application, a simple key-based authentication system is needed. Users will authenticate by entering a key that matches a value stored in environment variables.

## What Changes

- Add "Get Started" button to the landing page hero section
- Create dedicated authentication page at `/auth` route with key input form
- Implement key validation by comparing user input against `AUTH_KEY` environment variable
- Store authentication state in browser localStorage after successful validation
- Create basic dashboard page at `/dashboard` route as the protected entry point
- Implement authentication check middleware to protect dashboard access
- Redirect authenticated users from `/auth` to `/dashboard`
- Display appropriate error messages for invalid keys

## Impact

- **Affected specs**:
  - `landing-page` (MODIFIED - add CTA button)
  - `authentication` (ADDED - new capability)
  - `dashboard` (ADDED - new capability)
- **Affected code**:
  - `app/page.tsx` - Add "Get Started" button with link to `/auth`
  - `app/auth/page.tsx` - New authentication page (client component)
  - `app/dashboard/page.tsx` - New protected dashboard page
  - `.env.local` - New `AUTH_KEY` environment variable
  - Component or utility for auth state management
- **User experience**: Users must authenticate before accessing subscription management features
- **Security**: Basic access control through environment-configured key
