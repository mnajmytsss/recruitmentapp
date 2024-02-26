import { NextRequest, NextResponse } from "next/server";
import UserAccount from "@/models/userAccountModels";

export async function GET(req: NextRequest, res: NextResponse) {
  if (req.method !== "GET") {
    return NextResponse.json({ message: "Method not allowed" }, { status: 405 });
  }

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  try {
    const user = await UserAccount.findById(id);

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.error("Error getting user:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
