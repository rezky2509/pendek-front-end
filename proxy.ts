// THIS IS THE MIDDLEWARE
// https://nextjs.org/docs/app/api-reference/file-conventions/proxy

// Middleware for token verification
// Must be store within the main folder 
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isTokenValid } from "./app/services/api";

export async function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl
    const token = request.cookies.get('token')?.value

    // Public route definition
    const isPublicRoute = pathname == '/login' || pathname == '/' || pathname == '/register'


    // Checking Token Validity
    if (token) {
        const tokenIsValid = await isTokenValid()

        // If token is invalid
        if (!tokenIsValid) {
            console.log(`Token is invalid`)
            const response = NextResponse.redirect(new URL('/login', request.url))
            response.cookies.delete('token')
            return response
        }
        console.log(`The public route ${isPublicRoute}`)
        console.log(`The pathname is ${pathname}`)

        if (isPublicRoute) {
            // return NextResponse.redirect(new URL('/dashboard', request.url))
            // clone the current url
            const url = request.nextUrl.clone()
            url.pathname = '/dashboard' 
            
            return NextResponse.redirect(url)
        }
    }  
    // If token does not exist
    if (!token)
    {
        // If the route they accessing is public
        if(isPublicRoute){
            // Redirect to the public route
           return NextResponse.next() 
        }
        // If the rouet is not public
        // redirect to the login page
        return NextResponse.redirect(new URL('/login', request.url))
    }
    // if token is valid, let them go to the route
    return NextResponse.next()
}

// These are the route that will run the middleware when access
// These are the protected route
export const config = {
    matcher: [
        '/dashboard', 
        '/lists',
        '/statistics'
    ]
}
