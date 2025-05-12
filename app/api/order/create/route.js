import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import prisma from '@/lib/prisma';

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { shippingAddress } = await req.json();

    if (!shippingAddress) {
      return NextResponse.json({ error: 'Shipping address is required' }, { status: 400 });
    }

    // Get user's cart with items
    const cart = await prisma.cart.findUnique({
      where: { userId: session.user.id },
      include: { 
        cartItems: {
          include: {
            product: true
          }
        }
      }
    });

    if (!cart || cart.cartItems.length === 0) {
      return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });
    }

    // Calculate total price
    const total = cart.cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    // Create new order - ensure we only use fields that exist in the schema
    const order = await prisma.order.create({
      data: {
        userId: session.user.id,
        total,
        shippingAddress,
        status: 'PENDING',
        paymentStatus: 'PENDING',
        // Create order items directly from cart items
        orderItems: {
          create: cart.cartItems.map(item => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
            // Remove any fields that might not exist in your schema
          }))
        }
      },
      // Include created order items in the response
      include: {
        orderItems: true
      }
    });

    // Clear cart after creating order
    await prisma.cartitem.deleteMany({
      where: {
        cartId: cart.id
      }
    });

    return NextResponse.json({ 
      success: true, 
      order: {
        id: order.id,
        total: order.total,
        status: order.status,
        paymentStatus: order.paymentStatus,
        createdAt: order.createdAt,
        itemCount: order.orderItems.length
      }
    });
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json({ 
      error: error.message || 'Failed to create order',
      code: error.code
    }, { status: 500 });
  }
}
