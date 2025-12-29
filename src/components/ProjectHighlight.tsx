import { ProjectFormatted } from "../types";
import Image from "./Image";
import { useStore } from "../stores/store";
import { CSSProperties, HTMLAttributes } from "react";
import clsx from "clsx";
import { Link } from "react-router";
import Video from "./Video";
import { themeColors } from "../helpers/utils";
import { motion } from "motion/react";

interface ProjectHighlightProps extends HTMLAttributes<HTMLDivElement> {
  project: ProjectFormatted;
  className?: string;
}

const ProjectHighlight = ({ project, className }: ProjectHighlightProps) => {
  const background = useStore((state) => state.background);
  const gradient = useStore((state) => state.gradient);
  const viewport = useStore((state) => state.viewport);

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

  const overlayVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
    },
  };

  const titleVariants = {
    hidden: { transform: "translateY(40px)" },
    visible: {
      transform: "translateY(0px)",
    },
  };

  const imageVariants = {
    hidden: { transform: "scale(100%)" },
    visible: {
      transform: "scale(105%)",
    },
  };

  return (
    <motion.div
      variants={overlayVariants}
      transition={{ duration: 1, delay: 0, ease: "easeInOut" }}
      viewport={{ amount: 0.1, once: false }}
      whileInView="visible"
      initial="hidden"
      className={clsx(
        "cursor-pointer overflow-hidden relative flex items-center justify-center h-auto min-h-[50vh] w-full rounded-[10px] md:rounded-[20px] bg-light",
        className
      )}
      style={style}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link
        to={`/work/${project.fields.projectUrl.toLowerCase()}`}
        className="w-full h-full relative flex items-center justify-center group"
      >
        <motion.div
          variants={viewport.width < 768 ? imageVariants : undefined}
          transition={{ duration: 1, delay: 0, ease: "easeInOut" }}
          viewport={{ amount: 0.75, once: false }}
          whileInView="visible"
          initial="hidden"
          className="md:scale-100 md:group-hover:scale-105 md:transition-transform md:duration-1000 relative flex items-center justify-center w-full h-full"
        >
          {thumb && thumb.type.includes("image/") && thumbnail && (
            <Image
              src={thumbnail.url}
              alt={project.fields.name}
              width={thumbnail.width}
              height={thumbnail.height}
              className="w-auto object-cover h-full"
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
        </motion.div>

        <motion.div
          variants={viewport.width < 768 ? overlayVariants : undefined}
          transition={{ duration: 1, delay: 0, ease: "easeInOut" }}
          viewport={{ amount: 0.75, once: false }}
          whileInView="visible"
          initial="hidden"
          className="absolute inset-0 md:opacity-0 md:group-hover:opacity-100 md:transition-opacity md:duration-1000"
          style={{
            backgroundImage: `linear-gradient(${project.theme[0]}50 0%, ${project.theme[1]} 100%)`,
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center md:translate-y-10 md:group-hover:translate-y-0 md:transition-transform md:duration-1000">
            <motion.div
              variants={viewport.width < 768 ? titleVariants : undefined}
              transition={{ duration: 1, delay: 0, ease: "easeInOut" }}
              className="absolute feature px-4 py-2 text-light"
            >
              {project.fields.name}
            </motion.div>
          </div>

          {project.fields.client && (
            <div className="nav -bottom-2 -left-2 w-fit h-fit absolute items-center justify-between p-sm md:p-md uppercase z-2 text-light fill-light">
              {project.fields.client}
            </div>
          )}
        </motion.div>
      </Link>
    </motion.div>
  );
};

export default ProjectHighlight;
