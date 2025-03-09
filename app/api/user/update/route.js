import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PUT(request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { message: "You must be logged in." },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { phone, address, country, city, state, pinCode, alternateNumber } = body;

    const updatedUser = await prisma.user.update({
      where: {
        email: session.user.email,
      },
      data: {
        phone,
        address,
        country,
        city,
        state,
        pinCode,
        alternateNumber,
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

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("Profile update error:", error);
    return NextResponse.json(
      { message: "Error updating profile" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
