// import { connect } from "@/dbConfig/dbConfig";
// import { NextRequest, NextResponse } from "next/server";
// import User from "@/models/userModel";

// connect()

// export async function POST(request: NextRequest){
//     try {
//         const reqBody = await request.json()
//         const {token} = reqBody
//         console.log(token);

//         //find user with this exact token, expiry is greater than now time
//         const user = await User.findOne({
//             verifyToken: token,
//             verifyTokenExpiry: {$gt: Date.now()}
//         })

//         if(!user){
//             return NextResponse.json({error: "Invalid token"}, {status: 400});
//         }
        
//         console.log(user);
//         //now that user has token and we have fetched user details in previous db call
//         //let us update these values as well, verify user, and delete token
//         user.isVerified = true;
//         user.verifyToken = undefined;
//         user.verifyTokenExpiry = undefined;
//         //save these values in database
//         await user.save();

//         return NextResponse.json({
//             message: "Email verified successfully",
//             status: true
//         })
        
//     } catch (error: any) {
//         return NextResponse.json({error: error.message}, {status: 500});
//     }
// }

//above code is also correct, just this below one contains more logs in each step to debug

import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { token } = reqBody;
    console.log("Received token:", token);

    // Debug: Check all users in the collection
    const allUsers = await User.find({});
    console.log("All users in collection:", allUsers);

    // Debug: Check current time vs expiry
    console.log("Current time:", Date.now());
    console.log("Querying with token:", token);

    const user = await User.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() },
    });

    console.log("User found:", user);
    if (!user) {
      console.log("No user found with token:", token);
      return NextResponse.json({ error: "Invalid token" }, { status: 400 });
    }

    console.log("User details:", user);
    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;
    await user.save();

    return NextResponse.json({
      message: "Email verified successfully",
      status: true,
    });
  } catch (error: any) {
    console.log("Error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}