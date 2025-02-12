// app/api/cart/add/route.js
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import prisma from '@/lib/prisma';

export async function POST(req) {
  try {
    console.log('POST /api/cart/add');
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { productId, quantity, price } = await req.json();
    console.log('Adding to cart:', { productId, quantity, price });
    // Verify the product exists and has sufficient inventory
    const product = await prisma.product.findUnique({
      where: { id: productId }
    });
    console.log('Product Found:', product);
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    if (product.inventory < quantity) {
      return NextResponse.json({ error: 'Insufficient inventory' }, { status: 400 });
    }
    
    // Get user's cart
    const cart = await prisma.cart.findUnique({
      where: { userId: session.user.id },
      include: { cartItems: true }
    });
    console.log('Cart Found:', cart);
    if (!cart) {
      return NextResponse.json({ error: 'Cart not found' }, { status: 404 });
    }
    
    // Check if item already exists in cart
    const existingItem = cart.cartItems.find(item => item.productId === productId);
    console.log('Existing Item:', existingItem);
    if (existingItem) {
      // Update existing cart item
      const updatedItem = await prisma.cartitem.update({
        where: { id: existingItem.id },
        data: {
          quantity: existingItem.quantity + quantity,
          price: price,
          updatedAt: new Date()
        }
      });
      console.log('session cart: ', session.user.cart.cartItems);
      return NextResponse.json(updatedItem);
    }
    
    // Add new cart item
    const newItem = await prisma.cartitem.create({
      data: {
        cartId: cart.id,
        productId,
        quantity,
        price,
      }
    });
    console.log('New Item:', newItem);
    return NextResponse.json(newItem);
  } catch (error) {
    console.error('Error adding to cart:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}