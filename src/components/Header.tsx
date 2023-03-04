import { Burger, Drawer } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Navbar from './Navbar';

const Header = () => {
  const [opened, { toggle, close }] = useDisclosure(false);

  return (
    <header className="block sm:hidden">
      <Burger
        opened={opened}
        onClick={() => toggle()}
        title={opened ? 'Fechar navegação' : 'Abrir navegação'}
      />
      <Drawer
        opened={opened}
        onClose={() => close()}
        title="Register"
        padding="xl"
        size="xl"
      >
        <Navbar />
      </Drawer>
    </header>
  );
};

export default Header;
