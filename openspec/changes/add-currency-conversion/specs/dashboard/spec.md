# Dashboard Specification (Delta)

## MODIFIED Requirements

### Requirement: Subscription Table Display

The dashboard SHALL display subscription information in a table format with appropriate columns including monthly CNY conversion.

#### Scenario: Table columns are displayed

- **WHEN** subscriptions are loaded
- **THEN** the table displays columns for icon, name, renewal cycle, price, monthly CNY, and remaining time
- **AND** each row represents one subscription
- **AND** all columns are properly aligned and formatted

#### Scenario: Table columns include CNY conversion

- **WHEN** subscriptions are displayed in the table
- **THEN** a "每月人民币" (Monthly CNY) column is visible
- **AND** the column is positioned after the price column
- **AND** the column header is properly styled

#### Scenario: Table is responsive with CNY column

- **WHEN** the dashboard is viewed on mobile devices
- **THEN** the table adapts to smaller screens
- **AND** maintains readability and usability
- **AND** the CNY column may stack or scroll horizontally if needed

## ADDED Requirements

### Requirement: Monthly CNY Calculation

The dashboard SHALL calculate and display the monthly CNY equivalent for each subscription.

#### Scenario: Calculate monthly CNY for USD subscription

- **WHEN** a subscription with USD currency is displayed
- **THEN** the price is converted to CNY using current exchange rate
- **AND** the CNY amount is normalized based on renewal cycle
- **AND** the monthly CNY value is displayed in the table

#### Scenario: Calculate monthly CNY for yearly subscription

- **WHEN** a yearly subscription is displayed
- **THEN** the annual price is converted to CNY
- **AND** the CNY amount is divided by 12
- **AND** the resulting monthly CNY value is shown

#### Scenario: Calculate monthly CNY for quarterly subscription

- **WHEN** a quarterly subscription is displayed
- **THEN** the quarterly price is converted to CNY
- **AND** the CNY amount is divided by 3
- **AND** the resulting monthly CNY value is shown

#### Scenario: Calculate monthly CNY for monthly subscription

- **WHEN** a monthly subscription is displayed
- **THEN** the monthly price is converted to CNY
- **AND** no division is needed
- **AND** the CNY value is shown

#### Scenario: Display CNY value with proper formatting

- **WHEN** the monthly CNY value is calculated
- **THEN** the value is displayed with 2 decimal places
- **AND** the value is prefixed with "¥" or "CNY"
- **AND** the value is right-aligned in the column

### Requirement: Exchange Rate Loading

The dashboard SHALL load exchange rates before displaying CNY calculations.

#### Scenario: Load exchange rates on dashboard mount

- **WHEN** the dashboard component mounts
- **THEN** exchange rates are fetched from the cache or API
- **AND** the rates are available for conversion calculations

#### Scenario: Display loading state for exchange rates

- **WHEN** exchange rates are being fetched
- **THEN** a loading indicator is shown
- **AND** the CNY column shows loading placeholders
- **AND** the table remains usable for other operations

#### Scenario: Exchange rates loaded successfully

- **WHEN** exchange rates are successfully loaded
- **THEN** CNY values are calculated for all subscriptions
- **AND** the CNY column displays the calculated values
- **AND** the loading indicator is removed

#### Scenario: Exchange rate loading fails

- **WHEN** exchange rate loading fails
- **THEN** an error message is displayed to the user
- **AND** the CNY column shows "N/A" or error indicator
- **AND** other table functionality remains operational
