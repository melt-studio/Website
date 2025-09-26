import clsx from "clsx";
// import { useStore } from "../stores/store";
import { useState } from "react";

type ImageProps = {
  src: string;
  width: number;
  height: number;
  alt?: string;
  cover?: boolean;
  className?: string;
};

const Image = ({ src, width, height, alt, className }: ImageProps) => {
  const [loaded, setLoaded] = useState(false);
  // const viewport = useStore((state) => state.viewport);

  // const imageAspect = width / height;
  // const viewportAspect = viewport.width / viewport.height;

  return (
    <img
      src={src}
      className={clsx(
        "transition-opacity duration-1000",
        {
          // "h-full w-auto": imageAspect < viewportAspect,
          // "h-auto w-full": imageAspect > viewportAspect,
          // "h-auto w-full": true,
          "opacity-0": !loaded,
          "opacity-100": loaded,
        },
        className
      )}
      loading="lazy"
      width={width}
      height={height}
      style={{ aspectRatio: width / height }}
      onLoad={() => setLoaded(true)}
      alt={alt}
    />
  );
};

export default Image;
