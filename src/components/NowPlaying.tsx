import type { INowPlaying } from '@/service/spotify';

import usePlayerStore from '@/stores/player';
import fetcher from '@/utils/fetcher';
import {
  Paper,
  Skeleton,
  Text,
  Transition,
  UnstyledButton,
} from '@mantine/core';
import Image from 'next/image';
import { useMemo } from 'react';
import { FaPlay, FaStop } from 'react-icons/fa';
import useSWR from 'swr';
import { shallow } from 'zustand/shallow';

const NowPlaying = () => {
  const player = usePlayerStore((state) => ({
    setPlayer: state.setPlayer,
    isOpen: state.isOpen,
    id: state.id,
  }), shallow);

  const { data } = useSWR<INowPlaying | null>('/api/spotify/now-playing', fetcher, {
    refreshInterval: 60 * 1000,
  });

  const [isPlaying, nowPlaying] = useMemo(() => ([
    !!data,
    {
      id: data ? data.id : '',
      name: data ? data.name : 'Loading...',
      image: data ? data.image : '',
      artists: data ? data.artists.map(({ name }) => name).join(', ') : 'Loading...',
      explicit: data ? data.explicit : false,
      trackUrl: data ? data.trackUrl : '',
    },
  ]), [data]);

  return (
    <Transition
      mounted={isPlaying}
      transition="fade"
      duration={500}
      timingFunction="ease"
    >
      {(styles) => (
        <Paper
          withBorder
          className="overflow-hidden"
          style={styles}
        >
          <div className="flex items-center gap-2 pr-2 w-full group">
            <div className="w-1/8 aspect-square relative bg-black">
              <Skeleton visible={!isPlaying} radius={0}>
                <Image
                  height={100}
                  width={100}
                  src={nowPlaying.image}
                  alt=""
                  className="min-w-full h-full aspect-square group-hover:opacity-50 transition-opacity"
                />
              </Skeleton>
              <UnstyledButton
                className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => player.setPlayer(nowPlaying)}
              >
                <span aria-hidden className="text-[#f2f2f2]">
                  { player.id !== nowPlaying.id || !player.isOpen ? (
                    <FaPlay />
                  ) : (
                    <FaStop />
                  )}
                </span>
                <span className="sr-only">
                  { player.id !== nowPlaying.id || !player.isOpen ? (
                    'Play'
                  ) : (
                    'Stop'
                  )}
                </span>
              </UnstyledButton>
            </div>
            <div className="flex flex-col w-full overflow-hidden">
              <Skeleton visible={!isPlaying}>
                <Text lh={1.35} size="xs" weight="normal">
                  Agora estou ouvindo a
                </Text>
              </Skeleton>
              <Skeleton visible={!isPlaying}>
                <Text lh={1.35} size="sm" weight="bolder" truncate title={nowPlaying.name}>
                  {nowPlaying.name}
                    &nbsp;
                </Text>
              </Skeleton>
              <Skeleton visible={!isPlaying}>
                <Text lh={1.35} size="xs" weight="bold" truncate title={nowPlaying.artists}>
                  {nowPlaying.artists}
                    &nbsp;
                </Text>
              </Skeleton>
            </div>
          </div>
        </Paper>
      )}
    </Transition>
  );
};

export default NowPlaying;
