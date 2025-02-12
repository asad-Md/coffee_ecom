// app/products/page.tsx
"use client";
import { useState } from "react";
import Image from "next/image";

export default function CartItems({ cartItems }) {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  // Calculate pagination
  const totalProducts = cartItems.length;
  const totalPages = Math.ceil(totalProducts / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const currentItems = cartItems.slice(
    startIndex,
    startIndex + productsPerPage
  );

  return (
    <div className='min-h-screen bg-background p-12'>
      <h1 className='text-4xl font-bold text-center mb-12 text-coffee-800'>
        Your Coffee Selection
      </h1>
      
      <div className='flex flex-col gap-8 mb-12 max-w-md mx-auto'>
        {currentItems.length > 0 ? (
          currentItems.map((item) => {
            return (
              <div
                key={item.id}
                className='flex justify-between items-center pr-4 bg-foreground rounded-xl mb-4'
              >
                
                  <div className=''>
                    {/* <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      width={200}
                      height={200}
                    /> */}
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      width={250}
                      height={250}                      
                      sizes='(max-width: 640px) 10vw, (max-width: 1024px) 10vw, 1-vw'  //mobile ~ tablet ~ desktop  
                      className='rounded-l-xl'
                    />
                  </div>
                  <div className='flex flex-col gap-4 p-4'>
                    <h2 className='text-2xl text-center text-primary font-bold'>
                      {item.product.name}
                    </h2>
                    <p className='text-sm text-center text-primary'>${item.price}</p>

                    <div className='flex gap-4 justify-evenly'>
                      <button className='p-2 bg-primary py-auto text-accent rounded-full hover:bg-accent hover:text-primary transition-all duration-300 ease-in-out'>
                        -
                      </button>
                      <span className='text-lg my-auto text-center text-primary '>{item.quantity}</span>
                      <button className='p-2 bg-primary text-accent rounded-full hover:bg-accent hover:text-primary transition-all duration-300 ease-in-out'>
                        +
                      </button>
                    </div>
                  </div>
                
              </div>
            );
          })
        ) : (
          <div className='text-2xl font-bold text-center'>Cart is empty</div>
        )}
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
