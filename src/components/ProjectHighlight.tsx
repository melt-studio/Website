import { ImageAirtable, ProjectFormatted } from "../types";
import Image from "./Image";
import { useStore } from "../stores/store";
import { CSSProperties, HTMLAttributes, useEffect } from "react";
import clsx from "clsx";
import { Link } from "react-router";
import Video from "./Video";
import { themeColors } from "../helpers/utils";
import { motion } from "motion/react";
import useObserver from "../helpers/useObserver";

interface ProjectHighlightProps extends HTMLAttributes<HTMLDivElement> {
  project: ProjectFormatted;
  index: number;
  updateActive: (index: number, position: string) => void;
  className?: string;
}

const getThumbPos = (thumbnail: ImageAirtable | undefined): CSSProperties => {
  if (!thumbnail) return {};

  const { filename } = thumbnail;

  const posExp = /(\[|^)(left|center|right)(\]|$)/g;
  const position = filename.match(posExp);
  const pos = position && position[position.length - 1];

  const posXExp = /(\[|^)(x\d{1,3})(\]|$)/g;
  const posYExp = /(\[|^)(y\d{1,3})(\]|$)/g;
  const positionX = filename.match(posXExp);
  const positionY = filename.match(posYExp);
  const posX = positionX && positionX[positionX.length - 1];
  const posY = positionY && positionY[positionY.length - 1];
  const pX = posX ? posX.replace(/[[x\]]/g, "") : null;
  const pY = posY ? posY.replace(/[[y\]]/g, "") : null;

  let objectPos = null;
  if ((pX && !isNaN(Number(pX))) || (pY && !isNaN(Number(pY)))) {
    objectPos = `${Math.min(Math.max(Number(pX), 0), 100) || 0}% ${Math.min(Math.max(Number(pY), 0), 100) || 0}%`;
  } else if (pos) {
    if (pos === "[right]") objectPos = "right";
    else if (pos === "[left]") objectPos = "left";
  }

  return objectPos ? { objectPosition: objectPos } : {};
};

const ProjectHighlight = ({ project, index, updateActive, className }: ProjectHighlightProps) => {
  const background = useStore((state) => state.background);
  const gradient = useStore((state) => state.gradient);

  let thumb,
    thumbnail = null;
  if (project.fields.highlightThumbnail && project.fields.highlightThumbnail.length > 0) {
    thumb = project.fields.highlightThumbnail[0];
    if (thumb.type.includes("video/")) thumbnail = thumb;
    else if (thumb.type.includes("image/")) thumbnail = thumb.thumbnails.large;
  }

  const [ref, position] = useObserver<HTMLDivElement>({
    amount: index === 0 ? 0 : 0.1,
    once: false,
  });

  useEffect(() => {
    updateActive(index, position.current);
  }, [position, updateActive, index]);

  const objectPos = getThumbPos(thumb);

  const handleMouseEnter = () => {
    if (!background || !gradient || location.pathname !== "/") return null;

    gradient.style.backgroundColor = project.theme[0];
    gradient.style.borderColor = project.theme[1];
  };

  const handleMouseLeave = () => {
    if (!background || !gradient || location.pathname !== "/") return null;

    gradient.style.backgroundColor = themeColors.light.hex;
    gradient.style.borderColor = themeColors.light.hex;
  };

  const style: CSSProperties = {};

  if (thumbnail && thumbnail.width && thumbnail.height) {
    style.aspectRatio = thumbnail.width / thumbnail.height;
  }

  // const tileVariants = {
  //   hidden: {
  //     opacity: 0,
  //     transform: scrollDirection === "down" ? "translateY(-100px)" : "translateY(100px)",
  //   },
  //   visible: {
  //     opacity: 1,
  //     transform: "translateY(0px)",
  //   },
  // };

  return (
    <motion.div
      ref={ref}
      // variants={tileVariants}
      // transition={{ duration: 2, delay: 0, ease: "easeInOut" }}
      // viewport={{ amount: 0, once: false }}
      // whileInView="visible"
      // initial="hidden"
      className={clsx(
        "cursor-pointer overflow-hidden flex items-center justify-center h-[100vh] w-full bg-mid sticky top-0",
        className
      )}
      style={style}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link
        to={`/works/${project.fields.projectUrl.toLowerCase()}`}
        className="w-full h-full relative flex items-center justify-center group overflow-hidden "
      >
        <div className="scale-101 group-hover:scale-105 transition-transform duration-2000 relative flex items-center justify-center w-full h-full">
          {thumb && thumb.type.includes("image/") && thumbnail && (
            <Image
              src={thumbnail.url}
              alt={project.fields.name}
              width={thumbnail.width}
              height={thumbnail.height}
              className="w-full h-full object-cover"
              loading="lazy"
              style={objectPos}
            />
          )}
          {thumb && thumb.type.includes("video/") && thumbnail && (
            <Video
              src={thumbnail.url}
              autoplay
              loop
              muted
              controls={false}
              type={thumb.type}
              className="w-full h-full object-cover"
              style={objectPos}
              // style={{ clipPath: "inset(2px 2px)" }}
            />
          )}
        </div>
      </Link>
    </motion.div>
  );
};

export default ProjectHighlight;
