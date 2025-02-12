"use client";
import CartItems from "@/components/cart/cartItems";
import { useSession, signOut, signIn } from "next-auth/react";
// import Image from "next/image";
// import { redirect } from "next/navigation";

export default function Cart() {
  const { data: session, status } = useSession();

  const cartItems = session?.user.cart.cartItems;
  console.log("Cart Items:", cartItems);

  if (status === "unauthenticated") {
    return (
      <div className='flex justify-center mt-20 min-h-96 gap-24  mb-8'>
        <h1 className='text-2xl p-2 font-bold'>Sign in to view cart</h1>
        <button
          onClick={() => {
            signIn();
          }}
          className='px-4 py-2 bg-primary text-accent rounded h-fit hover:bg-accent hover:text-primary transition-all duration-300 ease-in-out '
        >
          Sign In
        </button>
      </div>
    );
  }

  if (status === "loading") {
    return (
      <div className='flex justify-center mt-20 min-h-96 gap-24  mb-8'>
        <div className='min-h-96 text-2xl p-2 font-bold '>Loading...</div>
      </div>
    );
  }

  

  return (
    <div className='p-8 min-h-screen'>
      {/* <div className='flex justify-between items-center mb-8'>
        <h1 className='text-2xl font-bold'>{session?.user?.name}'s Cart</h1>
      </div> */}
      <CartItems cartItems={cartItems} />
    </div>
  );
}
