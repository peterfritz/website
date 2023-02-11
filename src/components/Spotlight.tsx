import { useMantineColorScheme } from '@mantine/core';
import { SpotlightProvider, type SpotlightProviderProps } from '@mantine/spotlight';
import { useMemo } from 'react';
import { FaSearch } from 'react-icons/fa';

const Spotlight = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  const actions = useMemo<SpotlightProviderProps['actions']>(() => ([
    {
      group: 'Configurações',
      title: `Mudar para o tema ${colorScheme === 'dark' ? 'claro' : 'escuro'}`,
      onTrigger: () => {
        toggleColorScheme();
      },
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
  ]), [colorScheme]);

  return (
    <SpotlightProvider
      searchIcon={<FaSearch size={18} />}
      searchPlaceholder="Digite algo aqui..."
      shortcut={['mod + K', 'mod + shift + K', '.']}
      nothingFoundMessage="Nada encontrado..."
      overlayBlur={0}
      searchInputProps={{
        autoComplete: 'off',
      }}
      actions={actions}
    />
  );
};

export default Spotlight;
