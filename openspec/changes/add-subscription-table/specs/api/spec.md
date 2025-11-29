# API Specification

## ADDED Requirements

### Requirement: List Subscriptions Endpoint

The application SHALL provide an API endpoint to retrieve all subscriptions.

#### Scenario: GET request returns subscriptions

- **WHEN** a GET request is made to `/api/subscriptions`
- **THEN** the endpoint returns a JSON response with all subscriptions
- **AND** the response format is `{ success: true, data: [...], error: null }`
- **AND** subscriptions are ordered by creation date (newest first)

#### Scenario: No subscriptions exist

- **WHEN** a GET request is made and no subscriptions exist
- **THEN** the endpoint returns an empty array
- **AND** the response format is `{ success: true, data: [], error: null }`

#### Scenario: Database error on GET

- **WHEN** a GET request is made and a database error occurs
- **THEN** the endpoint returns a 500 status code
- **AND** the response format is `{ success: false, data: null, error: "error message" }`

### Requirement: Create Subscription Endpoint

The application SHALL provide an API endpoint to create new subscriptions.

#### Scenario: POST request creates subscription

- **WHEN** a POST request is made to `/api/subscriptions` with valid subscription data
- **THEN** a new subscription is created in the database
- **AND** the endpoint returns a 201 status code
- **AND** the response includes the created subscription data

#### Scenario: Invalid data on POST

- **WHEN** a POST request is made with invalid or missing required fields
- **THEN** the endpoint returns a 400 status code
- **AND** the response includes validation error details

#### Scenario: Database error on POST

- **WHEN** a POST request is made and a database error occurs
- **THEN** the endpoint returns a 500 status code
- **AND** the response includes an error message

### Requirement: Update Subscription Endpoint

The application SHALL provide an API endpoint to update existing subscriptions.

#### Scenario: PUT request updates subscription

- **WHEN** a PUT request is made to `/api/subscriptions/[id]` with valid data
- **THEN** the specified subscription is updated in the database
- **AND** the endpoint returns a 200 status code
- **AND** the response includes the updated subscription data

#### Scenario: Subscription not found on PUT

- **WHEN** a PUT request is made with an invalid or non-existent ID
- **THEN** the endpoint returns a 404 status code
- **AND** the response indicates the subscription was not found

#### Scenario: Invalid data on PUT

- **WHEN** a PUT request is made with invalid data
- **THEN** the endpoint returns a 400 status code
- **AND** the response includes validation error details

### Requirement: Delete Subscription Endpoint

The application SHALL provide an API endpoint to delete subscriptions.

#### Scenario: DELETE request removes subscription

- **WHEN** a DELETE request is made to `/api/subscriptions/[id]`
- **THEN** the specified subscription is deleted from the database
- **AND** the endpoint returns a 200 status code
- **AND** the response confirms successful deletion

#### Scenario: Subscription not found on DELETE

- **WHEN** a DELETE request is made with an invalid or non-existent ID
- **THEN** the endpoint returns a 404 status code
- **AND** the response indicates the subscription was not found

#### Scenario: Database error on DELETE

- **WHEN** a DELETE request is made and a database error occurs
- **THEN** the endpoint returns a 500 status code
- **AND** the response includes an error message

### Requirement: Request Validation

All API endpoints SHALL validate incoming requests and provide meaningful error responses.

#### Scenario: Content-Type is validated

- **WHEN** a POST or PUT request is made without JSON content-type
- **THEN** the endpoint returns a 415 status code
- **AND** indicates unsupported media type

#### Scenario: Request body is validated

- **WHEN** a POST or PUT request is made with malformed JSON
- **THEN** the endpoint returns a 400 status code
- **AND** indicates invalid JSON format

### Requirement: Response Consistency

All API endpoints SHALL return responses in a consistent format.

#### Scenario: Successful responses follow standard format

- **WHEN** an API request succeeds
- **THEN** the response structure is `{ success: true, data: any, error: null }`

#### Scenario: Error responses follow standard format

- **WHEN** an API request fails
- **THEN** the response structure is `{ success: false, data: null, error: string }`
- **AND** appropriate HTTP status codes are used (400, 404, 500)
