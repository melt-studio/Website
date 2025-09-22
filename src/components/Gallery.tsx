import { useEffect, useRef, useState } from "react";
import { ImageAirtable, Media, VideoAirtable } from "../types";
import Image from "./Image";
import Video from "./Video";
import { useStore } from "../stores/store";
import clsx from "clsx";

type GalleryProps = {
  images: (Media & { caption?: string[] })[];
  title?: string;
};

type Layout = {
  left: number;
  width: number;
  overflow: boolean;
};

const Gallery = ({ images, title }: GalleryProps) => {
  const container = useRef<HTMLDivElement | null>(null);
  const gallery = useRef<HTMLDivElement | null>(null);
  const viewport = useStore((state) => state.viewport);

  const [current, setCurrent] = useState(0);
  const [overflow, setOverflow] = useState(false);
  const [max, setMax] = useState(false);

  const [layout, setLayout] = useState<Layout[]>([]);

  useEffect(() => {
    if (!gallery.current || !container.current) return;
    if (viewport.width < gallery.current.offsetWidth) setOverflow(true);
    else setOverflow(false);

    container.current.scrollTo({ left: 0 });
    setCurrent(0);

    const nodes = gallery.current.childNodes as NodeListOf<HTMLDivElement>;
    setLayout(
      [...nodes].map((node) => {
        const rect = node.getBoundingClientRect();

        return {
          left: rect.left,
          width: rect.width,
          overflow: rect.left > viewport.width,
        };
      })
    );

    setMax(false);
  }, [viewport]);

  const handlePrev = () => {
    if (!container.current || !gallery.current || !layout || current === 0) return;

    const prev = layout[current - 1];

    setCurrent(current - 1);
    container.current.scrollTo({ left: prev.left - 10, behavior: "smooth" });
    setMax(false);
  };

  const handleNext = () => {
    if (!container.current || !gallery.current || !layout || current === images.length - 1) return;

    const scrollable = gallery.current.offsetWidth - container.current.offsetWidth;
    const next = layout[current + 1];

    if (next.left > scrollable) {
      const available = scrollable - container.current.scrollLeft;
      if (available > 0) {
        container.current.scrollTo({ left: scrollable, behavior: "smooth" });
        setCurrent(current + 1);
      }
      setMax(true);
    } else {
      setCurrent(current + 1);
      container.current.scrollTo({ left: next.left - 10, behavior: "smooth" });
      setMax(false);
    }
  };

  if (!images) return null;

  return (
    <div className="flex flex-col gap-4 w-full">
      {title && <div className="uppercase px-sm md:px-md">{title}</div>}
      <div className="flex flex-col gap-0 w-full overflow-x-hidden relative">
        <div className="overflow-x-scroll hide-scroll" ref={container}>
          <div className="flex gap-2.5 pb-5 px-2.5 w-fit items-center" ref={gallery}>
            {images.map((image, i) => {
              if (image.type.includes("video/")) {
                const { id } = image as VideoAirtable & { caption?: string[] };
                return (
                  <div key={`${id}_${i}`} className="w-[calc(100dvw_-_20px)] h-fit flex grow flex-col gap-2">
                    <Video src={image.url} autoplay loop muted controls={false} />
                  </div>
                );
              }

              if (image.type.includes("image/")) {
                const { id, thumbnails, caption } = image as ImageAirtable & { caption?: string[] };
                const aspect = thumbnails.large.width / thumbnails.large.height;
                return (
                  <div
                    key={`${id}_${i}`}
                    className={clsx("relative flex grow flex-col gap-2", {
                      "w-[50dvw] md:w-[33dvw] max-w-[400px] h-fit": aspect < 1,
                      "w-[calc(100dvw_-_20px)] h-auto": aspect >= 1,
                    })}
                  >
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
                  </div>
                );
              }

              return null;
            })}
          </div>
        </div>
        {overflow && (
          <div className="flex gap-2 px-sm md:px-md justify-end">
            <div
              onClick={handlePrev}
              className={clsx(
                "w-10 h-10 cursor-pointer rounded-full bg-light flex items-center justify-center transition-all",
                {
                  "opacity-30": current === 0,
                  "hover:bg-light/85 active:bg-light/70": current !== 0,
                }
              )}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                className="size-6 stroke-dark"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
              </svg>
            </div>
            <div
              onClick={handleNext}
              className={clsx(
                "w-10 h-10 cursor-pointer rounded-full bg-light flex items-center justify-center transition-all",
                {
                  "opacity-30": max,
                  "hover:bg-light/85 active:bg-light/70": !max,
                }
              )}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                className="size-6 stroke-dark"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
              </svg>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;
