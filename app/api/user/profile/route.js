import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { message: "You must be logged in." },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        phone: true,
        address: true,
        country: true,
        city: true,
        state: true,
        pinCode: true,
        alternateNumber: true,
        preferredLanguage: true
      },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    // Updated error logging to safely handle null errors
    console.error("Profile fetch error:", error?.message || error || "Unknown error");
    return NextResponse.json(
      { message: "Error fetching profile" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
