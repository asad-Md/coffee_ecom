import Image from 'next/image';

export default function Logo() {
  return (
    <Image
      className='dark:brightness-200 p-2'
      src='/temp_logo.svg'
      alt='Coffee LogoMark'
      width={160}
      height={160}
    />
  );
}
