import clsx from "clsx";
import { CSSProperties, RefObject, useState } from "react";

export type VideoSize = { width: number; height: number } | null;

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
  style?: CSSProperties;
  setSize?: (size: VideoSize) => void;
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
  style,
  setSize,
}: VideoProps) => {
  const [videoSize, setVideoSize] = useState<VideoSize>(null);

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
        const videoSize = { width: videoWidth, height: videoHeight };
        setVideoSize(videoSize);
        if (ref && ref.current) ref.current.style.aspectRatio = `${videoWidth}/${videoHeight}`;
        if (setSize) setSize(videoSize);
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
      style={style}
    >
      <source src={src} type={type} />
    </video>
  );
};

export default Video;
