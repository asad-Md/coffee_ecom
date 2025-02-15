import { dummyTestimonialsData } from "@/data/dummyData";
import quoteIcon from "@/public/quoteIcon.svg";
import Image from "next/image";

export default function Testimonials() {
  return (
    <div className='flex flex-row gap-10 py-16 min-w-64 text-sm sm:text-md md:text-lg lg:text-xl h-auto max-w-fit mx-4 sm:max-w-xl md:max-w-5xl md:m-8 lg:max-w-7xl lg:m-12 xl:m-28 2xl:mx-auto sm:mx-auto justify-center align-center'>
          {dummyTestimonialsData.map((item, index) => (
            <div key={index} className="flex flex-col gap-4 w-52 " >
                <Image src={quoteIcon} alt="quote icon" width={32} height={40} className="m-2" />
                <p className="text-pretty  italic font-medium sm:font-semibold m-2" >{item.review}</p>
                <p className="self-end justify-self-end font-extralight m-2" >~ {item.name}</p>
            </div>
          ))}
    </div>
  );
}
