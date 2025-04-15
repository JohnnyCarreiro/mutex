import { NextResponse } from "next/server";

export async function POST(request: Request): Promise<NextResponse> {
  const options = await request.json();

  return NextResponse.json({ hello: "World", options });
}
