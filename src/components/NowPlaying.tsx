import type { Track } from '@/service/spotify';

import Song from '@/components/Song';
import fetcher from '@/utils/fetcher';
import { Transition } from '@mantine/core';
import useSWR from 'swr';

const NowPlaying = () => {
  const { data } = useSWR<Track | null>('/api/spotify/now-playing', fetcher, {
    refreshInterval: 60 * 1000,
  });

  return (
    <Transition
      mounted={!!data}
      transition="fade"
      duration={500}
      timingFunction="ease"
    >
      {(styles) => (
        <Song
          nowPlaying={data || undefined}
          style={styles}
        />
      )}
    </Transition>
  );
};

export default NowPlaying;
