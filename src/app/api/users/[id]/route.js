
"use server";

import { NextResponse } from "next/server";
import DBConnection from "@/app/utils/config/db";
import UserModel from "@/app/utils/models/User";
import mongoose from "mongoose";

export async function GET(req, { params }) {
  try {
    await DBConnection();

    const { id } = params;

    // Validate the user ID
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: "Invalid or missing User ID" },
        { status: 400 }
      );
    }

    // Fetch user by ID and populate bookings
    const user = await UserModel.findById(id).populate("bookings");

    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    console.log("Updated User with Populated Bookings:", user);

    return NextResponse.json({ data: user });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
