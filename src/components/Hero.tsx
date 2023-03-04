import Image from 'next/image';

import gradientBackground from '@/assets/images/gradient_background.png';
import { Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import TextGlitch from './TextGlitch';

const Hero = () => {
  const [loaded, { open: complete }] = useDisclosure(false);

  return (
    <section className="full-height w-full top-0 flex flex-col items-center justify-center">
      <div
        aria-hidden
        className={`absolute inset-0 select-none pointer-events-none [filter:_blur(5rem);] transition-opacity ease-in-out duration-[5s] ${
          loaded ? 'opacity-70' : 'opacity-0'
        }`}
      >
        <Image
          alt=""
          src={gradientBackground}
          width={1920}
          height={1080}
          quality={100}
          className="w-full h-full object-cover opacity-50"
          onLoad={complete}
        />
      </div>
      <Text
        weight="bolder"
        size="xl"
        className="text-[min(3rem,_max(1.5rem,_5vw))]"
      >
        <TextGlitch text="Peter Fritz" />
      </Text>
      <Text
        weight="bolder"
        size="xl"
      >
        <TextGlitch text="Desenvolvedor Fullstack" />
      </Text>
    </section>
  );
};

export default Hero;
