# Currency Conversion Specification (Delta)

## ADDED Requirements

### Requirement: Exchange Rate Fetching

The system SHALL fetch currency exchange rates from ExchangeRate-API on application load.

#### Scenario: Fetch exchange rates on app initialization

- **WHEN** the application starts or loads
- **THEN** a request is sent to ExchangeRate-API standard endpoint
- **AND** the response contains conversion rates for all supported currencies
- **AND** the base currency is USD

#### Scenario: API returns successful response

- **WHEN** ExchangeRate-API returns a successful response
- **THEN** the conversion rates are extracted from the response
- **AND** rates for USD, CNY, EUR, GBP, and RUB are available
- **AND** the rates are stored in the cache

#### Scenario: API request fails

- **WHEN** the ExchangeRate-API request fails or times out
- **THEN** an error is logged
- **AND** a fallback mechanism is triggered
- **AND** the user is notified of limited functionality

### Requirement: Exchange Rate Caching

The system SHALL cache exchange rates in memory to minimize API calls and improve performance.

#### Scenario: Rates are cached after successful fetch

- **WHEN** exchange rates are successfully fetched
- **THEN** the rates are stored in an in-memory cache
- **AND** a timestamp is recorded for cache expiration
- **AND** the cache is accessible to all components

#### Scenario: Cache is used for conversions

- **WHEN** a currency conversion is requested
- **THEN** the cached exchange rates are used
- **AND** no additional API call is made
- **AND** conversion is performed using cached rates

#### Scenario: Cache expires after 24 hours

- **WHEN** the cached rates are older than 24 hours
- **THEN** the cache is considered stale
- **AND** a new API request is initiated on next conversion attempt
- **AND** the cache is refreshed with new rates

### Requirement: Currency Conversion to CNY

The system SHALL convert any supported currency amount to Chinese Yuan (CNY).

#### Scenario: Convert USD to CNY

- **WHEN** a price in USD is provided for conversion
- **THEN** the USD amount is multiplied by the USD-to-CNY exchange rate
- **AND** the result is returned as a CNY amount
- **AND** the value is rounded to 2 decimal places

#### Scenario: Convert EUR to CNY

- **WHEN** a price in EUR is provided for conversion
- **THEN** the EUR amount is converted to CNY using the exchange rate
- **AND** the result is properly formatted

#### Scenario: Convert already-CNY amount

- **WHEN** a price already in CNY is provided for conversion
- **THEN** the amount is returned unchanged
- **AND** no conversion calculation is performed

#### Scenario: Unsupported currency conversion

- **WHEN** a currency not in the cache is requested for conversion
- **THEN** an error is returned
- **AND** the original amount is returned with a warning

### Requirement: Normalize to Monthly CNY

The system SHALL normalize subscription costs to monthly CNY amounts for consistent comparison.

#### Scenario: Normalize yearly subscription

- **WHEN** a yearly subscription price is normalized
- **THEN** the price is first converted to CNY (if needed)
- **AND** the CNY amount is divided by 12
- **AND** the result represents the monthly CNY cost

#### Scenario: Normalize quarterly subscription

- **WHEN** a quarterly subscription price is normalized
- **THEN** the price is first converted to CNY (if needed)
- **AND** the CNY amount is divided by 3
- **AND** the result represents the monthly CNY cost

#### Scenario: Normalize monthly subscription

- **WHEN** a monthly subscription price is normalized
- **THEN** the price is converted to CNY (if needed)
- **AND** the CNY amount is used as-is
- **AND** no division is performed

#### Scenario: Format normalized amount

- **WHEN** a normalized monthly CNY amount is calculated
- **THEN** the value is rounded to 2 decimal places
- **AND** the value is formatted with CNY currency symbol
- **AND** the value is returned as a displayable string

### Requirement: Error Handling

The system SHALL handle exchange rate errors gracefully without breaking functionality.

#### Scenario: API key is missing

- **WHEN** the ExchangeRate-API key is not configured
- **THEN** an error is logged during initialization
- **AND** a warning message is displayed to the user
- **AND** the CNY column shows "N/A" or is hidden

#### Scenario: Network error during fetch

- **WHEN** a network error occurs while fetching rates
- **THEN** the error is caught and logged
- **AND** previous cached rates are used if available
- **AND** if no cache exists, conversion functionality is disabled

#### Scenario: Invalid API response

- **WHEN** the API returns an invalid or malformed response
- **THEN** the response is validated and rejected
- **AND** an error is logged with details
- **AND** fallback behavior is triggered
