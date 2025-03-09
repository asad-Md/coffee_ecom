import { NextResponse } from 'next/server';
import { PrismaClient } from "@prisma/client";

export async function GET() {
    const prisma = new PrismaClient();
    try {
        console.log('GET /api/products/fetch');        
        const products = await prisma.product.findMany();        
        // Return a proper NextResponse with the products data
        return NextResponse.json({ products }, { status: 200 });
    } catch (error) {
        console.error('Error fetching products:', error);
        return NextResponse.json(
            { error: 'Failed to fetch products' }, 
            { status: 500 }
        );
    } finally {
        // Close the Prisma client connection
        await prisma.$disconnect();
    }
}