import { NextResponse, type NextRequest } from "next/server";
import {
  deleteInstanceCompletely,
  validateInstanceSecret,
} from "@/lib/repositories";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);

  if (!body || typeof body.secret !== "string" || body.secret.trim() === "") {
    return NextResponse.json(
      { error: "Secret is required to delete the instance." },
      { status: 400 },
    );
  }

  const secret = body.secret.trim();

  const instance = await validateInstanceSecret(secret);
  if (!instance) {
    return NextResponse.json(
      { error: "Secret did not match the current instance." },
      { status: 401 },
    );
  }

  await deleteInstanceCompletely();

  return NextResponse.json({ success: true });
}

