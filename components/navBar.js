import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import Logo from "./logo";
import { useState } from "react";

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
    <nav>
      <div className="flex items-center justify-between pr-8 pl-8 pt-4">
        <Link href="/">
          <Logo />
        </Link>
        <div className="flex items-center justify-between p-4 text-accent gap-8">
          <Link
            href="/catalogue"
            className="hover:text-foreground transition-all duration-300 ease-in-out"
          >
            Catalogue
          </Link>
          <Link href="/cart">
            <Image
              src="/cart.svg"
              alt="Shopping Cart Button/Image"
              width={24}
              height={24}
            />
          </Link>

          {/* Profile and Hover Menu */}
          <div
            className="relative flex items-center gap-4"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {session ? (
              <>
                {/* User's image */}
                <Image
                  src={session.user.image}
                  alt="User Profile"
                  width={32}
                  height={32}
                  className="rounded-full"
                />
                {/* Username */}
                <span className="text-sm font-semibold">{session.user.name}</span>

                {/* Dropdown menu */}
                {hovering && (
                  <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg p-2 text-sm text-black">
                    <Link
                      href="/profile"
                      className="block px-4 py-2 hover:bg-gray-100 rounded-lg"
                    >
                      Go to Profile
                    </Link>
                    <button
                      onClick={() => signOut()}
                      className="block w-full px-4 py-2 text-left hover:bg-gray-100 rounded-lg"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </>
            ) : (
              // Sign In Button if not logged in
              <Link href="/api/auth/signin">
                <button className="text-sm font-semibold hover:text-foreground" onClick={() => signIn()}>
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
