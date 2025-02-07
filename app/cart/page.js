"use client";
import { useSession, signOut, signIn } from "next-auth/react";
// import { redirect } from "next/navigation";

export default function Cart() {
  const { data: session, status } = useSession();
  
  if (status === "unauthenticated") {
    return (
      <div className='flex justify-center mt-20 min-h-96 gap-24  mb-8'>
        <h1 className='text-2xl font-bold'>Sign in to view cart</h1>
        <button
          onClick={() => {
            signIn();
          }}
          className='px-4 py-2 bg-red-500 text-white rounded h-fit hover:bg-red-600'
        >
          Sign In
        </button>
      </div>
    );
  }

  if (status === "loading") {
    return <div className="min-h-96" >Loading...</div>;
  }

  return (
    <div className='p-8 min-h-screen'>
      <div className='flex justify-between items-center mb-8'>
        <h1 className='text-2xl font-bold'>{session?.user?.name}'s Cart</h1>
        
      </div>

      <p>This is a protected route. Only authenticated users can see this.</p>
    </div>
  );
}
