import { ImageAirtable, ProjectFormatted } from "../types";
import Image from "./Image";
import { useStore } from "../stores/store";
import { CSSProperties, HTMLAttributes } from "react";
import clsx from "clsx";
import { Link } from "react-router";
import Video from "./Video";
import { themeColors } from "../helpers/utils";

interface ProjectHighlightProps extends HTMLAttributes<HTMLDivElement> {
  project: ProjectFormatted;
  index: number;
  active: number;
  count: number;
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

const ProjectHighlight = ({ project, index, active, count, className }: ProjectHighlightProps) => {
  const background = useStore((state) => state.background);
  const gradient = useStore((state) => state.gradient);

  let thumb,
    thumbnail = null;
  if (project.fields.highlightThumbnail && project.fields.highlightThumbnail.length > 0) {
    thumb = project.fields.highlightThumbnail[0];
    if (thumb.type.includes("video/")) thumbnail = thumb;
    else if (thumb.type.includes("image/")) thumbnail = thumb.thumbnails.large;
  }

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

  return (
    <div
      className={clsx(
        "cursor-pointer overflow-hidden flex items-center justify-center h-[100vh] w-full bg-mid top-0 inset-0 will-change-transform transition-all duration-3000 ease-in-out fixed",
        {
          "opacity-0": active !== index,
          "pointer-events-none": active > index,
          "translate-y-full": active < index,
          "-translate-y-0": active > index && index !== count - 1,
          "-translate-y-full": active > index && index === count - 1,
        },
        className
      )}
      style={style}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link
        to={`/works/${project.fields.projectUrl.toLowerCase()}`}
        className="w-full h-full relative flex items-center justify-center group overflow-hidden"
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
            />
          )}
        </div>
      </Link>
    </div>
  );
};

export default ProjectHighlight;
