# Database Specification

## ADDED Requirements

### Requirement: MongoDB Connection

The application SHALL establish and maintain a connection to MongoDB Atlas for data persistence.

#### Scenario: Connection is established

- **WHEN** the application starts and a database operation is requested
- **THEN** a connection to MongoDB Atlas is established using the `MONGODB_URI` environment variable
- **AND** the connection is reused across requests (connection pooling)

#### Scenario: Connection string is missing

- **WHEN** the `MONGODB_URI` environment variable is not configured
- **THEN** database operations fail gracefully
- **AND** an error message indicates the missing configuration

#### Scenario: Connection fails

- **WHEN** the MongoDB connection cannot be established
- **THEN** an error is logged
- **AND** API endpoints return appropriate error responses

### Requirement: Subscription Data Model

The application SHALL define a subscription data model with validation and schema enforcement.

#### Scenario: Subscription schema is defined

- **WHEN** the Subscription model is defined
- **THEN** it includes fields: icon, name, renewalCycle, price, currency, nextRenewalDate
- **AND** includes automatic timestamps (createdAt, updatedAt)
- **AND** uses Mongoose schema validation

#### Scenario: Required fields are validated

- **WHEN** a subscription is created or updated
- **THEN** required fields (name, renewalCycle, price, currency, nextRenewalDate) are validated
- **AND** missing required fields result in validation errors

#### Scenario: Renewal cycle is constrained

- **WHEN** a subscription's renewal cycle is set
- **THEN** it must be one of: "yearly", "quarterly", "monthly"
- **AND** invalid values are rejected with a validation error

#### Scenario: Price is validated

- **WHEN** a subscription's price is set
- **THEN** it must be a non-negative number
- **AND** negative values are rejected

#### Scenario: Date format is validated

- **WHEN** a subscription's next renewal date is set
- **THEN** it must be a valid Date object
- **AND** invalid date formats are rejected

### Requirement: Data Persistence

The application SHALL persist subscription data reliably in MongoDB Atlas.

#### Scenario: Subscription is created

- **WHEN** a new subscription is saved to the database
- **THEN** it is assigned a unique `_id`
- **AND** timestamps are automatically set
- **AND** the subscription can be retrieved by its ID

#### Scenario: Subscription is updated

- **WHEN** an existing subscription is updated
- **THEN** the `updatedAt` timestamp is automatically refreshed
- **AND** the changes are persisted to the database

#### Scenario: Subscription is deleted

- **WHEN** a subscription is deleted
- **THEN** it is permanently removed from the database
- **AND** subsequent queries do not return the deleted subscription

### Requirement: TypeScript Type Safety

The application SHALL provide TypeScript types for subscription data to ensure type safety.

#### Scenario: TypeScript interface is defined

- **WHEN** working with subscription data in TypeScript code
- **THEN** a TypeScript interface or type is available
- **AND** the interface matches the Mongoose schema structure
- **AND** includes all fields with correct types
