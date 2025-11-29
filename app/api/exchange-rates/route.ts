import { NextResponse } from "next/server";
import { fetchExchangeRates } from "@/lib/exchange-rates";

export async function GET() {
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
