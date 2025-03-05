import { NextResponse } from "next/server";

export async function GET(){
    try {
        const response = NextResponse.json({
            message: "login successful",
            success: true
        })
        //we are setting the cookie token empty, expiring it immediately
        response.cookies.set("token", "", {
            httpOnly: true,
            expires: new Date(0)
        });
        return response;
    } catch (error: any) {
        return NextResponse.json(
            {error: error.message}, 
            {status: 500}
        )
    }
}