"use server";

import { connectToDB } from "@/dbConfig/dbConfig";
import Pekerjaan from "@/models/pekerjaanModels";
import { NextRequest, NextResponse } from "next/server";

connectToDB();

export async function GET() {
  try {
    const pekerjaan = await Pekerjaan.find();
    return NextResponse.json(pekerjaan);
  } catch (error) {
    console.error("Error fetching job postings:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}