import { ProjectFormatted } from "../types";
import Image from "./Image";
import { useStore } from "../stores/store";
import { CSSProperties, HTMLAttributes, useCallback, useEffect, useMemo } from "react";
import clsx from "clsx";
import { Link } from "react-router";
import { TileLayout } from "./ProjectTiles";
import { randFloat } from "three/src/math/MathUtils.js";
import { useAnimate } from "motion/react";
import Video from "./Video";
import { themeColors } from "../helpers/utils";

interface ProjectTileProps extends HTMLAttributes<HTMLDivElement> {
  project: ProjectFormatted;
  layout?: TileLayout;
  className?: string;
  active: string | null;
  setActive: (id: string | null) => void;
}

const ProjectTile = ({ project, layout, className, active, setActive, ...props }: ProjectTileProps) => {
  const background = useStore((state) => state.background);
  const gradient = useStore((state) => state.gradient);

  const drift = useMemo(() => {
    const drift = [];

    const dx = window.innerWidth * (0.01 + 0.02);
    const dy = window.innerHeight * (0.01 + 0.02);

    for (let i = 0; i < 5; i++) {
      const time = randFloat(7, 9);
      let randomX = Math.floor(randFloat(-dx, dx));
      const randomY = Math.floor(randFloat(-dy, dy));

      if (layout) {
        if (layout.colStart < 3) randomX = Math.abs(randomX);
        else if (layout.colEnd > layout.grid - 2) randomX = -Math.abs(randomX);
      }

      drift.push({
        time,
        transform: `translate3d(${randomX}px, ${randomY}px, 0px)`,
        randomX,
        randomY,
        delay: randFloat(0, 3),
      });
    }

    return drift;
  }, [layout]);

  const [scope, animate] = useAnimate();

  const myAnimation = useCallback(async () => {
    animate(
      [
        [
          scope.current,
          { x: drift[0].randomX, y: drift[0].randomY },
          { duration: drift[0].time, ease: "easeInOut", delay: drift[0].delay },
        ],
        [
          scope.current,
          { x: drift[1].randomX, y: drift[1].randomY },
          { duration: drift[1].time, ease: "easeInOut", delay: drift[0].delay },
        ],
        [
          scope.current,
          { x: drift[2].randomX, y: drift[2].randomY },
          { duration: drift[2].time, ease: "easeInOut", delay: drift[0].delay },
        ],
        [scope.current, { x: 0, y: 0 }, { duration: drift[0].time, ease: "easeInOut", delay: drift[0].delay }],
      ],
      {
        repeat: Infinity,
      }
    );
  }, [animate, scope, drift]);

  useEffect(() => {
    myAnimation();
  }, [myAnimation]);

  if (!project.fields.projectThumbnail || project.fields.projectThumbnail.length === 0) return null;

  const thumb = project.fields.projectThumbnail[0];
  let thumbnail = null;
  if (thumb.type.includes("video/")) thumbnail = thumb;
  else if (thumb.type.includes("image/")) thumbnail = thumb.thumbnails.large;

  if (!thumbnail) return null;

  const handleMouseEnter = () => {
    setActive(project.id);

    if (!background || !gradient || location.pathname !== "/work") return null;

    gradient.style.backgroundColor = project.theme[0];
    gradient.style.borderColor = project.theme[1];
    gradient.style.opacity = "100%";
  };

  const handleMouseLeave = () => {
    setActive(null);

    if (!background || !gradient || location.pathname !== "/work") return null;

    gradient.style.backgroundColor = themeColors.light.hex;
    gradient.style.borderColor = themeColors.light.hex;
    gradient.style.opacity = "0%";
  };

  const style: CSSProperties = {};

  if (layout) {
    style.gridColumn = `${layout.colStart} / ${layout.colEnd}`;
    style.marginTop = `${layout.marginTop}%`;
    style.marginLeft = `${layout.marginLeft}%`;
  }

  if (thumbnail.width && thumbnail.height) {
    style.aspectRatio = thumbnail.width / thumbnail.height;
  }

  return (
    <div
      className={clsx(
        "cursor-pointer overflow-hidden relative flex items-center justify-center scale-100 hover:scale-105 hover:z-99 [transition:scale_1.5s_ease_0.1s,opacity_1s_ease_0.1s] h-auto",
        {
          "opacity-0": active && active !== project.id,
          "z-10": project.index === 0,
        },

        className
      )}
      {...props}
      style={style}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      ref={scope}
    >
      <Link to={`/work/${project.fields.projectUrl.toLowerCase()}`} className="w-full h-full">
        {thumb.type.includes("image/") && (
          <Image
            src={thumbnail.url}
            alt={project.fields.name}
            width={thumbnail.width}
            height={thumbnail.height}
            className="w-full h-auto"
            loading="lazy"
          />
        )}
        {thumb.type.includes("video/") && (
          <Video
            src={thumbnail.url}
            autoplay
            loop
            muted
            controls={false}
            type={thumb.type}
            className="w-full h-auto"
            style={{ clipPath: "inset(2px 2px)" }}
          />
        )}
      </Link>
    </div>
  );
};

export default ProjectTile;
