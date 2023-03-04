import usePlayerStore from '@/stores/player';
import {
  CloseButton,
  Dialog,
  Paper, Text,
} from '@mantine/core';
import { shallow } from 'zustand/shallow';

const Player = () => {
  const player = usePlayerStore((state) => ({
    closePlayer: state.closePlayer,
    isOpen: state.isOpen,
    name: state.name,
    id: state.id,
  }), shallow);

  return (
    <Dialog
      opened={player.isOpen}
      size="md"
      position={{
        bottom: 10,
        right: 10,
      }}
      p={10}
    >
      {player.isOpen && (
        <>
          <div className="flex items-center justify-between gap-2 pl-2 mb-[5px]">
            <Text size="xs" truncate>
              Spotify player
            </Text>
            <CloseButton
              onClick={() => player.closePlayer()}
            />
          </div>
          <Paper bg="#252525">
            <iframe
              title={`Spotify player for ${player.name}`}
              className="border-0 -mb-2 rounded-2xl"
              src={`https://open.spotify.com/embed/track/${player.id}?theme=0`}
              width="100%"
              height="80"
              allow="autoplay; clipboard-write; encrypted-media"
              loading="lazy"
            />
          </Paper>
        </>
      )}
    </Dialog>
  );
};

export default Player;
