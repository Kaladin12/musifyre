import React, { useRef } from 'react';
import ReactPlayer from 'react-player';

const SongPlayer = ({ url, startingSecond }) => {
  const playerRef = useRef(null);

  const handleReady = () => {
    if (playerRef.current) {
      playerRef.current.seekTo(startingSecond, 'seconds');
    }
  };

  return (
    <ReactPlayer
      ref={playerRef}
      url={url}
      controls
      playing
      onReady={handleReady}
    />
  );
};

export default SongPlayer;