import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  const isPublicPath = path === "/login" || path === "/register" || path === "/"

  // Get the token from the cookies
  const token = request.cookies.get("token")?.value || ""

  // Get the user role from the token or cookies
  // In a real app, you would decode the JWT token to get the role
  const userRole = request.cookies.get("userRole")?.value || ""

  // Redirect logic based on authentication status
  if (isPublicPath && token) {
    // If user is logged in and tries to access public path, redirect to dashboard
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  if (!isPublicPath && !token) {
    // If user is not logged in and tries to access protected path, redirect to login
    return NextResponse.redirect(new URL("/login", request.url))
  }

  // Role-based access control
  if (token) {
    // Admin routes
    if (path.startsWith("/admin") && userRole !== "admin") {
      return NextResponse.redirect(new URL("/dashboard", request.url))
    }

    // Organizer routes
    if (path.startsWith("/organizer") && userRole !== "organizer" && userRole !== "admin") {
      return NextResponse.redirect(new URL("/dashboard", request.url))
    }

    // Vendor routes
    if (path.startsWith("/vendor") && userRole !== "vendor" && userRole !== "admin") {
      return NextResponse.redirect(new URL("/dashboard", request.url))
    }
  }

  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/", "/login", "/register", "/dashboard/:path*", "/admin/:path*", "/organizer/:path*", "/vendor/:path*"],
}
