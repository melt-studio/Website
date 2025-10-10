import clsx from "clsx";
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

  if (!src) return null;

  return (
    <img
      src={src}
      className={clsx(
        "transition-opacity duration-1000",
        {
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
