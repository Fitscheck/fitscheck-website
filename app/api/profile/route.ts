import { NextRequest, NextResponse } from "next/server";
import { API_ROUTES } from "@/lib/apiRoutes";

export async function GET(req: NextRequest) {
  const token = req.headers.get("Authorization");
  const userId = req.headers.get("X-User-Id");

  console.log("🔍 API HIT: /api/profile");
  console.log("→ token:", token);
  console.log("→ userId:", userId);

  if (!userId) {
    console.log("❌ Missing user ID");
    return NextResponse.json({ message: "Missing user ID" }, { status: 400 });
  }

  const url = API_ROUTES.USERS.GET_PROFILE(userId);
  console.log("🛰️ Calling backend:", url);

  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    console.error("🚨 Proxy error:", error);
    return NextResponse.json({ message: "Error fetching profile" }, { status: 500 });
  }
}
