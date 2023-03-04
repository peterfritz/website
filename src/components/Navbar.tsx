import SearchBar from '@/components/SearchBar';
import {
  ActionIcon,
  Button,
  Divider,
  Group, Navbar as MantineNavbar, NavLink, Stack,
  Text,
  useMantineColorScheme,
} from '@mantine/core';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { FaMoon, FaSun } from 'react-icons/fa';

const NowPlaying = dynamic(() => (import('@/components/NowPlaying')));

const Navbar = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <MantineNavbar maw={300} className="top-0 sticky">
      <MantineNavbar.Section p={10}>
        <Group position="apart" align="center">
          <Text>
            Peter Fritz
          </Text>
          <ActionIcon
            variant="default"
            onClick={() => toggleColorScheme()}
          >
            {colorScheme === 'dark' ? (
              <FaSun />
            ) : (
              <FaMoon />
            )}
          </ActionIcon>
        </Group>
      </MantineNavbar.Section>
      <Divider />
      <MantineNavbar.Section p={10} grow>
        <Stack spacing="xs">
          <SearchBar />
          <NavLink
            label="Início"
            variant="light"
            color="gray"
            component={Link}
            href="/"
            active
          />
          <NavLink
            label="Blog"
            variant="light"
            color="gray"
            component={Link}
            href="/blog"
          />
          <NavLink
            label="Sobre"
            variant="light"
            color="gray"
            component={Link}
            href="about"
          />
          <NavLink
            label="Livro de visitas"
            variant="light"
            color="gray"
            component={Link}
            href="guestbook"
          />
        </Stack>
      </MantineNavbar.Section>
      <MantineNavbar.Section p={10}>
        <NowPlaying />
      </MantineNavbar.Section>
      <Divider />
      <MantineNavbar.Section p={10}>
        <Group grow>
          <Button variant="default">
            Me mande uma mensagem
          </Button>
        </Group>
      </MantineNavbar.Section>
    </MantineNavbar>
  );
};

export default Navbar;
