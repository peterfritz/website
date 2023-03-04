import type { PropsWithChildren } from 'react';

import {
  Grid,
} from '@mantine/core';
import Aside from './Aside';
import Header from './Header';

const Layout = ({ children }: PropsWithChildren) => (
  <Grid
    justify="center"
    align="stretch"
    gutter={0}
    className="h-full overflow-auto"
  >
    <Grid.Col span={12} sm={4} md={3}>
      <Header />
      <Aside />
    </Grid.Col>
    <Grid.Col span={12} sm={8} md={7} p={10}>
      <main className="h-full">
        {children}
      </main>
    </Grid.Col>
  </Grid>
);

export default Layout;
