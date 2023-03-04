import type { PropsWithChildren } from 'react';

import { Affix, Paper } from '@mantine/core';

const Layout = ({ children }: PropsWithChildren) => (
  <>
    <Affix
      position={{
        top: 16,
        left: 16,
        right: 16,
      }}
    >
      <Paper
        withBorder
        p={8}
        sx={(theme) => ({
          maxWidth: theme.breakpoints.sm,
          backgroundColor: theme.colorScheme === 'dark' ? 'rgba(26, 27, 30, 0.5)' : 'rgba(255, 255, 255, 0.5)',
          backdropFilter: 'blur(0.5rem)',
        })}
        className="mx-auto z-50"
      >
        new header
      </Paper>
    </Affix>
    <main>
      {children}
    </main>
  </>
);

export default Layout;
