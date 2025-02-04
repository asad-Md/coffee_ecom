import Image from "next/image";
import Link from "next/link";
import Logo from "./logo";

export default function NavBar() {
  return (
    <nav>
      <div className='flex items-center justify-between pr-8 pl-8 pt-4 '>
        <Logo />
        <div className='flex items-center justify-between p-4 text-accent gap-8'>
          <Link
            href='/catalogue'
            className='hover:text-foreground transition-all duration-300 ease-in-out'
          >
            Catalogue
          </Link>
          <Link href='/cart'>
            <Image
              src='/cart.svg'
              alt='Shoping Cart Button/Image'
              width={24}
              height={24}
            />
          </Link>

          <Image
            src='/profile.svg'
            alt='Shopping Cart Button/Image'
            width={32}
            height={32}
          />
        </div>
      </div>
    </nav>
  );
}
