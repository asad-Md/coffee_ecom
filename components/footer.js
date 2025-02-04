import Link from "next/link";
import Logo from "./logo";

export default function Footer() {
  return (
    <>
      <footer className='flex gap-6 justify-end bg-gray-700 bg-opacity-50 p-8 h-40'>
        <Link
          href='/about'
          className='hover:text-foreground transition-all duration-300 ease-in-out'
        >
          About Us
        </Link>
        <Link href='/'>
          <Logo />
        </Link>
      </footer>
    </>
  );
}
