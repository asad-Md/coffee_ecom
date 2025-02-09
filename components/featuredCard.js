import Image from "next/image";
export default function FeaturedCard({ index, item }) {
  return (
    <>
      <div
        key={index}
        className='relative flex flex-col rounded-3xl min-w-64 h-auto bg-foreground hover:scale-105  transition-all duration-300 ease-in-out'
      >
        <button
          className='absolute top-2 right-2 bg-accent hover:bg-primary text-primary hover:text-accent p-2 rounded-full transition-all duration-300 ease-in-out z-10 flex items-center gap-1'
          onClick={() => console.log("Add to cart:", item.name)}
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

          

        </button>
        <Image
          src={item.img}
          alt={item.name}
          width={300}
          height={300}
          className='w-full object-cover rounded-t-3xl border-b-2 border-primary'
        />
        <div className='flex flex-col p-4 text'>
          <div className='flex justify-between font-bold text-2xl'>
            <h3 className='text-primary'>{item.name}</h3>
            <p className='text-primary'>${item.price}</p>
          </div>
          <div className='p-1 flex flex-col gap-2'>
            <p className='text-primary italic font-thin opacity-70 mt-4 text-sm'>
              {item.location}
            </p>
            <p className='text-primary font-normal opacity-85 text-pretty text-sm'>
              {item.description}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}





{/* <Image 
            src='/addcart.svg'
            alt='add to cart icon'
            width={32}
            height={32}
            className=''
          /> */}