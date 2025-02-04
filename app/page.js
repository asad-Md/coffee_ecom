import Image from "next/image";
import coffeeImg from "../public/images/coffee_gen2.jpg";
import CtaCard from "@/components/ctaCard";
import FeaturedCarousel from "@/components/featuredCarousel";
import Reviews from "@/components/reviews";

export const metadata = {
  title: "coffee",
  description: "buy coffee beans",
};

export default function Home() {
  return (
    <>
      <div className="flex m-8 bg-primary rounded-2xl items-center gap-10" >
        <Image
          className="rounded-tl-2xl rounded-bl-2xl "
          src={coffeeImg}
          alt="Coffee"
          width={800}
          height={800}          
        />
        <CtaCard />
      </div>
      <FeaturedCarousel />
      <Reviews />
    </>
  );
}
