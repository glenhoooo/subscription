# Change: Add Subscription Summary Overview

## Why

Users need a quick overview of their total subscription costs to understand their financial commitment at a glance. Currently, they must manually calculate the total from individual subscriptions. Adding a summary section below the subscription table will provide immediate insight into total annual and average monthly costs in CNY, helping users make informed budget decisions.

## What Changes

- Add a summary section below the subscription table
- Calculate and display total annual cost in CNY (sum of all subscriptions normalized to yearly)
- Calculate and display average monthly cost in CNY (total annual ÷ 12)
- Use existing exchange rate and normalization logic from currency conversion feature
- Display summary in a visually distinct card/panel format
- Update summary automatically when subscriptions change

## Impact

- **Affected specs**:
  - `subscription-summary` (ADDED - new capability for cost overview)
  - `dashboard` (MODIFIED - add summary section below table)
- **Affected code**:
  - `app/dashboard/page.tsx` - Add summary calculation and display component
- **User experience**: Users can now see total and average costs at a glance without manual calculation
- **Dependencies**: Requires `currency-conversion` feature (already implemented)
