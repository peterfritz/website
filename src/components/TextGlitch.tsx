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

        return character !== character.toUpperCase()
          ? charSet[Math.floor(Math.random() * charSet.length)]
          : charSet[Math.floor(Math.random() * charSet.length)].toUpperCase();
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
    <>
      <span className="sr-only">
        {text}
      </span>
      <span className="contents" aria-hidden>
        {animatedText}
      </span>
    </>
  );
};

export default TextGlitch;
