"use server";

import { connectToDB } from "@/dbConfig/dbConfig";
import Pekerjaan from "@/models/pekerjaanModels";
import { NextRequest, NextResponse } from "next/server";

connectToDB();

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const { pekerjaan, deskripsi, kualifikasi, tanggungJawab, manfaat } =
      reqBody;

    if (!pekerjaan || !deskripsi || !kualifikasi || !tanggungJawab || !manfaat) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    const newPekerjaan = new Pekerjaan({
      pekerjaan,
      deskripsi,
      kualifikasi,
      tanggungJawab,
      manfaat,
    });

    await newPekerjaan.save();

    return NextResponse.json(
      { message: "Job posting created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating job posting:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
