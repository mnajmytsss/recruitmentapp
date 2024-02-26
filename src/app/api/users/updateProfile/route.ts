import { NextRequest, NextResponse } from "next/server";
import UserAccount from "@/models/userAccountModels";

export async function PUT(req: NextRequest, res: NextResponse) {
  if (req.method !== "PUT") {
    return NextResponse.json(
      { message: "Method not allowed" },
      { status: 405 }
    );
  }

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  const reqBody = await req.json();

  try {
    const updatedUser = await UserAccount.findByIdAndUpdate(id, reqBody, {
      new: true,
    });

    if (!updatedUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
