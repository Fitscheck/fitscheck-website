import { NextRequest, NextResponse } from "next/server";
import { API_ROUTES } from "@/lib/apiRoutes";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const res = await fetch(API_ROUTES.AUTH.VERIFY_MAGIC_CODE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
