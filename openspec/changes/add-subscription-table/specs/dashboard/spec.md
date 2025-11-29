# Dashboard Specification (Delta)

## MODIFIED Requirements

### Requirement: Dashboard Content

The dashboard page SHALL display a subscription management table with full CRUD capabilities for authenticated users.

#### Scenario: Dashboard displays subscription table

- **WHEN** an authenticated user views the dashboard
- **THEN** a table is displayed showing all subscriptions
- **AND** the table includes columns: icon, name, renewal cycle, price, remaining time
- **AND** action buttons (edit, delete) are available for each subscription

#### Scenario: Empty subscriptions list

- **WHEN** an authenticated user views the dashboard with no subscriptions
- **THEN** an empty state message is displayed
- **AND** the "Add Subscription" button is prominently shown

#### Scenario: Loading subscriptions

- **WHEN** the dashboard is loading subscription data
- **THEN** a loading indicator is displayed
- **AND** the table shows a loading state until data is fetched

## ADDED Requirements

### Requirement: Subscription Table Display

The dashboard SHALL display subscription information in a table format with appropriate columns and formatting.

#### Scenario: Table columns are displayed

- **WHEN** subscriptions are loaded
- **THEN** the table displays columns for icon, name, renewal cycle, price, and remaining time
- **AND** each row represents one subscription

#### Scenario: Icon is rendered

- **WHEN** a subscription row is displayed
- **THEN** the icon cell shows a lucide-react icon corresponding to the stored icon name
- **AND** the icon is visually distinct and appropriately sized

#### Scenario: Remaining time is calculated

- **WHEN** a subscription row is displayed
- **THEN** the remaining time is calculated from the next renewal date
- **AND** displayed in human-readable format (e.g., "15 days", "2 months")
- **AND** color-coded: green (>30 days), yellow (7-30 days), red (<7 days or expired)

#### Scenario: Table is responsive

- **WHEN** the dashboard is viewed on mobile devices
- **THEN** the table adapts to smaller screens
- **AND** maintains readability and usability

### Requirement: Add Subscription

The dashboard SHALL allow users to add new subscriptions through a form interface.

#### Scenario: User initiates add subscription

- **WHEN** the user clicks the "Add Subscription" button
- **THEN** a form or modal is displayed for entering subscription details

#### Scenario: User fills out subscription form

- **WHEN** the add subscription form is displayed
- **THEN** input fields are available for: icon, name, renewal cycle, price, currency, next renewal date
- **AND** icon selection uses a dropdown with predefined lucide-react icons
- **AND** renewal cycle offers options: yearly, quarterly, monthly

#### Scenario: User submits new subscription

- **WHEN** the user fills out the form and clicks submit
- **THEN** form validation runs (required fields, valid dates)
- **AND** if valid, a POST request is sent to `/api/subscriptions`
- **AND** on success, the new subscription appears in the table
- **AND** the form is closed or cleared

#### Scenario: Form validation fails

- **WHEN** the user submits the form with invalid or missing data
- **THEN** validation error messages are displayed
- **AND** the form remains open for correction

### Requirement: Edit Subscription

The dashboard SHALL allow users to edit existing subscriptions.

#### Scenario: User initiates edit

- **WHEN** the user clicks the edit button on a subscription row
- **THEN** a form or modal is displayed pre-populated with existing subscription data

#### Scenario: User updates subscription

- **WHEN** the user modifies fields and clicks save
- **THEN** form validation runs
- **AND** if valid, a PUT request is sent to `/api/subscriptions/[id]`
- **AND** on success, the subscription row updates with new data
- **AND** the form is closed

#### Scenario: Edit is cancelled

- **WHEN** the user cancels the edit operation
- **THEN** the form closes without making changes
- **AND** the subscription data remains unchanged

### Requirement: Delete Subscription

The dashboard SHALL allow users to delete subscriptions with confirmation.

#### Scenario: User initiates delete

- **WHEN** the user clicks the delete button on a subscription row
- **THEN** a confirmation dialog is displayed

#### Scenario: User confirms deletion

- **WHEN** the user confirms the delete action
- **THEN** a DELETE request is sent to `/api/subscriptions/[id]`
- **AND** on success, the subscription is removed from the table
- **AND** a success message is displayed

#### Scenario: User cancels deletion

- **WHEN** the user cancels the delete confirmation
- **THEN** the dialog closes and no deletion occurs

### Requirement: Search and Filter

The dashboard SHALL provide search and filter functionality for finding subscriptions.

#### Scenario: User searches subscriptions

- **WHEN** the user types in the search input field
- **THEN** the table filters in real-time to show only matching subscriptions
- **AND** matches are found in subscription name and renewal cycle
- **AND** search is case-insensitive

#### Scenario: No search results

- **WHEN** the search query yields no matching subscriptions
- **THEN** a "No results found" message is displayed
- **AND** the user can clear the search to see all subscriptions again

#### Scenario: Search is cleared

- **WHEN** the user clears the search input
- **THEN** all subscriptions are displayed again

### Requirement: Error Handling

The dashboard SHALL handle errors gracefully during subscription operations.

#### Scenario: API request fails

- **WHEN** an API request (create, update, delete) fails
- **THEN** an error message is displayed to the user
- **AND** the UI returns to a stable state (form remains open for retry)

#### Scenario: Database connection error

- **WHEN** the dashboard cannot fetch subscriptions due to database issues
- **THEN** an error message is displayed
- **AND** a retry button or instruction is provided
