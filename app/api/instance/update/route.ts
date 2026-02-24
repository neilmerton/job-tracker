import { NextResponse, type NextRequest } from "next/server";
import { getInstance, updateInstance } from "@/lib/repositories";

export async function POST(request: NextRequest) {
  const existing = await getInstance();
  if (!existing) {
    return NextResponse.json(
      { error: "No instance found to update." },
      { status: 404 },
    );
  }

  const body = await request.json().catch(() => null);

  if (!body) {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 },
    );
  }

  const { name, email } = body as {
    name?: unknown;
    email?: unknown;
  };

  if (
    typeof name !== "string" ||
    typeof email !== "string" ||
    !name.trim() ||
    !email.trim()
  ) {
    return NextResponse.json(
      { error: "Name and email are required." },
      { status: 400 },
    );
  }

  const instance = await updateInstance({
    name: name.trim(),
    email: email.trim(),
  });

  return NextResponse.json({ instance });
}

