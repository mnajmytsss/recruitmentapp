"use server";

import { connectToDB } from "@/dbConfig/dbConfig";
import Pekerjaan from "@/models/pekerjaanModels";
import { NextRequest, NextResponse } from "next/server";

connectToDB();

export async function DELETE(req: NextRequest) {
    try {
      const { searchParams } = new URL(req.url);
      const id = searchParams.get("id");
      if (!id) {
        return NextResponse.json(
          { message: "Job ID is required" },
          { status: 400 }
        );
      }
  
      const deleteResult = await Pekerjaan.deleteOne({ _id: id });
  
      if (deleteResult.deletedCount === 0) {
        return NextResponse.json({ message: "Job not found" }, { status: 404 });
      }
  
      return NextResponse.json({ message: "Job posting deleted successfully" });
    } catch (error) {
      console.error("Error deleting job posting:", error);
      return NextResponse.json(
        { message: "Internal server error" },
        { status: 500 }
      );
    }
  }