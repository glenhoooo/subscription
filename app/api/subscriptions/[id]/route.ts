import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Subscription from "@/lib/models/Subscription";

// PUT /api/subscriptions/[id] - Update subscription
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    const body = await request.json();

    const subscription = await Subscription.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!subscription) {
      return NextResponse.json(
        {
          success: false,
          data: null,
          error: "Subscription not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: subscription,
      error: null,
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Failed to update subscription";
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

// DELETE /api/subscriptions/[id] - Delete subscription
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;

    const subscription = await Subscription.findByIdAndDelete(id);

    if (!subscription) {
      return NextResponse.json(
        {
          success: false,
          data: null,
          error: "Subscription not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: { message: "Subscription deleted successfully" },
      error: null,
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Failed to delete subscription";
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
