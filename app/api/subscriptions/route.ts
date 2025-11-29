import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Subscription from "@/lib/models/Subscription";

// GET /api/subscriptions - List all subscriptions
export async function GET() {
  try {
    await connectDB();
    const subscriptions = await Subscription.find({}).sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      data: subscriptions,
      error: null,
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Failed to fetch subscriptions";
    return NextResponse.json(
      {
        success: false,
        data: null,
        error: errorMessage,
      },
      { status: 500 }
    );
  }
}

// POST /api/subscriptions - Create new subscription
export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();

    // Validate required fields
    const { icon, name, renewalCycle, price, currency, nextRenewalDate } = body;

    if (!icon || !name || !renewalCycle || price === undefined || !currency || !nextRenewalDate) {
      return NextResponse.json(
        {
          success: false,
          data: null,
          error: "Missing required fields",
        },
        { status: 400 }
      );
    }

    const subscription = await Subscription.create(body);

    return NextResponse.json(
      {
        success: true,
        data: subscription,
        error: null,
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Failed to create subscription";
    return NextResponse.json(
      {
        success: false,
        data: null,
        error: errorMessage,
      },
      { status: 500 }
    );
  }
}
