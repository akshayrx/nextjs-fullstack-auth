import { NextRequest } from "next/server";
import jwt from "jsonwebtoken"

export const getDataFromToken = (request: NextRequest) => {
    try {
        //check if token exists and save its value or keep empty
        const token = request.cookies.get("token")?.value || "";
        //jwt verifie the token, and also extracts the value from it
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET!) as { id: string };
        //we can return entire object also 'decodedToken' or any specific key from it like id here
        //we are getting this from login route, we saved user info into token when user login
        
        return decodedToken.id;

    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error(error.message);
        } else {
            throw new Error(String(error));
        }
    }
}