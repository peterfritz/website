import type { INowPlaying } from '@/service/spotify';

import { create } from 'zustand';

interface PlayerState {
  isOpen: boolean;
  id: string;
  name: string;
  setPlayer: (_song: Pick<INowPlaying, 'id' | 'name'>) => void;
  closePlayer: () => void;
}

const usePlayerStore = create<PlayerState>()((set) => ({
  isOpen: false,
  id: '',
  name: '',
  setPlayer: (song) => (
    set((state) => {
      if (state.isOpen && song.id === state.id) {
        return {
          isOpen: false,
        };
      }

      return {
        isOpen: true,
        id: song.id,
        name: song.name,
      };
    })
  ),
  closePlayer: () => (
    set({
      isOpen: false,
    })
  ),
}));

export default usePlayerStore;
