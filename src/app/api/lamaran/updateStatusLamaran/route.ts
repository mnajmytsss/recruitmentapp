"use server";

import { connectToDB } from "@/dbConfig/dbConfig";
import Lamaran from "@/models/lamaranModels";
import { NextRequest, NextResponse } from "next/server";

connectToDB();

export async function PUT(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const { status } = await req.json();

    if (!id || status === undefined) {
      return NextResponse.json(
        { message: "Lamaran ID and status are required" },
        { status: 400 }
      );
    }

    const updateResult = await Lamaran.updateOne(
      { _id: id },
      { $set: { status: status } }
    );

    if (updateResult.matchedCount === 0) {
      return NextResponse.json({ message: "Lamaran not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Lamaran status updated successfully" });
  } catch (error) {
    console.error("Error updating job status:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
