import SearchBar from '@/components/SearchBar';
import {
  ActionIcon,
  Button,
  Divider,
  Group, Navbar, NavLink, Stack,
  Text,
  useMantineColorScheme,
} from '@mantine/core';
import Link from 'next/link';
import { FaMoon, FaSun } from 'react-icons/fa';

const Aside = ({ className }: { className?: HTMLElement['className'] }) => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <aside className={`isolate h-full ${className}`}>
      <Navbar maw={300} className="top-0 sticky">
        <Navbar.Section p={10}>
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
        </Navbar.Section>
        <Divider />
        <Navbar.Section p={10} grow>
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
        </Navbar.Section>
        <Divider />
        <Navbar.Section p={10}>
          <Group grow>
            <Button variant="default">
              Me mande uma mensagem
            </Button>
          </Group>
        </Navbar.Section>
      </Navbar>
    </aside>
  );
};

Aside.defaultProps = {
  className: '',
};

export default Aside;
