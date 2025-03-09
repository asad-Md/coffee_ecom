import Link from "next/link";
import Logo from "./logo";

export default function Footer() {
  return (
    <footer className="bg-[var(--background)] text-[var(--foreground)] py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex gap-6">
            <Link
              href="/about"
              className="hover:text-[var(--primary)] transition-all duration-300 ease-in-out"
            >
              About Us
            </Link>
            <Link
              href="/catalogue"
              className="hover:text-[var(--primary)] transition-all duration-300 ease-in-out"
            >
              Beans
            </Link>
          </div>
          <div className="my-4 md:my-0">
            <Link href="/">
              <Logo />
            </Link>
          </div>
        </div>
        <hr className="my-6 border-[var(--accent)]" />
        <p className="text-sm text-center">
          © {new Date().getFullYear()} Bean's Coffee. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
