import {
  Group,
  Text,
  TextInput,
  UnstyledButton,
} from '@mantine/core';
import { useOs } from '@mantine/hooks';
import { openSpotlight } from '@mantine/spotlight';
import { FaSearch } from 'react-icons/fa';

const SearchBar = () => {
  const os = useOs();

  return (
    <UnstyledButton
      sx={(theme) => ({
        borderRadius: theme.radius.sm,
      })}
      aria-label="Pesquise"
      aria-keyshortcuts="control+shift+k ."
      onClick={() => openSpotlight()}
    >
      <TextInput
        placeholder="Pesquisar"
        icon={(
          <FaSearch />
        )}
        rightSection={(
          <Group
            spacing="xs"
            px={5}
            sx={(theme) => ({
              borderRadius: theme.radius.sm,
              backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[1],
            })}
            className="absolute right-[5px]"
          >
            <Text size="xs">
              {os === 'undetermined' || !(os === 'macos') ? 'Ctrl' : '⌘'}
            </Text>
            <Text size="sm">+</Text>
            <Text size="xs">
              K
            </Text>
          </Group>
        )}
        rightSectionWidth={80}
        styles={{
          root: {
            pointerEvents: 'none',
          },
        }}
        aria-hidden
        tabIndex={-1}
        readOnly
        className="relative"
      />
    </UnstyledButton>
  );
};

export default SearchBar;
