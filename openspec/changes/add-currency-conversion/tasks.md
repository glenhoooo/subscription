# Implementation Tasks

## 1. API Setup & Environment

- [x] 1.1 Sign up for ExchangeRate-API and obtain API key
- [x] 1.2 Add `EXCHANGERATE_API_KEY` to `.env.local`
- [x] 1.3 Update `.env.example` with API key documentation

## 2. Exchange Rate Service

- [x] 2.1 Create `lib/exchange-rates.ts` service module
- [x] 2.2 Implement `fetchExchangeRates()` function to call ExchangeRate-API
- [x] 2.3 Implement in-memory cache for exchange rates
- [x] 2.4 Add rate cache initialization on app load
- [x] 2.5 Add TypeScript types for exchange rate data
- [x] 2.6 Implement error handling for API failures
- [x] 2.7 Add cache expiration logic (24-hour TTL)
- [x] 2.8 Implement fallback behavior when API is unavailable

## 3. Conversion Logic

- [x] 3.1 Create `convertToCNY()` function to convert any currency to CNY
- [x] 3.2 Create `normalizeToMonthlyCNY()` function to normalize subscriptions
- [x] 3.3 Handle renewal cycle conversion (yearly ÷ 12, quarterly ÷ 3, monthly × 1)
- [x] 3.4 Add proper rounding for currency display (2 decimal places)
- [x] 3.5 Handle edge cases (missing rates, invalid currencies)

## 4. Dashboard Integration

- [x] 4.1 Load exchange rates when dashboard component mounts
- [x] 4.2 Add "每月人民币" column to subscription table header
- [x] 4.3 Calculate and display monthly CNY value for each subscription
- [x] 4.4 Format CNY values with proper currency display
- [x] 4.5 Add loading state indicator while fetching exchange rates
- [x] 4.6 Display error message if exchange rates fail to load
- [x] 4.7 Update table layout to accommodate new column
- [x] 4.8 Ensure responsive design with additional column

## 5. Testing & Validation

- [x] 5.1 Test exchange rate API integration
- [x] 5.2 Verify cache is populated correctly on app load
- [x] 5.3 Test CNY conversion for all supported currencies (USD, EUR, GBP, RUB)
- [x] 5.4 Test renewal cycle normalization (yearly, quarterly, monthly)
- [x] 5.5 Verify calculation accuracy with known exchange rates
- [x] 5.6 Test error handling when API is unavailable
- [x] 5.7 Test responsive table design with new column
- [x] 5.8 Verify TypeScript compilation with no errors
- [x] 5.9 Test production build succeeds
