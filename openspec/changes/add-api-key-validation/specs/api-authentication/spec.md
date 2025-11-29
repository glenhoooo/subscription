## ADDED Requirements

### Requirement: API Key Validation

The system SHALL validate API requests by requiring a valid API key in the `X-API-Key` HTTP header that matches the configured authentication key stored in `NEXT_PUBLIC_AUTH_KEY` environment variable.

#### Scenario: Valid API key provided

- **WHEN** a request includes `X-API-Key` header with the correct key
- **THEN** the request SHALL proceed to the handler logic

#### Scenario: Missing API key header

- **WHEN** a request is made without an `X-API-Key` header
- **THEN** the system SHALL return HTTP 401 Unauthorized
- **AND** the response body SHALL include `{ success: false, data: null, error: "Unauthorized" }`

#### Scenario: Invalid API key provided

- **WHEN** a request includes `X-API-Key` header with an incorrect key
- **THEN** the system SHALL return HTTP 401 Unauthorized
- **AND** the response body SHALL include `{ success: false, data: null, error: "Unauthorized" }`

### Requirement: Reusable Authentication Utility

The system SHALL provide a reusable authentication utility function that can be called by any API route handler to validate the request.

#### Scenario: Utility function integrated in route handler

- **WHEN** an API route handler calls the authentication utility function
- **THEN** the function SHALL return `null` if authentication succeeds
- **OR** the function SHALL return a NextResponse with 401 status if authentication fails

### Requirement: Consistent Error Format

All authentication failures SHALL return a consistent JSON error format matching the existing API response structure.

#### Scenario: Authentication error response format

- **WHEN** authentication fails for any reason
- **THEN** the response SHALL use the format `{ success: false, data: null, error: "Unauthorized" }`
- **AND** the HTTP status code SHALL be 401
