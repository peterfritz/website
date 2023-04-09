import { Button } from '@mantine/core';

const SkipButton = () => (
  <Button
    component="a"
    href="#main"
    styles={{
      root: {
        position: 'absolute',
        left: '50%',
        transition: 'opacity 0.25s, transform 0.5s',
        transform: 'translateX(-50%) translateY(-5rem)',
        opacity: '0%',
        pointerEvents: 'none',
        cursor: 'initial',
        zIndex: 150,
        '&:focus-visible': {
          transform: 'translateX(-50%) translateY(1.2rem)',
          opacity: '100%',
          pointerEvents: 'auto',
          cursor: 'pointer',
        },
      },
    }}
  >
    Skip to content
  </Button>
);

export default SkipButton;
