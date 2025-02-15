import Image from "next/image";
import coffeeImg from "../public/images/coffee_gen2.jpg";
import CtaCard from "@/components/ctaCard";
import FeaturedCarousel from "@/components/featuredCarousel";
import Testimonials from "@/components/testimonials";
import Story from "@/components/story";

export const metadata = {
  title: "coffee",
  description: "buy coffee beans",
};

export default function Home() {
  return (
    <>
      <div className='bg-primary rounded-3xl flex flex-col m-8 sm:mx-auto max-w-xl  md:flex-row md:max-w-5xl md:m-8 lg:max-w-7xl lg:m-12 xl:m-28 2xl:mx-auto' >
        <div className='relative w-full min-h-[280px] md:w-7/12 md:min-h-[460px]'>
          <Image
            src={coffeeImg}
            alt='Coffee'
            className='object-cover rounded-t-3xl md:rounded-l-3xl md:rounded-r-none'
            fill
            // sizes='(max-width: 640px) 100vw, 33vw'
            priority
          />
        </div>
        <div className='p-6 md:w-5/12'>
          <CtaCard />
        </div>
      </div>
      <FeaturedCarousel />
      <Story />
      <Testimonials />
    </>
  );
}
