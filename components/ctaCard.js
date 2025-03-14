import Link from "next/link";

export default function CtaCard() {
  return (
    <div className='flex flex-col'>
      <h1 className='text-xl md:text-4xl font-bold text-start text-foreground m-4'>
        Craving the perfect brew?
      </h1>
      <p className='text-start w-3/4 text-sm md:text-lg text-wrap opacity-70 m-4 mb-0 leading-10'>
        Experience the <span className='italic font-bold'>rich flavors </span>of
        freshly harvested <span className='italic font-bold'>tropical </span>
        coffee beans.
      </p>
      {/* <p className='text-start text-lg text-wrap opacity-70 m-4 mt-1'></p> */}
      <div className='flex justify-start gap-10 m-4'>
        <button className='bg-accent text-sm md:text-lg hover:bg-foreground hover:text-background  text-primary font-semibold py-2 px-4 rounded-full mx-auto md:mx-0 transition-all duration-300 ease-in-out'>
          <Link href='/catalogue'> View Catalogue </Link>
        </button>
      </div>
    </div>
  );
}
