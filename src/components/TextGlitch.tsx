import { useEffect, useState } from 'react';

interface Props {
  text: string
}

const charSet = 'abcdefghijklmnopqrstuvwxyz';

const TextGlitch = ({ text }: Props) => {
  const [animatedText, setAnimatedText] = useState(text);

  useEffect(() => {
    let iterations = 0;

    const interval = setInterval(() => {
      const newText = text.split('').map((character, index) => {
        if (index < iterations || /[^A-Za-z]/.test(character)) {
          return character;
        }

        const randomChar = charSet[Math.floor(Math.random() * charSet.length)];

        return character !== character.toUpperCase()
          ? randomChar
          : randomChar.toUpperCase();
      });

      setAnimatedText(newText.join(''));

      iterations += 1 / 3;

      if (iterations > text.length) {
        clearInterval(interval);
      }
    }, 42);

    return () => {
      clearInterval(interval);
    };
  }, [text]);

  return (
    <p className="relative">
      <span className="absolute inset-0 text-transparent">
        {text}
      </span>
      <span className="contents select-none" aria-hidden>
        {animatedText}
      </span>
    </p>
  );
};

export default TextGlitch;
