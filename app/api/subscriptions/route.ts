import { NextRequest, NextResponse } from "next/server";
import { API_ROUTES } from "@/lib/apiRoutes";

export async function GET(req: NextRequest) {
  const token = req.headers.get("Authorization");

  try {
    const res = await fetch(API_ROUTES.SUBSCRIPTIONS.LIST, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (err) {
    return NextResponse.json({ message: "Failed to fetch subscriptions" }, { status: 500 });
  }
}


export async function POST(req: NextRequest) {
  const token = req.headers.get("Authorization");
  const body = await req.json();

  try {
    const res = await fetch(API_ROUTES.SUBSCRIPTIONS.LIST, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    return NextResponse.json({ message: "Failed to create subscription" }, { status: 500 });
  }
}

