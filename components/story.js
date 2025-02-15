import Image from "next/image";
import coffeeTropical from "../public/images/tropicalCoffee.webp";
const storyText = `Founded with a passion for the perfect beans, bean's coffee began its journey in 2025 as a small family-owned roastery. Sourcing the finest coffee beans from sustainable farms across Bean's Kingdom, we’ve dedicated ourselves to crafting rich, aromatic blends that awaken the senses.`;

export default function Story() {
  return (
    <div className='min-h-screen max-w-5xl mx-auto flex flex-col gap-10 mb-12 md:max-w-5xl md:m-8 lg:max-w-7xl lg:m-12 xl:m-28 2xl:mx-auto'>
      <h2 className='text-foreground font-bold text-xl sm:text-3xl md:text-5xl m-4 self-center'>
        Our Story
      </h2>
      <div className='flex flex-col gap-12'>
        <p className='p-8 mx-auto text-accent font-normal opacity-85 text-justify text-sm sm:text-lg leading-10 tracking-wider sm:tracking-widest'>
          {storyText}
        </p>
        <div className="w-full mx-auto sm:max-w-md max-w-sm md:max-w-prose">
          <Image
            src={coffeeTropical}
            alt='Coffee Estate with Beans'
            className='rounded-3xl'
            // sizes='(max-width: 640px) 100vw, 33vw'
            priority
          />
        </div>
      </div>
    </div>
  );
}
