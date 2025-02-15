import Image from "next/image";
import IncreaseButton from "./increaseButton";
import DecreaseButton from "./decreaseButton";

export default function CartCard({ item }) {
  return (
    <div
      key={item.id}
      className='flex flex-col sm:flex-row bg-foreground rounded-xl mb-4 overflow-hidden'
    >
      <div className='w-full sm:w-[250px] flex-shrink-0'>
        <Image
          src={item.product.images[0]}
          alt={item.product.name}
          width={250}
          height={250}
          sizes='(max-width: 640px) 100vw, (max-width: 1024px) 250px, 250px'
          className='w-full h-[200px] sm:h-[250px] object-cover'
        />
      </div>
      <div className='flex flex-col p-4 sm:my-2 items-start justify-between w-full gap-y-2'>
        <div className='flex flex-col sm:flex-row justify-between w-full items-start sm:items-center gap-2 sm:gap-0'>
          <h2 className='text-xl sm:text-2xl lg:text-3xl text-primary font-bold'>
            {item.product.name}
          </h2>
          <p className='text-md text-primary opacity-85'>
            ${item.price}
          </p>
        </div>

        <p className='text-sm sm:text-md w-full sm:w-3/4 text-left opacity-85 text-primary'>
          {item.product.description}
        </p>

        <div className='flex justify-end w-full items-center mt-2 sm:mt-0'>
          <div className='flex gap-4 justify-between bg-primary opacity-80 rounded-xl p-1'>
            <DecreaseButton product={item.product} />
            <span className='text-base sm:text-lg my-auto text-center text-accent min-w-[20px]'>
              {item.quantity}
            </span>
            <IncreaseButton product={item.product} />
          </div>
        </div>
      </div>
    </div>
  );
}

// import Image from "next/image";
// import IncreaseButton from "./increaseButton";
// import DecreaseButton from "./decreaseButton";

// export default function CartCard({ item }) {
//   return (
//     <div
//       key={item.id}
//       className='flex pr-2 justify-between bg-foreground rounded-xl mb-4'
//     >
//       <div className=''>
//         <Image
//           src={item.product.images[0]}
//           alt={item.product.name}
//           width={250}
//           height={250}
//           sizes='(max-width: 640px) 10vw, (max-width: 1024px) 10vw, 1-vw' //mobile ~ tablet ~ desktop
//           className='rounded-l-xl'
//         />
//       </div>
//       <div className='flex flex-col my-2 items-start justify-between w-3/5 gap-y-2'>
//         <div className='flex justify-between w-full items-center'>
//           <h2 className='text-3xl text-center text-primary font-bold'>
//             {item.product.name}
//           </h2>
//           <p className='text-md text-center opacity-85 text-primary'>
//             ${item.price}
//           </p>
//         </div>

//         <p className='text-md w-3/4 text-left opacity-85 text-primary'>
//           {item.product.description}
//         </p>

//         <div className='flex justify-end w-full items-center'>
//           <div className='flex gap-4 justify-between bg-primary opacity-80 rounded-xl'>
//             <DecreaseButton product={item.product} />
//             <span className='text-lg my-auto text-center text-accent'>
//               {item.quantity}
//             </span>
//             <IncreaseButton product={item.product} />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
