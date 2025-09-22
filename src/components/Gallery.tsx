import { ImageAirtable, Media, VideoAirtable } from "../types";
import Image from "./Image";
import Video from "./Video";

type GalleryProps = {
  images: (Media & { caption?: string[] })[];
  title?: string;
};

const Gallery = ({ images, title }: GalleryProps) => {
  return (
    <div className="flex flex-col gap-4 w-full overflow-x-hidden relative">
      {title && <div className="uppercase px-sm md:px-md">{title}</div>}
      <div className="overflow-x-scroll">
        <div className="flex gap-2 pb-5 px-2 md:px-4 w-fit items-start">
          {images.map((image, i) => {
            if (image.type.includes("video/")) {
              const { id } = image as VideoAirtable & { caption?: string[] };
              return <Video key={`${id}_${i}`} src={image.url} />;
            }

            if (image.type.includes("image/")) {
              const { id, thumbnails, caption } = image as ImageAirtable & { caption?: string[] };
              return (
                <div key={`${id}_${i}`} className="relative w-[50dvw] md:w-[33dvw] max-w-[400px] h-fit flex grow">
                  <Image
                    src={thumbnails.large.url}
                    width={thumbnails.large.width}
                    height={thumbnails.large.height}
                    alt={caption?.join(" | ")}
                    className="w-full h-auto"
                  />
                  {caption && (
                    <div className="flex flex-col absolute bottom-0 left-0 text-light p-sm uppercase text-xs">
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
    </div>
  );
};

export default Gallery;
