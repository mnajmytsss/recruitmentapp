"use server";

import { connectToDB } from "@/dbConfig/dbConfig";
import Pekerjaan from "@/models/pekerjaanModels";
import { NextRequest, NextResponse } from "next/server";

connectToDB();

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const pekerjaan = await Pekerjaan.findById(id);
    if (!id) {
      return NextResponse.json(
        { message: "Job ID is required" },
        { status: 400 }
      );
    }
  
    if (!pekerjaan) {
      return NextResponse.json({ message: "Job not found" }, { status: 404 });
    }
    try {
      const pekerjaan = await Pekerjaan.findById(id);
      return NextResponse.json(pekerjaan);
    } catch (error) {
      console.error("Error fetching job posting:", error);
      return NextResponse.json(
        { message: "Internal server error" },
        { status: 500 }
      );
    }
  }