import { NextRequest, NextResponse } from "next/server";
import Lamaran from "@/models/lamaranModels";
import { getServerSession } from "next-auth";
import { connectToDB } from "@/dbConfig/dbConfig";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession();
    console.log("session:", session);

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Temukan semua lamaran yang dibuat oleh pengguna yang sedang login
    const appliedJobs = await Lamaran.find({ email: session.user?.email });

    

    // Buat respons
    const formattedAppliedJobs = appliedJobs.map((lamaran) => ({
      jobTitle: lamaran.jobTitle,
      status: lamaran.status,
      appliedAt: lamaran.createdAt,
    }));

    console.log("appliedJobs:",formattedAppliedJobs);

    return NextResponse.json({ appliedJobs: formattedAppliedJobs });
  } catch (error) {
    console.error("Error fetching applied jobs:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
