import { ImageAirtable, Media } from "../types";
import Video from "./Video";
import Image from "./Image";
import { ReactNode } from "react";
// import FadeScroll from "./FadeScroll";
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
      return <Video src={url} />;
    }

    if (type.includes("image/")) {
      const { width, height } = media[0] as ImageAirtable;
      return <Image src={url} width={width} height={height} className={clsx("object-cover", className)} />;
    }

    return null;
  };

  return (
    // <FadeScroll className="z-2">
    <div
      className="flex items-center justify-center w-full h-fit md:h-screen relative z-2 pt-12 md:pt-0 relative"
      key={media[0].url}
    >
      {getMedia()}
      {children}
    </div>
    // </FadeScroll>
  );
};

export default Cover;
