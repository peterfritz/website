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
        placeholder="Pesquise"
        icon={(
          <FaSearch />
        )}
        rightSection={(
          <Group
            spacing="xs"
            position="right"
            mr={5}
            px={5}
            bg="dark"
            sx={(theme) => ({
              borderRadius: theme.radius.sm,
            })}
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
      />
    </UnstyledButton>
  );
};

export default SearchBar;
