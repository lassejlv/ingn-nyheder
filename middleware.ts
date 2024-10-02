import { NextRequest, NextResponse } from "next/server"



export function middleware(request: NextRequest) {

  // Basic auth
  const { ip } = request;

  console.log("middleware")

  console.log(ip)


}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/admin/:path*',
}
