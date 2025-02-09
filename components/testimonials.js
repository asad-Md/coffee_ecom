import { dummyTestimonialsData } from "@/data/dummyData";
import quoteIcon from "@/public/quoteIcon.svg";
import Image from "next/image";

export default function Testimonials() {
  return (
    <div className='flex flex-row gap-10 py-16 min-w-64 h-auto  max-w-5xl mx-auto justify-center align-center'>
          {dummyTestimonialsData.map((item, index) => (
            <div key={index} className="flex flex-col gap-4 w-52 " >
                <Image src={quoteIcon} alt="quote icon" width={32} height={40} className="m-2" />
                <p className="text-pretty  italic font-semibold m-2" >{item.review}</p>
                <p className="self-end justify-self-end font-extralight m-2" >~ {item.name}</p>
            </div>
          ))}
    </div>
  );
}
