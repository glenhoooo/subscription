import { NextRequest, NextResponse } from "next/server";

/**
 * Validates API requests by checking the X-API-Key header against NEXT_PUBLIC_AUTH_KEY
 * @param request - The incoming Next.js request
 * @returns NextResponse with 401 error if authentication fails, null if authentication succeeds
 */
export function validateApiKey(request: NextRequest): NextResponse | null {
  const apiKey = request.headers.get("X-API-Key");
  const expectedKey = process.env.NEXT_PUBLIC_AUTH_KEY;

  if (!apiKey || apiKey !== expectedKey) {
    return NextResponse.json(
      {
        success: false,
        data: null,
        error: "Unauthorized",
      },
      { status: 401 }
    );
  }

  return null; // Authentication succeeded
}
