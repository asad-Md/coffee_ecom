import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import Logo from "./logo";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { Loader2, Menu, X } from "lucide-react";

export default function NavBar() {
  const { data: session, status } = useSession();
  const [hovering, setHovering] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMouseEnter = () => {
    setHovering(true);
  };

  const handleMouseLeave = () => {
    setHovering(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className='relative'>
      <div className='flex items-center justify-between px-4 md:px-8 pt-4 transition-all duration-300 ease-in-out'>
        <Link href='/'>
          <Logo />
        </Link>

        {/* Mobile Menu Button */}
        <button
          className='md:hidden p-2'
          onClick={toggleMenu}
        >
          {isMenuOpen ? (
            <X className='h-6 w-6' />
          ) : (
            <Menu className='h-6 w-6' />
          )}
        </button>

        {/* Desktop Navigation */}
        <div className='hidden md:flex items-center justify-between p-4 text-accent text-md font-semibold gap-8'>
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
              className='cursor-pointer'
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
                <span className='text-md font-semibold'>
                  {session.user.name}
                </span>

                {hovering && (
                  <div className='absolute top-0 right-0 w-48 bg-secondary shadow-lg rounded-2xl p-2 text-sm text-primary transition-all duration-300 ease-in-out'>
                    <div className='flex flex-col justify-center items-center gap-2'>
                      <Image
                        src={session.user.image}
                        alt='User Profile'
                        width={50}
                        height={50}
                        className='rounded-full m-2 px-auto'
                      />
                      <span className='text-md font-semibold block w-full px-4 py-2 text-left hover:font- rounded-xl'>
                        {session.user.name}
                      </span>
                      <Link
                        href='/profile'
                        className='block w-full px-4 py-2 text-left hover:bg-accent rounded-xl'
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
                  </div>
                )}
              </>
            ) : status === "loading" ? (
              <button
                className='p-2 bg-primary text-accent rounded-full cursor-not-allowed'
                disabled={true}
              >
                <Loader2 className='h-4 w-4 animate-spin' />
              </button>
            ) : (
              <button
                className='px-4 py-2 bg-primary text-accent rounded-lg hover:bg-primary/90 transition-colors'
                onClick={() => signIn()}
              >
                Sign In
              </button>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className='absolute top-full right-0 z-10 bg-background border-t md:hidden transition-all duration-300 ease-in-out'>
            <div className='flex flex-col p-4 space-y-4'>
              <Link
                href='/catalogue'
                className='text-accent hover:text-foreground transition-all duration-300 ease-in-out'
                onClick={() => setIsMenuOpen(false)}
              >
                Catalogue
              </Link>
              <Link
                href='/cart'
                onClick={() => setIsMenuOpen(false)}
              >
                <Image
                  src='/cart.svg'
                  alt='Shopping Cart Button/Image'
                  width={24}
                  height={24}
                  className='cursor-pointer'
                />
              </Link>

              {session ? (
                <div className='space-y-2'>
                  <div className='flex items-center gap-2'>
                    <Image
                      src={session.user.image}
                      alt='User Profile'
                      width={32}
                      height={32}
                      className='rounded-full'
                    />
                    <span className='text-md font-semibold'>
                      {session.user.name}
                    </span>
                  </div>
                  <Link
                    href='/'
                    className='block py-2 text-accent hover:text-foreground cursor-not-allowed'
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      signOut();
                      setIsMenuOpen(false);
                    }}
                    className='block w-full py-2 text-left text-accent hover:text-foreground'
                  >
                    Sign Out
                  </button>
                </div>
              ) : status === "loading" ? (
                <button
                  className='p-2 bg-primary text-accent rounded-full cursor-not-allowed'
                  disabled={true}
                >
                  <Loader2 className='h-4 w-4 animate-spin' />
                </button>
              ) : (
                <button
                  className='px-4 py-2 bg-primary text-accent rounded-lg hover:bg-primary/90 transition-colors'
                  onClick={() => {
                    signIn();
                    setIsMenuOpen(false);
                  }}
                >
                  Sign In
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

// import { useSession, signOut } from "next-auth/react";
// import Image from "next/image";
// import Link from "next/link";
// import Logo from "./logo";
// import { useState } from "react";
// import { signIn } from "next-auth/react";
// import { Loader2 } from "lucide-react";

// export default function NavBar() {
//   const { data: session, status } = useSession();
//   const [hovering, setHovering] = useState(false);

//   const handleMouseEnter = () => {
//     setHovering(true);
//   };

//   const handleMouseLeave = () => {
//     setHovering(false);
//   };

//   return (
//     <nav >
//       <div className='flex items-center justify-between pr-8 pl-8 pt-4'>
//         <Link href='/'>
//           <Logo />
//         </Link>
//         <div className='flex items-center justify-between p-4 text-accent text-md font-semibold gap-8'>
//           <Link
//             href='/catalogue'
//             className='hover:text-foreground transition-all duration-300 ease-in-out'
//           >
//             Catalogue
//           </Link>
//           <Link href='/cart'>
//             <Image
//               src='/cart.svg'
//               alt='Shopping Cart Button/Image'
//               width={24}
//               height={24}
//               className='cursor-pointer '
//             />
//           </Link>

//           <div
//             className='relative flex items-center gap-4'
//             onMouseEnter={handleMouseEnter}
//             onMouseLeave={handleMouseLeave}
//           >
//             {session ? (
//               <>
//                 <Image
//                   src={session.user.image}
//                   alt='User Profile'
//                   width={32}
//                   height={32}
//                   className='rounded-full'
//                 />

//                 <span className='text-md   font-semibold'>
//                   {session.user.name}
//                 </span>

//                 {hovering && (
//                   <div className='absolute opacity-0 hover:opacity-100 left-0 w-full mt-2 bg-secondary shadow-lg rounded-2xl p-2 text-sm text-primary transition-all duration-300 ease-in-out'>
//                     <Link
//                       disabled={true} //disable the link if the status is loading
//                       // href="/profile"
//                       href='/'
//                       className='block px-4 py-2 hover:bg-accent rounded-xl cursor-not-allowed'
//                     >
//                       Profile
//                     </Link>
//                     <button
//                       onClick={() => signOut()}
//                       className='block w-full px-4 py-2 text-left hover:bg-accent rounded-xl'
//                     >
//                       Sign Out
//                     </button>
//                   </div>
//                 )}
//               </>
//             ) : // Sign In Button if not logged in
//             //if status == loading, then disable the button
//             status === "loading" ? (
//               <button
//                 className='p-2 bg-primary text-accent rounded-full cursor-not-allowed'
//                 disabled={true}
//               >
//                 <Loader2 className='h-4 w-4 animate-spin' />
//               </button>
//             ) : (
//               <Link href='/api/auth/signin'>
//                 <button
//                   className=''
//                   onClick={() => signIn()}
//                 >
//                   Sign In
//                 </button>
//               </Link>
//             )}
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// }
