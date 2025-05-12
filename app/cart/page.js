"use client";
import CartItems from "@/components/cart/cartItems";
import { useSession, signOut, signIn } from "next-auth/react";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Create a Loader2 component since it's not available
const Loader2 = ({ className }) => (
  <svg 
    className={`animate-spin ${className || 'h-4 w-4'}`} 
    xmlns="http://www.w3.org/2000/svg" 
    fill="none" 
    viewBox="0 0 24 24"
  >
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);

export default function Cart() {
  const router = useRouter();
  const { data: session, status, update } = useSession();
  const cartItems = session?.user.cart.cartItems;
  const [orderDialogOpen, setOrderDialogOpen] = useState(false);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [shippingAddress, setShippingAddress] = useState("");

  // Use user's address from profile if available
  useEffect(() => {
    if (session?.user) {
      const address = [];
      if (session.user.address) address.push(session.user.address);
      if (session.user.city) address.push(session.user.city);
      if (session.user.state) address.push(session.user.state);
      if (session.user.pinCode) address.push(session.user.pinCode);
      if (session.user.country) address.push(session.user.country);
      
      if (address.length > 0) {
        setShippingAddress(address.join(', '));
      }
    }
  }, [session]);

  // Early returns should come after hooks
  if (status === "unauthenticated") {
    return (
      <div className='flex flex-col sm:flex-row justify-center items-center min-h-[50vh] gap-4 sm:gap-24 px-4 py-8 sm:py-20'>
        <h1 className='text-xl sm:text-2xl p-2 font-bold text-center'>Sign in to view cart</h1>
        <button
          onClick={() => signIn()}
          className='px-4 py-2 bg-primary text-accent rounded h-fit hover:bg-accent hover:text-primary transition-all duration-300 ease-in-out w-full sm:w-auto'
        >
          Sign In
        </button>
      </div>
    );
  }
  if (status === "loading") {
    return (
      <div className='flex justify-center items-center min-h-[50vh] px-4 py-8 sm:py-20'>
        <div className='text-xl sm:text-2xl p-2 font-bold animate-pulse'>Loading...</div>
      </div>
    );
  }

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalPrice2 = totalPrice.toFixed(2);

  const handlePlaceOrder = async () => {
    if (!shippingAddress.trim()) {
      toast.error('Please enter a shipping address');
      return;
    }

    setIsPlacingOrder(true);
    try {
      const response = await fetch('/api/order/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          shippingAddress: shippingAddress,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create order');
      }

      const data = await response.json();
      toast.success('Order placed successfully!');
      setOrderDialogOpen(false);
      
      // Refresh session to update cart
      update();
      
      // Redirect to success page
      router.push(`/order/success?orderId=${data.order.id}`);
    } catch (error) {
      console.error('Error creating order:', error);
      toast.error(error.message || 'Failed to place order');
    } finally {
      setIsPlacingOrder(false);
    }
  };

  return (
    <div className='p-4 sm:p-8 min-h-screen'>
      <div className="flex flex-col sm:flex-row justify-between items-center my-4 sm:my-6 max-w-2xl mx-auto px-4 gap-2 sm:gap-0">
        <h1 className='text-2xl sm:text-4xl font-bold text-center text-foreground'>
          Your Bean Basket
        </h1>
        <p className="text-2xl sm:text-4xl font-bold text-center text-foreground">
          $ {totalPrice2}
        </p>
      </div>      
      <CartItems cartItems={cartItems} />

      {cartItems && cartItems.length > 0 ? (
        <div className="flex justify-center my-8">
          <button
            onClick={() => setOrderDialogOpen(true)}
            className="px-6 py-3 bg-accent text-primary font-semibold rounded-full hover:opacity-90 transition-all duration-300 ease-in-out"
          >
            Place Order
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center my-8">
          <p className="text-lg text-foreground opacity-80 mb-4">Your cart is empty</p>
          <Link href="/catalogue">
            <button className="px-6 py-3 bg-accent text-primary font-semibold rounded-full hover:opacity-90 transition-all duration-300 ease-in-out">
              Browse Products
            </button>
          </Link>
        </div>
      )}

      <AlertDialog open={orderDialogOpen} onOpenChange={setOrderDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Your Order</AlertDialogTitle>
          </AlertDialogHeader>
          
          <div className="my-4">
            <h3 className="font-medium mb-2 text-primary">Order Summary:</h3>
            <p className="text-sm mb-1 text-primary/80">Items: {cartItems?.length || 0}</p>
            <p className="text-sm mb-1 text-primary/80">Total: ${totalPrice2}</p>

            <div className="mt-4">
              <label htmlFor="shipping-address" className="block text-sm font-medium mb-1 text-primary">
                Shipping Address
              </label>
              <textarea
                id="shipping-address"
                rows={3}
                value={shippingAddress}
                onChange={(e) => setShippingAddress(e.target.value)}
                placeholder="Enter your complete shipping address"
                className="w-full p-2 border border-primary/30 rounded-md text-sm bg-foreground text-primary"
              />
              <p className="text-xs mt-1 text-primary/70">
                Want to update your address? <Link href="/profile" className="text-accent hover:underline">Edit profile</Link>
              </p>
            </div>
          </div>
          
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handlePlaceOrder}
              disabled={isPlacingOrder || !shippingAddress.trim()}
            >
              {isPlacingOrder ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                "Confirm Order"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
