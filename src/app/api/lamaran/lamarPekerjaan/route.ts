import { NextRequest, NextResponse } from "next/server";
import Pekerjaan from "@/models/pekerjaanModels";
import Lamaran from "@/models/lamaranModels";
import UserAccount from "@/models/userAccountModels";

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    console.log("Request Body:", reqBody); 

    const { email, jobId, jobTitle } = reqBody;

    const pekerjaan = await Pekerjaan.findById(jobId);
    if (!pekerjaan) {
      console.error("Error: Job not found");
      return NextResponse.json({ message: "Job not found" }, { status: 404 });
    }

    const user = await UserAccount.findOne({ email });
    if (!user) {
      console.error("Error: User not found");
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const existingApplication = await Lamaran.findOne({ email, jobId });
    if (existingApplication) {
      console.error("Error: User has already applied for this job");
      return NextResponse.json(
        { message: "User has already applied for this job" },
        { status: 400 }
      );
    }

    const lamaran = new Lamaran({
      email: user.email,
      jobId: jobId,
      jobTitle: jobTitle,
      status: "pending",
    });

    await lamaran.save();

    console.log("Success: Job applied successfully");
    return NextResponse.json({ message: "Job applied successfully" });
  } catch (error) {
    console.error("Error applying for job:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

