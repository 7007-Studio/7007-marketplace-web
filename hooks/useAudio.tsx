
import { useState, useEffect,Dispatch,SetStateAction } from "react";

const useAudio = (url: string): [boolean, Dispatch<SetStateAction<boolean>>] => {
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Initialize audio only once and add event listener
    const audioTune = new Audio(url);
    setAudio(audioTune);

    const handleEnded = () => setIsPlaying(false);
    audioTune.addEventListener('ended', handleEnded);

    // Cleanup function to remove the event listener
    return () => {
      audioTune.removeEventListener('ended', handleEnded);
      audioTune.pause();
    };
  }, []);

  useEffect(() => {
    // Control play/pause when isPlaying changes
    if (isPlaying) {
      audio?.play().catch((e) => console.error("Error playing audio:", e));
    } else {
      audio?.pause();
    }
  }, [isPlaying]);

  return [isPlaying, setIsPlaying];
};

export default useAudio;