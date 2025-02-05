import Image from "next/image";
import coffeeTropical from "../public/images/tropicalCoffee.webp";
const storyText = `Founded with a passion for the perfect beans, [Brand Name] began its journey in [Year] as a small family-owned roastery. Sourcing the finest coffee beans from sustainable farms across [Region, Country], we’ve dedicated ourselves to crafting rich, aromatic blends that awaken the senses.`;

export default function Story() {
  return (
    <div className='min-h-screen max-w-5xl mx-auto flex flex-col gap-10'>
      <h2 className='text-foreground font-bold text-5xl m-4 self-center'>
        Our Story
      </h2>
      <div className='flex gap-20'>
        <p className='p-4 text-accent font-normal opacity-85 text-justify text-lg leading-10 tracking-widest'>
          {storyText}
        </p>
        <Image
          src={coffeeTropical}
          alt='Coffee Estate with Beans'
          width={800}
          height={800}
          className='rounded-3xl p-2'
        />
      </div>
    </div>
  );
}
