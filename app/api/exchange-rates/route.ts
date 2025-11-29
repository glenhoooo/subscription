import { NextRequest, NextResponse } from "next/server";
import { fetchExchangeRates } from "@/lib/exchange-rates";
import { validateApiKey } from "@/lib/api-auth";

export async function GET(request: NextRequest) {
  const authError = validateApiKey(request);
  if (authError) return authError;

  try {
    const rates = await fetchExchangeRates();
    return NextResponse.json({ success: true, rates });
  } catch (error) {
    console.error("Exchange rate API error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch exchange rates" },
      { status: 500 }
    );
  }
}
