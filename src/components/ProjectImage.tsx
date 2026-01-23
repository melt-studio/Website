import clsx from "clsx";
import { ImageAirtable, Media } from "../types";
import Image from "./Image";
import Video from "./Video";
import { motion } from "motion/react";
import { useStore } from "../stores/store";
import { CSSProperties, useRef, useState } from "react";

type ProjectImageProps = { image: Media; style?: CSSProperties };

const ProjectImage = ({ image, style }: ProjectImageProps) => {
  const video = useRef<HTMLVideoElement | null>(null);
  const viewport = useStore((state) => state.viewport);
  const [paused, setPaused] = useState(true);

  if (!image || (!image.type.includes("image/") && !image.type.includes("video/"))) return null;

  const size = image.filename.match(/(\[|^)(small|medium)(\]|$)/g);
  const sz = viewport.width >= 768 && size && size[size.length - 1];
  const position = image.filename.match(/(\[|^)(left|center|right)(\]|$)/g);
  const pos = position && position[position.length - 1];

  const getMedia = () => {
    if (image.type.includes("video/")) {
      const landscape = image.filename.match(/(\[|^)(landscape)(\]|$)/g);

      return (
        <div
          className={clsx("relative group", {
            "w-fit h-full max-h-[90dvh]": !landscape,
            "w-full h-fit": landscape,
            "mr-auto": pos === "[left]",
            "ml-auto": pos === "[right]",
            "mx-auto": pos === "[center]",
          })}
        >
          <Video
            src={`${image.url}#t=0.001`}
            className={landscape ? "w-full h-fit" : "w-fit h-full"}
            type={image.type}
            ref={video}
            onEnded={() => setPaused(true)}
            onPlay={() => setPaused(false)}
            onPause={() => setPaused(true)}
            controls={false}
            autoplay
            loop
          />

          <div
            className="absolute inset-0 cursor-pointer"
            onClick={() => {
              if (!video.current) return;
              if (paused) {
                video.current.play();
                setPaused(false);
              } else {
                video.current.pause();
                setPaused(true);
              }
            }}
          >
            <div className={clsx("flex items-center justify-center h-full")}>
              <div
                className={clsx(
                  "w-15 h-15 rounded-full transition-all duration-500 border-2 border-light group-hover:scale-110 flex items-center justify-center",
                  {
                    "opacity-100": paused,
                    "opacity-0 group-hover:opacity-100": !paused,
                  }
                )}
              >
                {paused && (
                  <svg
                    width="13"
                    height="15"
                    viewBox="0 0 13 15"
                    xmlns="http://www.w3.org/2000/svg"
                    className="fill-light relative left-0.5"
                  >
                    <path d="M0 13.4915V1.00153C0 0.226671 0.843201 -0.253787 1.5098 0.141236L12.0483 6.38625C12.7019 6.77356 12.7019 7.71951 12.0483 8.10683L1.5098 14.3518C0.8432 14.7469 0 14.2664 0 13.4915Z" />
                  </svg>
                )}
                {!paused && (
                  <svg
                    width="12"
                    height="16"
                    viewBox="0 0 12 16"
                    xmlns="http://www.w3.org/2000/svg"
                    className="fill-light"
                  >
                    <path d="M0 1.5C0 0.671573 0.671573 0 1.5 0C2.32843 0 3 0.671573 3 1.5V14.5C3 15.3284 2.32843 16 1.5 16C0.671573 16 0 15.3284 0 14.5V1.5Z" />
                    <path d="M9 1.5C9 0.671573 9.67157 0 10.5 0C11.3284 0 12 0.671573 12 1.5V14.5C12 15.3284 11.3284 16 10.5 16C9.67157 16 9 15.3284 9 14.5V1.5Z" />
                  </svg>
                )}
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (image.type.includes("image/")) {
      const { width, height } = image as ImageAirtable;
      const landscape = width / height > 1;

      return (
        <Image
          src={image.url}
          width={width}
          height={height}
          className={clsx("", {
            "w-2/3": sz === "[medium]" && landscape,
            "w-2/5": sz === "[small]" && landscape,
            "w-full h-auto": !sz && landscape,
            "h-full max-h-[90dvh] w-auto": !sz && !landscape,
            "w-auto h-full": sz && !landscape,
            "mr-auto": pos === "[left]",
            "ml-auto": pos === "[right]",
            "mx-auto": pos === "[center]",
          })}
        />
      );
    }

    return null;
  };

  return (
    <motion.div
      key={image.id}
      viewport={{ amount: 0.5, once: true }}
      transition={{ duration: 2, delay: 0, ease: "easeInOut" }}
      initial={{ opacity: 0, transform: "translateY(40px)" }}
      whileInView={{ opacity: 1, transform: "translateY(0px)" }}
      className="h-fit relative px-2.5 w-full h-fit flex items-center justify-center"
      style={style}
    >
      {getMedia()}
    </motion.div>
  );
};

export default ProjectImage;
