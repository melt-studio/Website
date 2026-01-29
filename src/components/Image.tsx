import clsx from "clsx";
import { CSSProperties, useState } from "react";

type ImageProps = {
  src: string;
  width: number;
  height: number;
  alt?: string;
  cover?: boolean;
  className?: string;
  loading?: "eager" | "lazy" | undefined;
  style?: CSSProperties;
};

const Image = ({ src, width, height, alt, loading = "eager", className, style = {} }: ImageProps) => {
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
      width={width}
      height={height}
      style={{ aspectRatio: width / height, ...style }}
      onLoad={() => setLoaded(true)}
      alt={alt}
      loading={loading}
    />
  );
};

export default Image;
