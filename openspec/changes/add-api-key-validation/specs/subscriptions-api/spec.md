## ADDED Requirements

### Requirement: Protected Subscription Endpoints

All subscription API endpoints SHALL require authentication using the API key validation mechanism defined in the `api-authentication` capability.

#### Scenario: GET /api/subscriptions requires authentication

- **WHEN** a request to `GET /api/subscriptions` is made without valid authentication
- **THEN** the system SHALL return HTTP 401 Unauthorized
- **WHEN** a request to `GET /api/subscriptions` is made with valid authentication
- **THEN** the system SHALL return the list of subscriptions

#### Scenario: POST /api/subscriptions requires authentication

- **WHEN** a request to `POST /api/subscriptions` is made without valid authentication
- **THEN** the system SHALL return HTTP 401 Unauthorized
- **WHEN** a request to `POST /api/subscriptions` is made with valid authentication and valid data
- **THEN** the system SHALL create a new subscription and return it

#### Scenario: PUT /api/subscriptions/[id] requires authentication

- **WHEN** a request to `PUT /api/subscriptions/[id]` is made without valid authentication
- **THEN** the system SHALL return HTTP 401 Unauthorized
- **WHEN** a request to `PUT /api/subscriptions/[id]` is made with valid authentication and valid data
- **THEN** the system SHALL update the subscription and return it

#### Scenario: DELETE /api/subscriptions/[id] requires authentication

- **WHEN** a request to `DELETE /api/subscriptions/[id]` is made without valid authentication
- **THEN** the system SHALL return HTTP 401 Unauthorized
- **WHEN** a request to `DELETE /api/subscriptions/[id]` is made with valid authentication
- **THEN** the system SHALL delete the subscription

### Requirement: Frontend API Client Integration

The frontend application SHALL include the `X-API-Key` header in all requests to subscription endpoints.

#### Scenario: Frontend includes authentication header

- **WHEN** the frontend makes any API request to `/api/subscriptions/*` endpoints
- **THEN** the request SHALL include the `X-API-Key` header
- **AND** the header value SHALL be retrieved from `localStorage.getItem('authKey')`

#### Scenario: Frontend handles authentication errors

- **WHEN** the frontend receives a 401 response from subscription endpoints
- **THEN** the application SHALL handle the error appropriately (e.g., redirect to auth page, show error message)
