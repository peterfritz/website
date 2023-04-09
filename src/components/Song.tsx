import type { Track } from '@/service/spotify';

import usePlayerStore from '@/stores/player';
import {
  Paper,
  Skeleton,
  Text, UnstyledButton,
} from '@mantine/core';
import Image from 'next/image';
import { CSSProperties, useMemo } from 'react';
import { FaPlay, FaStop } from 'react-icons/fa';
import { shallow } from 'zustand/shallow';

interface Props {
  nowPlaying?: Track;
  style?: CSSProperties;
}

const Song = ({ nowPlaying, style }: Props) => {
  const player = usePlayerStore((state) => ({
    setPlayer: state.setPlayer,
    isOpen: state.isOpen,
    id: state.id,
  }), shallow);

  const [isLoading, song] = useMemo(() => ([
    !nowPlaying,
    {
      id: nowPlaying ? nowPlaying.id : '',
      name: nowPlaying ? nowPlaying.name : 'Loading...',
      image: nowPlaying ? nowPlaying.image : '',
      artists: nowPlaying ? nowPlaying.artists.map(({ name }) => name).join(', ') : 'Loading...',
      explicit: nowPlaying ? nowPlaying.explicit : false,
      trackUrl: nowPlaying ? nowPlaying.trackUrl : '',
    },
  ]), [nowPlaying]);

  return (
    <Paper
      withBorder
      className="overflow-hidden"
      style={style}
    >
      <div className="flex items-center gap-2 pr-2 w-full group">
        <div className="w-1/8 aspect-square relative bg-black">
          <Skeleton visible={isLoading} radius={0}>
            <Image
              height={100}
              width={100}
              src={song.image}
              alt=""
              className="min-w-full h-full aspect-square group-hover:opacity-50 transition-opacity"
            />
          </Skeleton>
          <UnstyledButton
            className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={() => player.setPlayer(song)}
          >
            <span aria-hidden className="text-[#f2f2f2]">
              { player.id !== song.id || !player.isOpen ? (
                <FaPlay />
              ) : (
                <FaStop />
              )}
            </span>
            <span className="sr-only">
              { player.id !== song.id || !player.isOpen ? (
                'Play'
              ) : (
                'Stop'
              )}
            </span>
          </UnstyledButton>
        </div>
        <div className="flex flex-col w-full overflow-hidden">
          <Skeleton visible={isLoading}>
            <Text lh={1.35} size="xs" weight="normal">
              Agora estou ouvindo a
            </Text>
          </Skeleton>
          <Skeleton visible={isLoading}>
            <Text lh={1.35} size="sm" weight="bolder" truncate title={song.name}>
              {song.name}
              &nbsp;
            </Text>
          </Skeleton>
          <Skeleton visible={isLoading}>
            <Text lh={1.35} size="xs" weight="bold" truncate title={song.artists}>
              {song.artists}
              &nbsp;
            </Text>
          </Skeleton>
        </div>
      </div>
    </Paper>
  );
};

Song.defaultProps = {
  nowPlaying: {
    id: '',
    name: '',
    image: '',
    artists: [],
    explicit: false,
    trackUrl: '',
  },
  style: {},
};

export default Song;
