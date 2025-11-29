# Subscription Summary Specification

## ADDED Requirements

### Requirement: Total Annual Cost Calculation

The system SHALL calculate the total annual cost of all subscriptions in CNY.

#### Scenario: Calculate total with multiple subscriptions

- **WHEN** multiple subscriptions exist with different currencies and renewal cycles
- **THEN** each subscription is converted to CNY
- **AND** each subscription cost is normalized to annual amount
- **AND** all annual amounts are summed to produce total annual cost

#### Scenario: Normalize monthly subscription to annual

- **WHEN** a monthly subscription is included in the total
- **THEN** the monthly CNY cost is multiplied by 12
- **AND** the result is added to the total annual cost

#### Scenario: Normalize quarterly subscription to annual

- **WHEN** a quarterly subscription is included in the total
- **THEN** the quarterly CNY cost is multiplied by 4
- **AND** the result is added to the total annual cost

#### Scenario: Normalize yearly subscription to annual

- **WHEN** a yearly subscription is included in the total
- **THEN** the yearly CNY cost is used as-is
- **AND** the result is added to the total annual cost

#### Scenario: No subscriptions exist

- **WHEN** there are no subscriptions
- **THEN** the total annual cost is 0
- **AND** displayed as "¥0.00"

### Requirement: Average Monthly Cost Calculation

The system SHALL calculate the average monthly cost from the total annual cost.

#### Scenario: Calculate average monthly from annual total

- **WHEN** total annual cost is calculated
- **THEN** the annual cost is divided by 12
- **AND** the result is the average monthly cost in CNY
- **AND** the value is rounded to 2 decimal places

#### Scenario: No subscriptions average

- **WHEN** there are no subscriptions
- **THEN** the average monthly cost is 0
- **AND** displayed as "¥0.00"

### Requirement: Summary Display

The system SHALL display the subscription cost summary in a visually distinct section.

#### Scenario: Summary section is displayed

- **WHEN** the dashboard loads with subscriptions
- **THEN** a summary section appears below the subscription table
- **AND** the section is visually distinct from the table
- **AND** the section contains total annual and average monthly costs

#### Scenario: Summary values are formatted

- **WHEN** summary costs are displayed
- **THEN** values are prefixed with "¥" symbol
- **AND** values are formatted with 2 decimal places
- **AND** large values include thousand separators for readability

#### Scenario: Summary layout is responsive

- **WHEN** the dashboard is viewed on different screen sizes
- **THEN** the summary section adapts to the viewport
- **AND** maintains readability on mobile and desktop
- **AND** summary items may stack vertically on small screens

#### Scenario: Summary shows loading state

- **WHEN** exchange rates are still loading
- **THEN** the summary section shows loading indicators
- **AND** placeholders are displayed instead of values
- **AND** the section remains visible but disabled

#### Scenario: Summary handles missing exchange rates

- **WHEN** exchange rates fail to load
- **THEN** the summary section shows "N/A" for calculated values
- **AND** an explanatory message is displayed
- **AND** the layout remains intact

### Requirement: Real-time Summary Updates

The system SHALL update the summary when subscription data changes.

#### Scenario: Summary updates after adding subscription

- **WHEN** a new subscription is added
- **THEN** the summary recalculates immediately
- **AND** displays the updated total and average
- **AND** the transition is smooth without layout shift

#### Scenario: Summary updates after editing subscription

- **WHEN** an existing subscription is modified
- **THEN** the summary recalculates with new values
- **AND** reflects the changes immediately

#### Scenario: Summary updates after deleting subscription

- **WHEN** a subscription is deleted
- **THEN** the summary recalculates without the deleted item
- **AND** displays the updated totals

#### Scenario: Summary updates when exchange rates load

- **WHEN** exchange rates finish loading
- **THEN** the summary recalculates with actual rates
- **AND** replaces loading placeholders with calculated values
