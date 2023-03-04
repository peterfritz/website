/* eslint-disable @next/next/no-img-element */

import type { INowPlaying } from '@/service/spotify';

const SpotifyImageTemplate = ({ nowPlaying }: { nowPlaying: INowPlaying }) => (
  <div
    style={{
      height: '100%',
      width: '100%',
      padding: '0 10vh',
      position: 'relative',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#fff',
      background: '#1c1c1c',
      color: '#f2f2f2',
      borderRadius: '3vh',
      fontFamily: 'JetBrains Mono',
    }}
  >
    <img
      alt=""
      style={{
        height: '80vh',
        borderRadius: '3vh',
      }}
      src={nowPlaying.image}
    />
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        marginLeft: '10vh',
        overflow: 'hidden',
        width: '100%',
      }}
    >
      <p
        style={{
          fontSize: 16,
          fontWeight: 200,
          marginBottom: -10,
        }}
      >
        Now playing
      </p>
      <p
        style={{
          fontSize: 25,
          fontWeight: 800,
          marginBottom: -10,
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
          overflow: 'hidden',
          width: '68%',
        }}
      >
        {nowPlaying.name}
      </p>
      <p
        style={{
          fontSize: 16,
          fontWeight: 600,
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
          overflow: 'hidden',
          width: '68%',
        }}
      >
        {nowPlaying.artists.map(({ name }) => name).join(', ')}
      </p>
    </div>
    <svg
      width="25"
      height="25"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        position: 'absolute',
        top: 10,
        right: 10,
      }}
    >
      <path
        d="M16 0C7.2 0 0 7.2 0 16C0 24.8 7.2 32 16 32C24.8 32 32 24.8 32 16C32 7.2 24.88 0 16 0ZM23.3613 23.12C23.0413 23.5987 22.4813 23.76 22 23.44C18.24 21.12 13.52 20.6387 7.91867 21.9187C7.36133 22.0813 6.88 21.68 6.72 21.2C6.56 20.6387 6.96 20.16 7.44 20C13.52 18.6387 18.8 19.2 22.96 21.76C23.52 22 23.5987 22.6387 23.3613 23.12V23.12ZM25.2813 18.72C24.88 19.28 24.16 19.52 23.5987 19.12C19.28 16.48 12.72 15.68 7.68 17.28C7.04133 17.44 6.32 17.12 6.16 16.48C6 15.84 6.32 15.1187 6.96 14.9587C12.8 13.2 20 14.0813 24.96 17.12C25.4413 17.3613 25.68 18.16 25.2813 18.72V18.72ZM25.4413 14.24C20.32 11.2 11.76 10.88 6.88 12.4013C6.08 12.64 5.28 12.16 5.04 11.44C4.8 10.6387 5.28 9.84 6 9.59867C11.68 7.91867 21.04 8.23867 26.9613 11.76C27.68 12.16 27.92 13.12 27.52 13.84C27.1213 14.4013 26.16 14.6387 25.4413 14.24V14.24Z"
        fill="#1ED760"
      />
    </svg>
  </div>
);

export default SpotifyImageTemplate;
