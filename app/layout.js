"use client";

import { useEffect, useState } from "react";

import "./globals.css";
import NavBar from "@/components/navBar";
import Footer from "@/components/footer";

import { Poppins } from 'next/font/google'

export const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})


export default function RootLayout({ children }) {
  const getInitialTheme = () => {
    if (typeof window === "undefined") return "dark";

    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) return storedTheme;

    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    return prefersDark ? "dark" : "light";
  };

  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <html
      lang='en'
      className={`${theme} ${poppins.className} scrollbar-hide`}
    >
      <body className="antialiased ">
        <NavBar />
        <main>{children}</main>
        <Footer />
      </body>
      
    </html>
    
  );
}
