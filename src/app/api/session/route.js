import { NextResponse } from "next/server";
import { auth } from "../../../auth";
export async function GET() {
    const session = await auth();
    const email=session?.email
    return NextResponse.json({email})
}