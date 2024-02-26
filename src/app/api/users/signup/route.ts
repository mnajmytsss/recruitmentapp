
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import UserAccount from "@/models/userAccountModels";
import { connectToDB } from "@/dbConfig/dbConfig";

connectToDB();

export async function POST(req: NextRequest) {
  const reqBody = await req.json();
  const { name, email, password, picture, biodata } = reqBody;

  try {
    const existingUser = await UserAccount.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: "User already exists"}, {status: 409 });
    }
    if (!password) {
      return NextResponse.json({ message: "Password is required"}, {status: 400 });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    // Creating an empty biodata object if not provided
    const defaultBiodata = {
      bio: "",
      alamat: "",
      pendidikan: "",
      pengalamanKerja: "",
      cv: "",
      suratLamaran: "",
      portfolio: "",
    };

    const newUser = new UserAccount({
      name,
      email,
      password: hashedPassword,
      picture,
      biodata: defaultBiodata, 
    });
    await newUser.save();

    return NextResponse.json({ message: "User created successfully"}, { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
