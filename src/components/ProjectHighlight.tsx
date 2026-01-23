import { ProjectFormatted } from "../types";
import Image from "./Image";
import { useStore } from "../stores/store";
import { CSSProperties, HTMLAttributes } from "react";
import clsx from "clsx";
import { Link } from "react-router";
import Video from "./Video";
import { themeColors } from "../helpers/utils";
import { motion } from "motion/react";
import { ScrollDirection } from "./ProjectHighlights";

interface ProjectHighlightProps extends HTMLAttributes<HTMLDivElement> {
  project: ProjectFormatted;
  scrollDirection: ScrollDirection;
  className?: string;
}

const ProjectHighlight = ({ project, scrollDirection, className }: ProjectHighlightProps) => {
  const background = useStore((state) => state.background);
  const gradient = useStore((state) => state.gradient);

  let thumb,
    thumbnail = null;
  if (project.fields.highlightThumbnail && project.fields.highlightThumbnail.length > 0) {
    thumb = project.fields.highlightThumbnail[0];
    if (thumb.type.includes("video/")) thumbnail = thumb;
    else if (thumb.type.includes("image/")) thumbnail = thumb.thumbnails.large;
  }

  const position = thumb ? thumb.filename.match(/(\[|^)(left|center|right)(\]|$)/g) : null;
  const pos = position && position[position.length - 1];

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

  const tileVariants = {
    hidden: {
      opacity: 0,
      transform: scrollDirection === "down" ? "translateY(-100px)" : "translateY(100px)",
    },
    visible: {
      opacity: 1,
      transform: "translateY(0px)",
    },
  };

  const thumbClassName = clsx("w-full h-full object-cover", {
    "object-right": pos === "[right]",
    "object-left": pos === "[left]",
  });

  return (
    <motion.div
      variants={tileVariants}
      transition={{ duration: 2, delay: 0, ease: "easeInOut" }}
      viewport={{ amount: 0, once: false }}
      whileInView="visible"
      initial="hidden"
      className={clsx(
        "cursor-pointer overflow-hidden relative flex items-center justify-center h-[40vh] md:h-[50vh] lg:h-[60vh] xl:h-[75vh] 2xl:h-[90vh] w-full rounded-[20px] md:rounded-[50px] md:hover:rounded-[100px] [transition:border-radius_1s] bg-mid",
        className
      )}
      style={style}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link
        to={`/work/${project.fields.projectUrl.toLowerCase()}`}
        className="w-full h-full relative flex items-center justify-center group overflow-hidden rounded-[10px] md:rounded-[20px]"
      >
        <div className="scale-101 group-hover:scale-105 transition-transform duration-2000 relative flex items-center justify-center w-full h-full">
          {thumb && thumb.type.includes("image/") && thumbnail && (
            <Image
              src={thumbnail.url}
              alt={project.fields.name}
              width={thumbnail.width}
              height={thumbnail.height}
              className={thumbClassName}
              loading="lazy"
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
              className={thumbClassName}
              // style={{ clipPath: "inset(2px 2px)" }}
            />
          )}
        </div>

        {/* <div className="absolute inset-0 flex items-end justify-bottom">
          <div className="nav w-full h-fit p-sm md:p-md uppercase text-center z-2 text-light fill-light mix-blend-difference">
            {`${project.fields.name}${project.fields.client && ` | ${project.fields.client}`}`}
          </div>
        </div> */}
      </Link>
    </motion.div>
  );
};

export default ProjectHighlight;
