import { ImageAirtable, Media } from "../types";
import Video from "./Video";
import Image from "./Image";
import { ReactNode } from "react";
import clsx from "clsx";

type CoverProps = {
  media?: Media[];
  className?: string;
  children?: ReactNode;
};

const Cover = ({ media, className, children }: CoverProps) => {
  if (!media || !media[0]) return null;

  const getMedia = () => {
    const { type, url } = media[0];

    if (type.includes("video/")) {
      return <Video src={url} className="object-cover w-full h-full" muted autoplay loop controls={false} />;
    }

    if (type.includes("image/")) {
      const { width, height } = media[0] as ImageAirtable;
      return (
        <Image
          src={url}
          width={width}
          height={height}
          className={clsx(
            "object-cover",
            {
              "w-full h-full": width / height > 1,
            },
            className
          )}
        />
      );
    }

    return null;
  };

  return (
    <div
      className="flex items-center justify-center w-full h-fit md:h-screen relative z-2 pt-12 md:pt-0 relative"
      key={media[0].url}
    >
      {getMedia()}
      {children}
    </div>
  );
};

export default Cover;
