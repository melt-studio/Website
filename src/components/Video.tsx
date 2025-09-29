import clsx from "clsx";
import { useState } from "react";

type VideoProps = {
  src: string;
  controls?: boolean;
  className?: string;
  muted?: boolean;
  autoplay?: boolean;
  loop?: boolean;
  playsInline?: boolean;
};

const Video = ({
  src,
  controls = true,
  className,
  muted = false,
  autoplay = false,
  loop = false,
  playsInline = true,
}: VideoProps) => {
  const [videoSize, setVideoSize] = useState<{ width: number; height: number } | null>(null);

  return (
    <video
      src={src}
      controls={controls}
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
    />
  );
};

export default Video;
