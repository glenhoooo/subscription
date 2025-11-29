## ADDED Requirements

### Requirement: Protected Exchange Rates Endpoint

The exchange rates API endpoint SHALL require authentication using the API key validation mechanism defined in the `api-authentication` capability.

#### Scenario: GET /api/exchange-rates requires authentication

- **WHEN** a request to `GET /api/exchange-rates` is made without valid authentication
- **THEN** the system SHALL return HTTP 401 Unauthorized
- **WHEN** a request to `GET /api/exchange-rates` is made with valid authentication
- **THEN** the system SHALL fetch and return exchange rates from the external API

### Requirement: Frontend Exchange Rates Client Integration

The frontend application SHALL include the `X-API-Key` header in all requests to the exchange rates endpoint.

#### Scenario: Frontend includes authentication header for exchange rates

- **WHEN** the frontend makes an API request to `/api/exchange-rates`
- **THEN** the request SHALL include the `X-API-Key` header
- **AND** the header value SHALL be retrieved from `localStorage.getItem('authKey')`

#### Scenario: Frontend handles authentication errors for exchange rates

- **WHEN** the frontend receives a 401 response from the exchange rates endpoint
- **THEN** the application SHALL handle the error appropriately (e.g., redirect to auth page, show error message)
