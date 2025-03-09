"use client";
import { useRef, useState, useEffect } from "react";
import FeaturedCard from "./featuredCard";
import Link from "next/link";
import Image from "next/image";

import arrow from "@/public/chevron-right.svg";

export default function FeaturedCarousel() {
  const scrollContainerRef = useRef(null);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const response = await fetch("/api/products/fetch");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const { products } = await response.json();
        setFeaturedProducts(products.slice(0, 5)); // Use first 5 products
      } catch (error) {
        console.error("Error fetching featured products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

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
    <div className='flex flex-col gap-10 py-16 sm:min-h-screen max-w-xl m-6 sm:mx-auto sm:max-w-xl md:max-w-5xl'>
      <h2 className='text-foreground font-bold text-xl sm:text-3xl md:text-5xl m-4 self-center'>
        Featured Beans
      </h2>
      <div className='flex gap-1 justify-center items-center'>
        <button
          onClick={() => scroll("left")}
          className='bg-accent opacity-85 items-center hover:opacity-100 justify-center text-primary p-2 rounded-full transition-all duration-300 ease-in-out'
        >
          <Image
            src={arrow}
            alt='left arrow'
            className='rotate-180 self-center'
            width={48}
            height={48}
          />
        </button>

        <div
          ref={scrollContainerRef}
          className='flex gap-8 sm:gap-16 md:gap-20 p-3 scrollbar-hide overflow-y-visible overflow-x-auto scroll-smooth'
        >
          {loading ? (
            <div className="flex items-center justify-center min-h-[200px]">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-accent"></div>
            </div>
          ) : (
            featuredProducts.map((item) => (
              <FeaturedCard
                key={item.id}
                item={item}
              />
            ))
          )}
        </div>

        <button
          onClick={() => scroll("right")}
          className='bg-accent opacity-85 items-center hover:opacity-100 justify-center text-primary p-2 rounded-full transition-all duration-300 ease-in-out'
        >
          <Image
            src={arrow}
            alt='right arrow'
            className='self-center'
            width={48}
            height={48}
          />
        </button>
      </div>

      <button className='bg-accent w-fit self-end mr-10 text-lg hover:bg-foreground hover:scale-105 hover:font-bold text-primary font-semibold py-2 px-4 rounded-full mt-4 transition-all duration-300 ease-in-out'>
        <Link href='/catalogue'> View Catalogue </Link>
      </button>
    </div>
  );
}
