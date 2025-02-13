import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import Logo from "./logo";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { Loader2 } from "lucide-react";

export default function NavBar() {
  const { data: session, status } = useSession();
  const [hovering, setHovering] = useState(false);

  const handleMouseEnter = () => {
    setHovering(true);
  };

  const handleMouseLeave = () => {
    setHovering(false);
  };

  return (
    <nav >
      <div className='flex items-center justify-between pr-8 pl-8 pt-4'>
        <Link href='/'>
          <Logo />
        </Link>
        <div className='flex items-center justify-between p-4 text-accent text-md font-semibold gap-8'>
          <Link
            href='/catalogue'
            className='hover:text-foreground transition-all duration-300 ease-in-out'
          >
            Catalogue
          </Link>
          <Link href='/cart'>
            <Image
              src='/cart.svg'
              alt='Shopping Cart Button/Image'
              width={24}
              height={24}
              className='cursor-pointer '
            />
          </Link>

          <div
            className='relative flex items-center gap-4'
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {session ? (
              <>
                <Image
                  src={session.user.image}
                  alt='User Profile'
                  width={32}
                  height={32}
                  className='rounded-full'
                />

                <span className='text-md   font-semibold'>
                  {session.user.name}
                </span>

                {hovering && (
                  <div className='absolute opacity-0 hover:opacity-100 left-0 w-full mt-2 bg-secondary shadow-lg rounded-2xl p-2 text-sm text-primary transition-all duration-300 ease-in-out'>
                    <Link
                      disabled={true} //disable the link if the status is loading
                      // href="/profile"
                      href='/'
                      className='block px-4 py-2 hover:bg-accent rounded-xl cursor-not-allowed'
                    >
                      Profile
                    </Link>
                    <button
                      onClick={() => signOut()}
                      className='block w-full px-4 py-2 text-left hover:bg-accent rounded-xl'
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </>
            ) : // Sign In Button if not logged in
            //if status == loading, then disable the button
            status === "loading" ? (
              <button
                className='p-2 bg-primary text-accent rounded-full cursor-not-allowed'
                disabled={true}
              >
                <Loader2 className='h-4 w-4 animate-spin' />                
              </button>
            ) : (
              <Link href='/api/auth/signin'>
                <button
                  className=''
                  onClick={() => signIn()}
                >
                  Sign In
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
