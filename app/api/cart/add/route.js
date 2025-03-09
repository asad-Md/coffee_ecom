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
    console.log('Updating cart:', { productId, quantity, price });

    if (!productId || !quantity) {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }

    // Verify product exists
    const product = await prisma.product.findUnique({
      where: { id: productId }
    });


    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
    
    // Get user's cart
    let cart = await prisma.cart.findUnique({
      where: { userId: session.user.id },
      include: { cartItems: true }
    });
    if (!cart) {

      return NextResponse.json({ error: 'Cart not found' }, { status: 404 });
    }

    // Check if item exists in cart
    const existingItem = cart.cartItems.find(item => item.productId === productId);

    if (existingItem) {
      const newQuantity = existingItem.quantity + quantity;

      if (newQuantity <= 0) {
        // Remove item if quantity is 0 or less
        await prisma.cartitem.delete({
          where: { id: existingItem.id }
        });

        return NextResponse.json({ message: 'Item removed from cart' });
      }

      // Ensure stock isn't exceeded
      if (newQuantity > product.inventory) {
        return NextResponse.json({ error: 'Not enough stock available' }, { status: 400 });
      }

      // Update existing cart item
      const updatedItem = await prisma.cartitem.update({
        where: { id: existingItem.id },
        data: { quantity: newQuantity, updatedAt: new Date() }
      });

      return NextResponse.json(updatedItem);
    }

    // If quantity is negative but item doesn't exist in cart
    if (quantity < 0) {
      return NextResponse.json({ error: 'Cannot reduce quantity below 0' }, { status: 400 });
    }

    // Add new cart item if increasing quantity
    const newItem = await prisma.cartitem.create({
      data: { cartId: cart.id, productId, quantity, price }
    });

    return NextResponse.json(newItem);
  } catch (error) {
    console.error('Error updating cart:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}


// export async function POST(req) {
//   try {
//     console.log('POST /api/cart/add');
//     const session = await getServerSession(authOptions);
    
//     if (!session?.user?.id) {
//       return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
//     }

//     const { productId, quantity, price } = await req.json();
//     console.log('Adding to cart:', { productId, quantity, price });
//     // Verify the product exists and has sufficient inventory
//     const product = await prisma.product.findUnique({
//       where: { id: productId }
//     });
//     console.log('Product Found:', product);
//     if (!product) {
//       return NextResponse.json({ error: 'Product not found' }, { status: 404 });
//     }

//     if (product.inventory < quantity) {
//       return NextResponse.json({ error: 'Insufficient inventory' }, { status: 400 });
//     }
    
//     // Get user's cart
//     const cart = await prisma.cart.findUnique({
//       where: { userId: session.user.id },
//       include: { cartItems: true }
//     });
//     console.log('Cart Found:', cart);
//     if (!cart) {
//       return NextResponse.json({ error: 'Cart not found' }, { status: 404 });
//     }
    
//     // Check if item already exists in cart
//     const existingItem = cart.cartItems.find(item => item.productId === productId);
//     console.log('Existing Item:', existingItem);
//     if (existingItem) {
//       // Update existing cart item
//       const updatedItem = await prisma.cartitem.update({
//         where: { id: existingItem.id },
//         data: {
//           quantity: existingItem.quantity + quantity,
//           price: price,
//           updatedAt: new Date()
//         }
//       });
//       console.log('session cart: ', session.user.cart.cartItems);
//       return NextResponse.json(updatedItem);
//     }
    
//     // Add new cart item
//     const newItem = await prisma.cartitem.create({
//       data: {
//         cartId: cart.id,
//         productId,
//         quantity,
//         price,
//       }
//     });
//     console.log('New Item:', newItem);
//     return NextResponse.json(newItem);
//   } catch (error) {
//     console.error('Error adding to cart:', error);
//     return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
//   }
// }