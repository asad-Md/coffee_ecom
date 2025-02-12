"use client";
import { useRef } from "react";
import FeaturedCard from "./featuredCard";
import { dummyFeaturedData } from "@/data/dummyData";
import Link from "next/link";
import Image from "next/image";

import arrow from "@/public/chevron-right.svg";

export default function FeaturedCarousel() {
  const scrollContainerRef = useRef(null);

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    const scrollAmount = 400; // Adjust based on card width

    if (container) {
      container.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className='flex flex-col gap-10 py-16 min-h-screen max-w-5xl mx-auto'>
      <h2 className='text-foreground font-bold text-5xl m-4 self-center'>
        Featured Beans
      </h2>
      <div className='flex gap-1 justify-center items-center'>
        <button
          onClick={() => scroll("left")}
          className='bg-accent opacity-85 hidden md:block items-center hover:opacity-100 justify-center text-primary p-2 rounded-full transition-all duration-300 ease-in-out'
        >
          <Image
            src={arrow}
            alt='left arrow'
            className='rotate-180 self-center'
            width={36}
            height={36}
          />
        </button>

        
        <div
          ref={scrollContainerRef}
          className='flex gap-20 p-3 scrollbar-hide overflow-y-visible overflow-x-auto scroll-smooth'
        >
          {dummyFeaturedData.map((item, index) => (
            <FeaturedCard
              key={item.id}
              item={item}
            />
          ))}
        </div>

        <button
          onClick={() => scroll("right")}
          className='bg-accent opacity-85 hidden md:block items-center hover:opacity-100 justify-center text-primary p-2 rounded-full transition-all duration-300 ease-in-out '
        >
          <Image
            src={arrow}
            alt='left arrow'
            className='self-center'
            width={36}
            height={36}
          />
        </button>
      </div>

      <button className='bg-accent w-fit self-end mr-10 hover:bg-foreground hover:scale-105 hover:font-bold text-primary font-semibold py-2 px-4 rounded-full mt-4 transition-all duration-300 ease-in-out'>
        <Link href='/catalogue'> View Catalogue </Link>
      </button>
    </div>
  );
}
