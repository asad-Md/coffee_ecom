import { NextResponse } from 'next/server';
import { PrismaClient } from "@prisma/client";

export async function GET() {
    try {
        console.log('GET /api/products/fetch');
        const prisma = new PrismaClient();
        const products = await prisma.product.findMany();
        console.log('Products:', products);
        
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