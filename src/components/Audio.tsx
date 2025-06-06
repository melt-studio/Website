import { useRef, useState } from "react";
import track from "../assets/audio/meditation.mp3";

const Audio = () => {
  const audioRef = useRef<HTMLAudioElement>(null);

  const [paused, setPaused] = useState(true);

  const handlePlayback = () => {
    if (paused) audioRef.current?.play();
    else audioRef.current?.pause();

    setPaused(!paused);
  };

  return (
    <>
      <button
        onClick={handlePlayback}
        className={`control cursor-pointer px-6 ${
          paused
            ? "bg-white/10 hover:bg-white/40"
            : "bg-white/30 hover:bg-white/40"
        }`}
      >
        Meditate
      </button>

      <audio ref={audioRef} src={track} hidden loop />
    </>
  );
};

export default Audio;
