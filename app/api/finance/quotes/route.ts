// app/api/finance/quotes/route.ts

import { NextResponse } from "next/server";

// Mock finance data for development
const mockQuotes = [
  { symbol: "AAPL", price: 226.34, change: 0.47 },
  { symbol: "MSFT", price: 412.22, change: -0.18 },
  { symbol: "GOOG", price: 153.12, change: 0.32 },
];

// API handler — supports GET requests
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const symbolsParam = searchParams.get("symbols");

    // Parse symbols from query (comma-separated)
    const symbols = symbolsParam ? symbolsParam.split(",") : [];

    // Filter quotes
    const filtered = symbols.length
      ? mockQuotes.filter((q) => symbols.includes(q.symbol))
      : mockQuotes;

    return NextResponse.json({
      success: true,
      data: filtered,
      count: filtered.length,
    });
  } catch (err) {
    console.error("Quotes API error:", err);
    return NextResponse.json(
      { success: false, error: "Failed to fetch quotes" },
      { status: 500 }
    );
  }
}

// Run this on the edge runtime (for faster responses)
export const runtime = "edge";

