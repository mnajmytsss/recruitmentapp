
import User from "@/models/userModels";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
    console.log(req);
    try {
      const { searchParams } = new URL(req.url);
      const id = searchParams.get("id");
      const userDataToUpdate = await req.json();
  
      const updateUser = await User.findOneAndUpdate(
        { _id: id },
        userDataToUpdate,
        { new: true }
      );
  
      if (!updateUser) {
        return NextResponse.json({ message: "User not found" }, { status: 404 });
      }
  
      return NextResponse.json(
        { message: "User updated successfully" },
        { status: 200 }
      );
    } catch (error) {
      console.error("Error updating user:", error);
      return NextResponse.json(
        { message: "Internal server error" },
        { status: 500 }
      );
    }
  }