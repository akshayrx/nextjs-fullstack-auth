import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest){
    try {
        //take data from client form fields
        const reqBody = await request.json()
        //extract data from json and save it into consts to use here
        const {email, password} = reqBody
        console.log(reqBody);

        //check if the user exists
        //database calls are always awaited
        const user = await User.findOne({email})
        //if user is not found in database
        if(!user){
            return NextResponse.json({error: "user does not exist"}, {status: 400})
        }
        //when the user exists, we check password
        //comparing password field saved in db with user input password field
        //(password coming from reqBody, password that is stored in user const we checked with findOne)
        //user.password -> means in databse we have user table password field
        const validPassword = await bcryptjs.compare(password, user.password)
        //if password is not valid, doesn't match with our records
        if(!validPassword){
            // console.log("invalid password");
            return NextResponse.json(
                {error: "password invalid"},
                {status: 400}
            )
        }
        //create data for token to store in user's device cookies
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }
        //now create token
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: "1d"})
        //now send confirmation of login to user
        const response = NextResponse.json({
            message: "login successful",
            success: true
        })
        //send token to cookies on user device
        response.cookies.set("token", token, {
            httpOnly: true,
            // path: "/"
        })
        return response;
        
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}