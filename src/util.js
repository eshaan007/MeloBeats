export const playAudio = (isPlaying, audioRef) => {
    // Just to check if the song is playing or not when switching songs
  if (isPlaying) {
    const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.then(() => {
          audioRef.current.play();
        });
      }
    }
  };