"use server";
import DBConnection from '@/app/utils/config/db';
import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import UserModel from '@/app/utils/models/User';
import bookingModel from '@/app/utils/models/Booking';

export async function POST(req) {
    await DBConnection();

    try {
        // Authenticate the user session
        const session = await auth();
        if (!session?.email) {
            return NextResponse.json(
                { message: "Unauthorized access" },
                { status: 401 }
            );
        }

        // Fetch the user
        const user = await UserModel.findOne({ email: session.email });
        if (!user) {
            return NextResponse.json(
                { message: "User not found" },
                { status: 404 }
            );
        }

        // Parse incoming JSON data
        const orderData = await req.json();
        const { _id, ...dataWithoutId } = orderData;

        // Validate required fields
        // const requiredFields = ["email", "title", "price"];
        // const missingFields = requiredFields.filter((field) => !dataWithoutId[field]);
        // if (missingFields.length > 0) {
        //     return NextResponse.json(
        //         { message: `Missing required fields: ${missingFields.join(", ")}` },
        //         { status: 400 }
        //     );
        // }

        // Create a new booking
        const order = await bookingModel.create(dataWithoutId);

        // Update the user's bookings array
        await UserModel.findByIdAndUpdate(
            user._id,
            { $push: { bookings: order._id } },
            { new: true }
        );

        const updatedUser = await UserModel.findById(user._id).populate("bookings");
        console.log("Updated User with Populated Bookings:", updatedUser);
        
        // Return success response
        return NextResponse.json({
            message: "Order saved successfully",
            order,
            success: true,
        });
    } catch (error) {
        console.error("Error processing order:", error);
        return NextResponse.json(
            { message: "Failed to save order", error: error.message },
            { status: 500 }
        );
    }
}
