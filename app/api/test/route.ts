import { NextResponse } from "next/server";

export async function GET() {
    try {
        // supabase connect

        return NextResponse.json({ message: "Database successfully connected" });
    } catch (error) {
        console.log("Database connection error", error);

        // Narrowing down the type of error
        let errorMessage = 'Unknown error'
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        return NextResponse.json({
            message: "Database connection failed!",
            error: errorMessage
        }, {status: 500})
    }
}