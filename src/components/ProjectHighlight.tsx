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
      transform: scrollDirection === "down" ? "translateY(-40px)" : "translateY(40px)",
    },
    visible: {
      opacity: 1,
      transform: "translateY(0px)",
    },
  };

  return (
    <motion.div
      variants={tileVariants}
      transition={{ duration: 2, delay: 0, ease: "easeInOut" }}
      viewport={{ amount: 0.1, once: false }}
      whileInView="visible"
      initial="hidden"
      className={clsx(
        "cursor-pointer overflow-hidden relative flex items-center justify-center h-auto min-h-[50vh] max-h-[75vh] md:h-[1080px] w-full rounded-[10px] md:rounded-[20px] bg-mid",
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
        <div className="scale-100 group-hover:scale-105 transition-transform duration-2000 relative flex items-center justify-center w-full h-full">
          {thumb && thumb.type.includes("image/") && thumbnail && (
            <Image
              src={thumbnail.url}
              alt={project.fields.name}
              width={thumbnail.width}
              height={thumbnail.height}
              className="w-full object-cover h-full"
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
              className="object-cover h-full w-auto"
              style={{ clipPath: "inset(2px 2px)" }}
            />
          )}
        </div>

        <div className="absolute inset-0">
          <div className="nav -bottom-2 -left-2 w-fit h-fit absolute items-center justify-between p-sm md:p-md uppercase z-2 text-light fill-light mix-blend-difference">
            {`${project.fields.name}${project.fields.client && ` | ${project.fields.client}`}`}
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProjectHighlight;
