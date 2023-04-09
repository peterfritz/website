import type { PropsWithChildren } from 'react';

import { Paper } from '@mantine/core';

const Layout = ({ children }: PropsWithChildren) => (
  <>
    <Paper
      withBorder
      p={8}
      sx={(theme) => ({
        maxWidth: theme.breakpoints.sm,
        backgroundColor: theme.colorScheme === 'dark' ? 'rgba(26, 27, 30, 0.5)' : 'rgba(255, 255, 255, 0.5)',
        backdropFilter: 'blur(0.5rem)',
        position: 'fixed',
        top: 16,
        left: 16,
        right: 16,
        zIndex: 100,
      })}
      className="mx-auto z-50"
    >
      new header
    </Paper>
    <section>
      {children}
    </section>
  </>
);

export default Layout;
