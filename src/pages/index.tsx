import Hero from '@/components/Hero';
import { Box } from '@mantine/core';
import { motion } from 'framer-motion';

const Home = () => (
  <>
    <Hero />
    <Box
      sx={(theme) => ({
        margin: '0 auto',
        maxWidth: theme.breakpoints.sm,
      })}
    >
      <motion.section
        initial={{ scale: 0.8 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
      >
        <p>Home</p>
      </motion.section>
    </Box>
  </>
);

export default Home;
