"use client";

import { useEffect, useState } from "react";
import { SessionProvider } from "next-auth/react";

import "./globals.css";
import NavBar from "@/components/navBar";
import Footer from "@/components/footer";

import { Poppins } from "next/font/google";

export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export default function RootLayout({ children }) {
  const getInitialTheme = () => {
    if (typeof window === "undefined") return "dark";

    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) return storedTheme;

    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    // return prefersDark ? "dark" : "light";

    return prefersDark ? "dark" : "dark";   //temporarily set to  hardcoded dark
    
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
      <body className='antialiased '>
       
        <SessionProvider>
          <NavBar />
          <main className="" >{children}</main>
        </SessionProvider>
        <Footer />
      </body>
    </html>
  );
}
