import { NextResponse, type NextRequest } from "next/server";
import { validateInstanceSecret } from "@/lib/repositories";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);

  if (!body || typeof body.secret !== "string" || body.secret.trim() === "") {
    return NextResponse.json(
      { error: "Secret is required." },
      { status: 400 },
    );
  }

  const instance = await validateInstanceSecret(body.secret.trim());

  if (!instance) {
    return NextResponse.json(
      { error: "Invalid secret." },
      { status: 401 },
    );
  }

  return NextResponse.json({ instance });
}

