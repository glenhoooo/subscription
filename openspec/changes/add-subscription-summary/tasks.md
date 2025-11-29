# Implementation Tasks

## 1. Summary Calculations

- [x] 1.1 Create `calculateTotalAnnualCNY()` function
- [x] 1.2 Create `calculateAverageMonthly()` function
- [x] 1.3 Handle edge cases (no subscriptions, missing exchange rates)
- [x] 1.4 Add proper number formatting for large amounts

## 2. Summary Component

- [x] 2.1 Design summary section layout below subscription table
- [x] 2.2 Add total annual cost display with CNY formatting
- [x] 2.3 Add average monthly cost display with CNY formatting
- [x] 2.4 Add visual styling (card/panel with distinct background)
- [x] 2.5 Make summary responsive for mobile and desktop
- [x] 2.6 Add loading state for summary while rates are loading

## 3. Integration

- [x] 3.1 Integrate summary calculations with existing subscription data
- [x] 3.2 Update summary when subscriptions change (add/edit/delete)
- [x] 3.3 Update summary when exchange rates load
- [x] 3.4 Handle empty state (no subscriptions)

## 4. Testing & Validation

- [x] 4.1 Test calculation accuracy with multiple subscriptions
- [x] 4.2 Test with different renewal cycles (yearly, quarterly, monthly)
- [x] 4.3 Test with different currencies
- [x] 4.4 Test responsive design on mobile and desktop
- [x] 4.5 Verify TypeScript compilation with no errors
- [x] 4.6 Test production build succeeds
