import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
//learn more about this https://nextjs.org/docs/app/building-your-application/routing/middleware#example

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    //understanding what is the path and save it
    const path = request.nextUrl.pathname
    //check if that path is public access
    const isPublicPath = path === "/login" || path === "/signup" || path === "/verifyemail"
    //check if token exists and if yes then get its values
    //following line means we creat a const token set its value to if token exist then get value, else empty
    const token = request.cookies.get("token")?.value || ""
    //if user is trying to access public path && is already login (checked by token existence)
    // then redirect to home or whatever path
    if(isPublicPath && token) {
        return NextResponse.redirect(new URL("/", request.nextUrl));
    }
    //trying to access private path and not login, then redirect to login
    if(!isPublicPath && !token) {
        return NextResponse.redirect(new URL("/login", request.nextUrl));
    }

}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/",
    "/login",
    "/signup",
    "/profile/:path*",
    "/verifyemail"
  ]
}