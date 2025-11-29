# Dashboard Specification (Delta)

## MODIFIED Requirements

### Requirement: Dashboard Content

The dashboard page SHALL display a subscription management table with full CRUD capabilities and a cost summary section for authenticated users.

#### Scenario: Dashboard displays subscription table and summary

- **WHEN** an authenticated user views the dashboard
- **THEN** a table is displayed showing all subscriptions
- **AND** a summary section is displayed below the table
- **AND** the summary shows total annual cost and average monthly cost in CNY

#### Scenario: Empty subscriptions list with summary

- **WHEN** an authenticated user views the dashboard with no subscriptions
- **THEN** an empty state message is displayed in the table area
- **AND** the summary section shows ¥0.00 for all values

## ADDED Requirements

### Requirement: Subscription Summary Section

The dashboard SHALL display a summary section below the subscription table showing total and average costs.

#### Scenario: Summary section is positioned correctly

- **WHEN** the dashboard is rendered
- **THEN** the summary section appears immediately below the subscription table
- **AND** the section is visually separated from the table
- **AND** the section spans the full width of the table container

#### Scenario: Summary displays total annual cost

- **WHEN** subscriptions are loaded and exchange rates are available
- **THEN** the summary shows "每年总花费" (Total Annual Cost) label
- **AND** displays the total annual cost in CNY with proper formatting
- **AND** the value is calculated from all subscriptions

#### Scenario: Summary displays average monthly cost

- **WHEN** the summary is displayed
- **THEN** the summary shows "平均每月花费" (Average Monthly Cost) label
- **AND** displays the average monthly cost in CNY
- **AND** the value is calculated as total annual ÷ 12

#### Scenario: Summary has distinct visual styling

- **WHEN** the summary section is displayed
- **THEN** it uses a card or panel design
- **AND** has a distinct background color from the table
- **AND** uses appropriate spacing and typography
- **AND** maintains consistency with the overall design system

#### Scenario: Summary is responsive

- **WHEN** the dashboard is viewed on mobile devices
- **THEN** the summary adapts to smaller screens
- **AND** summary items may stack vertically
- **AND** maintains readability and usability
