import { CSSProperties, useEffect, useRef, useState } from "react";
import { ImageAirtable, Media, VideoAirtable } from "../types";
import Image from "./Image";
import Video, { VideoSize } from "./Video";
import { useStore } from "../stores/store";
import clsx from "clsx";
import { motion, Easing, stagger, useScroll, useMotionValueEvent } from "motion/react";

type GalleryProps = {
  images: (Media & { caption?: string[] })[];
  title?: string;
  style?: CSSProperties;
};

const Gallery = ({ images, title, style }: GalleryProps) => {
  const container = useRef<HTMLDivElement | null>(null);
  const stickyContainer = useRef<HTMLDivElement | null>(null);
  const gallery = useRef<HTMLDivElement | null>(null);
  const ref = useRef<HTMLDivElement | null>(null);
  const viewport = useStore((state) => state.viewport);

  const [scrollable, setScrollable] = useState(0);
  const [width, setWidth] = useState(0);
  const [videoSize, setVideoSize] = useState<VideoSize>(null);

  useEffect(() => {
    if (!gallery.current || !container.current || !ref.current) return;

    container.current.scrollTo({ left: 0 });

    setWidth(gallery.current.offsetWidth);

    const scrollable = gallery.current.offsetWidth - container.current.offsetWidth;
    setScrollable(scrollable);

    const current = Number(gallery.current.dataset.current);
    gallery.current.style.transform = `translateX(${-current * scrollable}px)`;

    const top = viewport.height / 2 - gallery.current.offsetHeight / 2;
    if (stickyContainer.current) {
      stickyContainer.current.style.top = `${top}px`;
    }
  }, [viewport, images, videoSize]);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (!container.current || !gallery.current) return;
    gallery.current.dataset.current = `${current}`;
    gallery.current.style.transform = `translateX(${-current * scrollable}px)`;
  });

  if (images.length === 0) return null;

  const parentVariants = {
    hidden: {
      opacity: 0,
      transform: "translateY(40px)",
    },
    visible: {
      opacity: 1,
      transform: "translateY(0px)",
      transition: {
        duration: 1,
        delayChildren: stagger(0.25, { startDelay: 0 }),
        ease: "easeInOut" as Easing,
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, transform: "translateY(20px)" },
    visible: {
      opacity: 1,
      transform: "translateY(0px)",
      transition: {
        duration: 1,
        ease: "easeInOut" as Easing,
      },
    },
  };

  const videoAspect = (videoSize && videoSize.width / videoSize.height) || 1;

  const mediaSizing = (aspect: number) =>
    clsx("relative flex grow flex-col gap-2", {
      "w-[80dvw] md:w-[50dvw] max-w-[500px] h-fit": aspect < 1,
      "w-[calc((100dvw_-_30px)/1.25)] h-fit": aspect >= 1,
    });

  return (
    <motion.div
      viewport={{ amount: 0, once: true }}
      initial="hidden"
      whileInView="visible"
      className="flex flex-col w-full max-w-[2560px] mx-auto gap-2 h-[150dvh]"
      variants={parentVariants}
      style={{ ...style, height: width }}
      ref={ref}
    >
      <div
        className={clsx("flex flex-col gap-3 w-full overflow-x-hidden relative sticky", {
          "mt-3": !title,
        })}
        ref={stickyContainer}
      >
        {title && <div className="uppercase px-sm md:px-md">{title}</div>}

        <div className="overflow-x-hidden hide-scroll" ref={container}>
          <div className="flex gap-2.5 pb-5 px-2.5 w-fit items-start" ref={gallery} data-current="0">
            {images.map((image, i) => {
              if (image.type.includes("video/")) {
                const { id } = image as VideoAirtable & { caption?: string[] };
                return (
                  <motion.div
                    variants={childVariants}
                    key={`${id}_${i}`}
                    // className="w-[calc((100dvw_-_30px)/1.25)] h-fit flex grow flex-col gap-2"
                    className={mediaSizing(videoAspect)}
                  >
                    <Video
                      src={image.url}
                      autoplay
                      loop
                      muted
                      controls={false}
                      type={image.type}
                      setSize={setVideoSize}
                    />
                  </motion.div>
                );
              }

              if (image.type.includes("image/")) {
                const { id, thumbnails, caption } = image as ImageAirtable & { caption?: string[] };
                const aspect = thumbnails.large.width / thumbnails.large.height;
                return (
                  <motion.div variants={childVariants} key={`${id}_${i}`} className={mediaSizing(aspect)}>
                    <Image
                      src={thumbnails.large.url}
                      width={thumbnails.large.width}
                      height={thumbnails.large.height}
                      alt={caption?.join(" | ")}
                      className="w-full h-auto"
                    />
                    {caption && (
                      <div className="flex flex-col text-dark uppercase text-sm px-0.5">
                        {caption.map((caption) => (
                          <div key={`${caption}_${i}`}>{caption}</div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                );
              }

              return null;
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Gallery;
