import { NextResponse } from "next/server";
import { auth } from "../../../auth";

export async function GET() {
    const session = await auth();
    if (!session) {
        return NextResponse.json({ success: false });
    } else {
        return NextResponse.json({ success: true });
    }
}
