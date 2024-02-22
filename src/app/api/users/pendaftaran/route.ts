"use server";

import bcryptjs from "bcryptjs";
import { connectToDB } from "@/dbConfig/dbConfig";
import User from "@/models/userModels";
import { NextRequest, NextResponse } from "next/server";

connectToDB();

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const reqBody = await req.json();
    const {
      name,
      email,
      password,
      pendidikan,
      pengalamanKerja,
      cv,
      suratLamaran,
      userPhoto,
    } = reqBody;

    console.log(name, email, password);

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "Name, email and password are required" },
        { status: 400 }
      );
    }
    const hashedPassword = await bcryptjs.hash(password, 10);
    console.log(password);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      pendidikan,
      pengalamanKerja,
      cv,
      suratLamaran,
      userPhoto,
    });

    await newUser.save();

    return NextResponse.json(
      { message: "User created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}


