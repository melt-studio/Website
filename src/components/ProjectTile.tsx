import { ProjectFormatted } from "../types";
import Link from "./Link";
import Image from "./Image";
import { useStore } from "../stores/store";
import { useEffect } from "react";

type ProjectTileProps = {
  project: ProjectFormatted;
};

// Loading animation
const shimmer =
  "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent";

export function ImageSkeleton({ width, height }: { width: number; height: number }) {
  return (
    <div
      className={`${shimmer} relative overflow-hidden rounded-xl bg-gray-100 p-2 shadow-sm`}
      style={{ width, height }}
    >
      <div className="flex p-4">
        <div className="h-5 w-5 rounded-md bg-gray-200" />
        <div className="ml-2 h-6 w-16 rounded-md bg-gray-200 text-sm font-medium" />
      </div>
      <div className="flex items-center justify-center truncate rounded-xl bg-white px-4 py-8">
        <div className="h-7 w-20 rounded-md bg-gray-200" />
      </div>
    </div>
  );
}

const ProjectTile = ({ project }: ProjectTileProps) => {
  const background = useStore((state) => state.background);
  const gradient = useStore((state) => state.gradient);
  const setValue = useStore((state) => state.setValue);

  if (!project.fields.projectThumbnail) return null;

  const thumb = project.fields.projectThumbnail[0].thumbnails.large;

  const handleMouseEnter = () => {
    if (!background || !gradient || location.pathname !== "/") return null;

    gradient.style.backgroundColor = project.theme[0];
    gradient.style.borderColor = project.theme[1];
    gradient.style.opacity = "100%";
    // background.material.uniforms.uTheme.value = 1

    // background.material.uniforms.uTheme2.value.copy(background.material.uniforms.uTheme0.value);
    // background.material.uniforms.uTheme3.value.copy(background.material.uniforms.uTheme1.value);
    // project.theme.forEach((hex, i) => {
    //   background.material.uniforms[`uTheme${i}`].value.set(hex);
    // });

    // background.material.uniforms.uTheme.value.set(
    //   1,
    //   background.material.uniforms.uTheme.value.x,
    //   background.material.uniforms.uTime.value
    // );

    // background.material.uniforms.uMode.value.x = background.material.uniforms.uMode.value.y;
    // background.material.uniforms.uMode.value.y = 1;
    // background.material.uniforms.uMode.value.z = background.material.uniforms.uTime.value;
    // background.material.uniforms.uMode.value.w = 1;
  };

  const handleMouseLeave = () => {
    if (!background || !gradient || location.pathname !== "/") return null;

    //     if (bg1 && bg2) {
    //   bg2.style.backgroundColor = bg1.style.ba
    //   bg1.style.backgroundColor = project.theme[0]
    // }
    gradient.style.backgroundColor = "#c1c1c1";
    gradient.style.borderColor = "#c1c1c1";
    gradient.style.opacity = "0%";

    // background.material.uniforms.uTheme.value.set(
    //   0,
    //   background.material.uniforms.uTheme.value.x,
    //   background.material.uniforms.uTime.value
    // );
    // // background.material.uniforms.uTheme2.value.copy(background.material.uniforms.uTheme0.value);
    // // background.material.uniforms.uTheme3.value.copy(background.material.uniforms.uTheme1.value);

    // background.material.uniforms.uMode.value.x = background.material.uniforms.uMode.value.y;
    // background.material.uniforms.uMode.value.y = 0;
    // background.material.uniforms.uMode.value.z = background.material.uniforms.uTime.value;
    // background.material.uniforms.uMode.value.w = 1;
  };

  return (
    <div
      className="cursor-pointer overflow-hidden relative flex items-center justify-center scale-100 hover:scale-110 transition-transform duration-500 w-full h-auto"
      // style={{ width: thumb.width, height: thumb.height }}
      style={{ aspectRatio: thumb.width / thumb.height }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      ref={(el) => {
        if (el && project.index === 0) {
          setValue("firstProject", el);
        }
      }}
    >
      {/* <div className={`bg-mid/75 absolute top-0 left-0 bottom-0 right-0 animate-[fadeIn_2s_ease_1]`}></div> */}
      <Link to={`/work/${project.fields.projectUrl.toLowerCase()}`} underline={false}>
        <Image
          src={thumb.url}
          alt={project.fields.name}
          width={thumb.width}
          height={thumb.height}
          // className="rounded-[1.5vw]"
        />
      </Link>
      {/* <div className="absolute bottom-0 left-0 p-md uppercase">{project.fields.name}</div> */}
    </div>
  );
};

export default ProjectTile;
