import Hero from '@/components/Hero';
import { Box, Title } from '@mantine/core';

const Home = () => (
  <>
    <Hero />
    <Box
      sx={(theme) => ({
        margin: '0 auto',
        maxWidth: theme.breakpoints.sm,
      })}
    >
      <main id="main">
        <Title>Home</Title>
      </main>
    </Box>
  </>
);

export default Home;
