import clsx from "clsx";
import { RefObject, useState } from "react";

type VideoProps = {
  src: string;
  type: string;
  controls?: boolean;
  className?: string;
  muted?: boolean;
  autoplay?: boolean;
  loop?: boolean;
  playsInline?: boolean;
  ref?: RefObject<HTMLVideoElement | null>;
  onPlay?: () => void;
  onPause?: () => void;
  onEnded?: () => void;
};

const Video = ({
  src,
  type,
  controls = true,
  className,
  muted = false,
  autoplay = false,
  loop = false,
  playsInline = true,
  ref,
  onPlay,
  onPause,
  onEnded,
}: VideoProps) => {
  const [videoSize, setVideoSize] = useState<{ width: number; height: number } | null>(null);

  if (!src) return null;

  return (
    <video
      ref={ref}
      controls={controls}
      onEnded={onEnded}
      onPlay={onPlay}
      onPause={onPause}
      onLoadedMetadata={(e) => {
        const { videoWidth, videoHeight } = e.target as HTMLVideoElement;
        setVideoSize({ width: videoWidth, height: videoHeight });
      }}
      className={clsx(
        "transition-opacity duration-1000",
        {
          "opacity-0": !videoSize,
          "opacity-100": videoSize,
        },
        className
      )}
      muted={muted || autoplay}
      autoPlay={autoplay}
      loop={loop}
      playsInline={playsInline}
    >
      <source src={src} type={type} />
    </video>
  );
};

export default Video;
