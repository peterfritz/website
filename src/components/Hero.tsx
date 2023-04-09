import Image from 'next/image';

import backgroundBloom from '@/assets/images/background-bloom.webp';
import ArrowIcon from '@/components/icons/Arrow';
import { Text, UnstyledButton } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import TextGlitch from './TextGlitch';

const Hero = () => {
  const [loaded, { open: completeLoad }] = useDisclosure(false);

  return (
    <section
      className="full-height w-full top-0 flex flex-col items-center justify-center relative"
    >
      <div
        aria-hidden
        className={`absolute inset-0 select-none pointer-events-none transition-opacity ease-in-out duration-[5s] ${
          loaded ? 'opacity-40 [filter:_blur(1.5rem)]' : 'opacity-0'
        }`}
      >
        <Image
          alt=""
          src={backgroundBloom}
          width={1920}
          height={1080}
          quality={100}
          className="w-full h-full object-cover"
          onLoad={completeLoad}
        />
      </div>
      <Text
        weight="bolder"
        className="text-4xl sm:text-5xl"
      >
        <TextGlitch text="Peter Fritz" />
      </Text>
      <Text
        weight="bolder"
        className="text-lg sm:text-xl mt-2"
      >
        <TextGlitch text="Desenvolvedor Full Stack" />
      </Text>
      <UnstyledButton
        component="a"
        href="#main"
        className="h-10 w-10 p-2 text-lg rounded-full bottom-5 absolute flex items-center justify-center"
      >
        <ArrowIcon />
      </UnstyledButton>
    </section>
  );
};

export default Hero;
