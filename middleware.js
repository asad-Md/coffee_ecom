import { withAuth } from 'next-auth/middleware'
import { NextResponse } from "next/server";

export default withAuth({
  callbacks: {
    authorized: ({ token, req }) => {
      return !!token;
    },
  },
})

export const config = {
  matcher: [
    // '/cart/:path*',
    '/profile/:path*',
    '/api/protected/:path*'
  ]
}

/*
callbacks: {
    authorized: ({ token, req }) => {
      if (!token) {
        const url = new URL("/api/auth/signin", req.url);
        url.searchParams.set("callbackUrl", req.url); // Preserve redirect
        return NextResponse.redirect(url);
      }
      return true;
    },
  },
*/

/* 
callbacks: {
    authorized: ({ token }) => !!token
  },
*/