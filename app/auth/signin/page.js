"use client";

import { signIn } from "next-auth/react";

export default function SignIn() {
  return (
    <>
      <div className='flex flex-col items-center min-h-dvh gap-4 p-8'>
        <h1 className='text-2xl font-bold'>Sign In</h1>

        <button
          onClick={() => signIn("google", { callbackUrl: "/cart" })}
          className='flex items-center gap-2 px-4 py-2 border rounded hover:bg-gray-50'
        >
          Sign in with Google
        </button>
      </div>
      
    </>
  );
}
