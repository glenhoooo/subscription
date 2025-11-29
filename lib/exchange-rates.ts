// Exchange Rate API Types
export interface ExchangeRateResponse {
  result: string;
  documentation: string;
  terms_of_use: string;
  time_last_update_unix: number;
  time_last_update_utc: string;
  time_next_update_unix: number;
  time_next_update_utc: string;
  base_code: string;
  conversion_rates: {
    [key: string]: number;
  };
}

export interface ExchangeRateCache {
  rates: { [key: string]: number };
  lastUpdated: number;
  expiresAt: number;
}

// In-memory cache for exchange rates
let rateCache: ExchangeRateCache | null = null;

// Cache TTL: 24 hours in milliseconds
const CACHE_TTL = 24 * 60 * 60 * 1000;

/**
 * Fetch exchange rates from ExchangeRate-API
 * Uses USD as base currency
 */
export async function fetchExchangeRates(): Promise<{ [key: string]: number }> {
  try {
    // Check if cache is valid
    if (rateCache && Date.now() < rateCache.expiresAt) {
      console.log("Using cached exchange rates");
      return rateCache.rates;
    }

    const apiKey = process.env.EXCHANGERATE_API_KEY;

    // Use the standard endpoint with USD as base
    const url = apiKey && apiKey !== 'your-api-key-here'
      ? `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`
      : `https://open.er-api.com/v6/latest/USD`;

    console.log("Fetching exchange rates from API...");
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Exchange rate API returned ${response.status}`);
    }

    const data: ExchangeRateResponse = await response.json();

    if (data.result !== "success") {
      throw new Error("Exchange rate API request failed");
    }

    // Update cache
    const now = Date.now();
    rateCache = {
      rates: data.conversion_rates,
      lastUpdated: now,
      expiresAt: now + CACHE_TTL,
    };

    console.log("Exchange rates cached successfully");
    return data.conversion_rates;
  } catch (error) {
    console.error("Failed to fetch exchange rates:", error);

    // Return cached rates if available, even if expired
    if (rateCache) {
      console.warn("Using expired cache due to API failure");
      return rateCache.rates;
    }

    // Throw error if no cache available
    throw new Error("Exchange rates unavailable");
  }
}

/**
 * Convert any currency amount to CNY
 */
export function convertToCNY(
  amount: number,
  fromCurrency: string,
  rates: { [key: string]: number }
): number {
  // If already CNY, return as-is
  if (fromCurrency === "CNY") {
    return amount;
  }

  // Get the rate for CNY from USD
  const cnyRate = rates["CNY"];
  if (!cnyRate) {
    throw new Error("CNY rate not available");
  }

  // Get the rate for the source currency from USD
  const fromRate = rates[fromCurrency];
  if (!fromRate) {
    throw new Error(`Rate for ${fromCurrency} not available`);
  }

  // Convert: amount in fromCurrency -> USD -> CNY
  // If we have 100 EUR and EUR rate is 0.9 (1 USD = 0.9 EUR), then we have 100/0.9 USD
  // Then multiply by CNY rate to get CNY amount
  const usdAmount = amount / fromRate;
  const cnyAmount = usdAmount * cnyRate;

  return Math.round(cnyAmount * 100) / 100; // Round to 2 decimal places
}

/**
 * Normalize subscription cost to monthly CNY
 */
export function normalizeToMonthlyCNY(
  price: number,
  currency: string,
  renewalCycle: "yearly" | "quarterly" | "monthly",
  rates: { [key: string]: number }
): number {
  // First convert to CNY
  const cnyAmount = convertToCNY(price, currency, rates);

  // Then normalize based on renewal cycle
  let monthlyAmount: number;
  switch (renewalCycle) {
    case "yearly":
      monthlyAmount = cnyAmount / 12;
      break;
    case "quarterly":
      monthlyAmount = cnyAmount / 3;
      break;
    case "monthly":
      monthlyAmount = cnyAmount;
      break;
    default:
      monthlyAmount = cnyAmount;
  }

  return Math.round(monthlyAmount * 100) / 100; // Round to 2 decimal places
}

/**
 * Get cached exchange rates or fetch if not available
 */
export function getCachedRates(): { [key: string]: number } | null {
  if (rateCache && Date.now() < rateCache.expiresAt) {
    return rateCache.rates;
  }
  return null;
}

/**
 * Initialize exchange rate cache (call on app load)
 */
export async function initializeExchangeRates(): Promise<void> {
  try {
    await fetchExchangeRates();
    console.log("Exchange rates initialized");
  } catch (error) {
    console.error("Failed to initialize exchange rates:", error);
  }
}
