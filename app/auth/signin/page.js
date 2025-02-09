"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";

export default function SignIn() {
  return (
    <>
      <div className='flex flex-col min-h-96 m-8 rounded-2xl mt-20 mx-auto max-w-5xl items-center gap-4'>
        <h1 className='text-2xl font-bold px-6 py-2'>Sign In Options</h1>
        
        <button
          onClick={() => signIn("google", { callbackUrl: "/cart" })}
          className='px-5 py-2 mt-6 border border-accent rounded-3xl hover:text-primary hover:bg-accent'
        >
          <div className='flex items-center gap-4 m-1'>
            <Image src="/googleicon.svg" width={20} height={20} alt="Google Icon" />
            <p>Sign in with Google</p>
          </div>
        </button>
        {/* <button
          onClick={() => signIn("google", { callbackUrl: "/cart" })}
          className='px-5 py-2 mt-5 border border-accent rounded-3xl hover:text-primary hover:bg-accent'
        >
          <div className='flex items-center gap-4 m-1'>
            <Image src="/googleicon.svg" width={20} height={20} alt="Google Icon" />
            <p>Sign in with Google</p>
          </div>
        </button> */}
      </div>
      
    </>
  );
}
