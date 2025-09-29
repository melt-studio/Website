import clsx from "clsx";
import { ImageAirtable, Media } from "../types";
import Image from "./Image";
import Video from "./Video";
import { motion } from "motion/react";
import { useStore } from "../stores/store";

const ProjectImage = ({ image }: { image: Media }) => {
  const viewport = useStore((state) => state.viewport);

  if (!image.type.includes("image/") && !image.type.includes("video/")) return null;

  const size = image.filename.match(/(\[|^)(medium)(\]|$)/g);
  const sz = viewport.width >= 768 && size && size[size.length - 1];
  const position = image.filename.match(/(\[|^)(left|center|right)(\]|$)/g);
  const pos = position && position[position.length - 1];

  const getMedia = () => {
    if (image.type.includes("video/")) {
      return <Video src={image.url} className="w-full h-auto max-h-[90dvh]" />;
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
            // "object-contain": !sz && landscape,
            // "h-full w-auto": !sz && !landscape,
            "w-auto h-full": (sz && !landscape) || !sz,
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
      className="h-fit relative px-2.5 w-full max-h-[90dvh] flex items-center justify-center"
    >
      {getMedia()}
    </motion.div>
  );
};

export default ProjectImage;
