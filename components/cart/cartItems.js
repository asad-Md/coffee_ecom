"use client";
import { useState } from "react";
import CartCard from "./cartItemCard";

export default function CartItems({ cartItems }) {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  const totalProducts = cartItems.length;
  const totalPages = Math.ceil(totalProducts / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const currentItems = cartItems.slice(
    startIndex,
    startIndex + productsPerPage
  );

  return (
    <div className='min-h-screen bg-background p-4 sm:p-8 lg:p-12'>
      <div className='flex flex-col gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12 max-w-2xl mx-auto'>
        {currentItems.length > 0 ? (
          currentItems.map((item) => (
            <CartCard
              key={item.id}
              item={item}
            />
          ))
        ) : (
          <div className='text-xl sm:text-2xl font-bold text-center py-8'>
            Cart is empty
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className='flex flex-row justify-center items-center gap-2 sm:gap-4 mb-8'>
        <button
          onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
          disabled={currentPage === 1}
          className={`px-3 sm:px-4 py-2 rounded-3xl text-primary opacity-90 hover:opacity-100 w-1/3 sm:w-auto ${
            currentPage === 1
              ? "bg-secondary cursor-not-allowed"
              : "bg-accent hover:bg-coffee-600"
          }`}
        >
          Previous
        </button>

        <span className='text-secondary py-2'>
          Page <span className='text-accent font-semibold'> {currentPage}</span> of{" "}
          {totalPages}
        </span>

        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(totalPages, prev + 1))
          }
          disabled={currentPage === totalPages}
          className={`px-3 sm:px-4 py-2 rounded-3xl text-primary opacity-90 hover:opacity-100 w-1/3 sm:w-auto ${
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
// "use client";
// import { useState } from "react";

// import CartCard from "./cartItemCard";

// export default function CartItems({ cartItems }) {
//   const [currentPage, setCurrentPage] = useState(1);
//   const productsPerPage = 8;

//   // Calculate pagination
//   const totalProducts = cartItems.length;
//   const totalPages = Math.ceil(totalProducts / productsPerPage);
//   const startIndex = (currentPage - 1) * productsPerPage;
//   const currentItems = cartItems.slice(
//     startIndex,
//     startIndex + productsPerPage
//   );

//   return (
//     <div className='min-h-screen bg-background p-12'>

//       <div className='flex flex-col gap-8 mb-12 max-w-2xl mx-auto'>
//         {currentItems.length > 0 ? (
//           currentItems.map((item) => {
//             return (
//               <CartCard
//                 key={item.id}
//                 item={item}
//               />
//             );
//           })
//         ) : (
//           <div className='text-2xl font-bold text-center'>Cart is empty</div>
//         )}
//       </div>

//       {/* Pagination */}
//       <div className='flex justify-center items-center gap-4 mb-8'>
//         <button
//           onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
//           disabled={currentPage === 1}
//           className={`px-4 py-2 rounded-3xl text-primary opacity-90 hover:opacity-100 ${
//             currentPage === 1
//               ? "bg-secondary cursor-not-allowed"
//               : "bg-accent hover:bg-coffee-600"
//           }`}
//         >
//           Previous
//         </button>

//         <span className='text-gray-700'>
//           Page {currentPage} of {totalPages}
//         </span>

//         <button
//           onClick={() =>
//             setCurrentPage((prev) => Math.min(totalPages, prev + 1))
//           }
//           disabled={currentPage === totalPages}
//           className={`px-4 py-2 rounded-3xl text-primary opacity-90 hover:opacity-100 ${
//             currentPage === totalPages
//               ? "bg-secondary cursor-not-allowed"
//               : "bg-accent hover:bg-coffee-600"
//           }`}
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// }
