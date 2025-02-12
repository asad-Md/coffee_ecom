// app/products/page.tsx
"use client";
import { useState } from "react";
import { dummyProductsData } from "@/data/dummyData";
import Image from "next/image";
import AddToCartButton from "@/components/cart/addToCartButton";

export default function CataloguePage() {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  // Calculate pagination
  const totalProducts = dummyProductsData.length;
  const totalPages = Math.ceil(totalProducts / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const currentProducts = dummyProductsData.slice(
    startIndex,
    startIndex + productsPerPage
  );

  return (
    <div className='min-h-screen bg-background p-12'>
      <h1 className='text-4xl font-bold text-center mb-12 text-coffee-800'>
        Our Coffee Selection
      </h1>

      {/* Product Grid */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12 max-w-7xl mx-auto'>
        {currentProducts.map((product ) => (
          <div
            key={product.id}
            className='relative bg-foreground rounded-3xl m-8 overflow-hidden hover:shadow-foreground hover:shadow-sm hover:scale-105 transition-all duration-300 ease-in-out'
          >
            <AddToCartButton product={product}  />
            
            <Image
              src={product.images[0]}
              alt={product.name}
              width={640}
              height={400}
            />

            <div className='p-6'>
              <div className='flex justify-between font-bold text-2xl items-start mb-6'>
                <h2 className='text-primary'>{product.name}</h2>
                <span className='text-primary'>${product.price}</span>
              </div>
              <p className='text-primary italic font-thin opacity-70 mt-4 text-sm px-1'>
                {product.location}
              </p>
              <p className='text-primary font-normal opacity-85 text-pretty text-sm py-4 px-1'>
                {product.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className='flex justify-center items-center gap-4 mb-8'>
        <button
          onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded-3xl text-primary opacity-90 hover:opacity-100 ${
            currentPage === 1
              ? "bg-secondary cursor-not-allowed"
              : "bg-accent hover:bg-coffee-600"
          }`}
        >
          Previous
        </button>

        <span className='text-gray-700'>
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(totalPages, prev + 1))
          }
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded-3xl text-primary opacity-90 hover:opacity-100 ${
            currentPage === totalPages
              ? "bg-secondary cursor-not-allowed"
              : "bg-accent hover:bg-coffee-600"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}







{/* <button
          className='absolute top-2 right-2 bg-accent hover:bg-primary text-primary hover:text-accent p-2 rounded-full transition-all duration-300 ease-in-out z-10 flex items-center gap-1'
          onClick={() => console.log("Add to cart:", product.name)}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='16'
            height='16'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          >
            <line
              x1='12'
              y1='5'
              x2='12'
              y2='19'
            ></line>
            <line
              x1='5'
              y1='12'
              x2='19'
              y2='12'
            ></line>
          </svg>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='20'
            height='20'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          >
            <circle
              cx='9'
              cy='21'
              r='1'
            ></circle>
            <circle
              cx='20'
              cy='21'
              r='1'
            ></circle>
            <path d='M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6'></path>
          </svg>

         <Image 
            src='/addcart.svg'
            alt='add to cart icon'
            width={32}
            height={32}
            className=''
          /> 

        </button> */}