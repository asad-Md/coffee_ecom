"use client";
import CartItems from "@/components/cart/cartItems";
import { useSession, signOut, signIn } from "next-auth/react";

export default function Cart() {
  const { data: session, status } = useSession();
  const cartItems = session?.user.cart.cartItems;

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
    </div>
  );
}

// "use client";
// import CartItems from "@/components/cart/cartItems";
// import { useSession, signOut, signIn } from "next-auth/react";
// // import Image from "next/image";
// // import { redirect } from "next/navigation";

// export default function Cart() {
//   const { data: session, status } = useSession();

//   const cartItems = session?.user.cart.cartItems;
//   var totalPrice = 0;
  

//   if (status === "unauthenticated") {
//     return (
//       <div className='flex justify-center mt-20 min-h-96 gap-24  mb-8'>
//         <h1 className='text-2xl p-2 font-bold'>Sign in to view cart</h1>
//         <button
//           onClick={() => {
//             signIn();
//           }}
//           className='px-4 py-2 bg-primary text-accent rounded h-fit hover:bg-accent hover:text-primary transition-all duration-300 ease-in-out '
//         >
//           Sign In
//         </button>
//       </div>
//     );
//   }

//   if (status === "loading") {
//     return (
//       <div className='flex justify-center mt-20 min-h-96 gap-24  mb-8'>
//         <div className='min-h-96 text-2xl p-2 font-bold '>Loading...</div>
//       </div>
//     );
//   }

//   var totalPrice=0;
//   cartItems.map((item)=>{
//     totalPrice+=item.price*item.quantity;
//   })
//   const totalPrice2 = totalPrice.toFixed(2);
  
//   return (
//     <div className='p-8 min-h-screen'>
//       {/* <div className='flex justify-between items-center mb-8'>
//         <h1 className='text-2xl font-bold'>{session?.user?.name}'s Cart</h1>
//       </div> */}
//       <div className="flex justify-between my-6 max-w-2xl mx-auto px-4" >
//         <h1 className='text-4xl font-bold text-center text-foreground'>
//         Your Bean Basket
//         </h1>
//         <p className="text-4xl font-bold text-center  text-foreground">$ {totalPrice2}</p>
//       </div>

//       <CartItems cartItems={cartItems} />
//     </div>
//   );
// }
