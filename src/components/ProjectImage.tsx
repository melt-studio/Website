import clsx from "clsx";
import { ImageAirtable, Media } from "../types";
import Image from "./Image";
import Video from "./Video";
import { motion } from "motion/react";

const ProjectImage = ({ image }: { image: Media }) => {
  if (!image.type.includes("image/") && !image.type.includes("video/")) return null;

  const size = image.filename.match(/(\[|^)(medium)(\]|$)/g);
  const sz = size && size[size.length - 1];
  const position = image.filename.match(/(\[|^)(left|center|right)(\]|$)/g);
  const pos = position && position[position.length - 1];

  const getMedia = () => {
    if (image.type.includes("video/")) {
      return <Video src={image.url} />;
    }

    if (image.type.includes("image/")) {
      const { width, height } = image as ImageAirtable;
      return <Image src={image.url} width={width} height={height} />;
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
      className={clsx("h-fit relative", {
        "w-2/3": sz === "[medium]",
        "w-full": !sz,
        "mr-auto": sz && pos === "[left]",
        "ml-auto": sz && pos === "[right]",
        "mx-auto": (sz && !pos) || pos === "[center]",
      })}
    >
      {getMedia()}
    </motion.div>
  );
};

export default ProjectImage;
