import Image from 'next/image'
export default function FeaturedCard({index, item}) {
    return (
        <>
        <div
            key={index}
            className='flex flex-col rounded-3xl min-w-64 h-auto bg-foreground hover:scale-105 transition-all duration-300 ease-in-out'
          >
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
                <p className='text-primary font-normal opacity-85 text-pretty text-sm '>
                  {item.description}
                </p>
              </div>
            </div>
          </div>
        </>
    )
}