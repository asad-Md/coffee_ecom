import Image from "next/image";
import IncreaseButton from "./increaseButton";
import DecreaseButton from "./decreaseButton";

export default function CartCard({ item }) {
  return (
    <div
      key={item.id}
      className='flex pr-2 justify-between bg-foreground rounded-xl mb-4'
    >
      <div className=''>
        <Image
          src={item.product.images[0]}
          alt={item.product.name}
          width={250}
          height={250}
          sizes='(max-width: 640px) 10vw, (max-width: 1024px) 10vw, 1-vw' //mobile ~ tablet ~ desktop
          className='rounded-l-xl'
        />
      </div>
      <div className='flex flex-col my-2 items-start justify-between w-3/5 gap-y-2'>
        <div className='flex justify-between w-full items-center'>
          <h2 className='text-3xl text-center text-primary font-bold'>
            {item.product.name}
          </h2>
          <p className='text-md text-center opacity-85 text-primary'>
            ${item.price}
          </p>
        </div>

        <p className='text-md w-3/4 text-left opacity-85 text-primary'>
          {item.product.description}
        </p>

        <div className='flex justify-end w-full items-center'>
          <div className='flex gap-4 justify-between bg-primary opacity-80 rounded-xl'>
            <DecreaseButton product={item.product} />
            <span className='text-lg my-auto text-center text-accent'>
              {item.quantity}
            </span>
            <IncreaseButton product={item.product} />
          </div>
        </div>
      </div>
    </div>
  );
}
