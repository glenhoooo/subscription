# Change: Add Currency Conversion with CNY Display

## Why

Users with subscriptions in different currencies need to understand the total cost in their local currency (Chinese Yuan/RMB). Currently, the dashboard only shows prices in the original currency without any conversion capability. Adding exchange rate integration will provide users with a unified view of their subscription costs in CNY, making budget planning and cost comparison easier.

## What Changes

- Integrate ExchangeRate-API to fetch real-time currency exchange rates
- Cache exchange rates in memory on application load to minimize API calls
- Add a new "每月人民币" (Monthly CNY) column to the subscription table
- Calculate CNY equivalent based on subscription price, renewal cycle, and current exchange rate
- Normalize all subscriptions to monthly CNY cost for consistent comparison
- Add exchange rate refresh mechanism
- Handle API errors and provide fallback behavior

## Impact

- **Affected specs**:
  - `currency-conversion` (ADDED - new capability for exchange rate management)
  - `dashboard` (MODIFIED - add CNY column to subscription table)
- **Affected code**:
  - `lib/exchange-rates.ts` - New service for fetching and caching exchange rates
  - `app/dashboard/page.tsx` - Add CNY column and conversion logic
  - `.env.local` - Add `EXCHANGERATE_API_KEY` environment variable
  - `.env.example` - Document ExchangeRate-API key requirement
- **External dependencies**: ExchangeRate-API (https://www.exchangerate-api.com)
- **User experience**: Users can now see all subscription costs normalized to monthly CNY for easier comparison
