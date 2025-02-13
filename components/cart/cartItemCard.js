import Image from "next/image";
import IncreaseButton from "./increaseButton";
import DecreaseButton from "./decreaseButton";

export default function CartCard({ item }) {
  return (
    <div
      key={item.id}
      className='flex justify-between items-center pr-4 bg-foreground rounded-xl mb-4'
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
      <div className='flex flex-col gap-4 p-4'>
        <h2 className='text-2xl text-center text-primary font-bold'>
          {item.product.name}
        </h2>
        <p className='text-sm text-center text-primary'>${item.price}</p>

        <div className='flex gap-4 justify-between start bg-primary opacity-80 rounded-xl'>
          <DecreaseButton product={item.product} />
          <span className='text-lg my-auto text-center text-accent  '>
            {item.quantity}
          </span>
          <IncreaseButton product={item.product} />
        </div>
      </div>
    </div>
  );
}
