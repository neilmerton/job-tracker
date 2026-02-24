import { NextResponse, type NextRequest } from "next/server";
import { createOrReplaceInstance } from "@/lib/repositories";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);

  if (!body) {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 },
    );
  }

  const { name, email, secret } = body as {
    name?: unknown;
    email?: unknown;
    secret?: unknown;
  };

  if (
    typeof name !== "string" ||
    typeof email !== "string" ||
    typeof secret !== "string" ||
    !name.trim() ||
    !email.trim() ||
    !secret.trim()
  ) {
    return NextResponse.json(
      { error: "Name, email, and secret are required." },
      { status: 400 },
    );
  }

  const instance = await createOrReplaceInstance({
    name: name.trim(),
    email: email.trim(),
    secret: secret.trim(),
  });

  return NextResponse.json({ instance });
}

