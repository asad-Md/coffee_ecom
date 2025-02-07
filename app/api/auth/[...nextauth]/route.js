import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/prisma";

const handler = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    async redirect({ url, baseUrl }) {
      // console.log("redirect", url, baseUrl);
      return url.startsWith(baseUrl) ? url : baseUrl;
    },
    session: async ({ session, user }) => {
      console.log("session", session, user);
      if (session?.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin", // Redirect to custom sign-in page
  },
});

export { handler as GET, handler as POST };

/*
{
  "user": {
    "id": "12345",
    "name": "John Doe",
    "email": "johndoe@gmail.com",
    "image": "https://lh3.googleusercontent.com/..."
  },
  "expires": "2025-02-07T10:00:00.000Z"
}
  */

/*
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/prisma";

const handler = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    async redirect({ url, baseUrl }) {
      // If url starts with baseUrl, return as is
      if (url.startsWith(baseUrl)) return url;
      
      // If url is just a path, prepend baseUrl
      if (url.startsWith('/')) return `${baseUrl}${url}`;
      
      // Default to the callback URL specified in signIn
      return '/';
    },
    session: async ({ session, user }) => {
      console.log("session", session, user);
      if (session?.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };

/*
{
  "user": {
    "id": "12345",
    "name": "John Doe",
    "email": "johndoe@gmail.com",
    "image": "https://lh3.googleusercontent.com/..."
  },
  "expires": "2025-02-07T10:00:00.000Z"
}
  */
