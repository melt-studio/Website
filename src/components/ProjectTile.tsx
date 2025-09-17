import { ProjectAirtable } from "../types";
import Link from "./Link";
import Image from "./Image";

type ProjectTileProps = {
  project: ProjectAirtable;
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
  const thumb = project.fields.tileImage[0].thumbnails.large;

  return (
    <div
      className="cursor-pointer overflow-hidden rounded-[1.5vw] relative flex items-center justify-center scale-100 hover:scale-110 transition-transform duration-500 w-full h-auto"
      // style={{ width: thumb.width, height: thumb.height }}
      style={{ aspectRatio: thumb.width / thumb.height }}
    >
      <div className={`bg-mid/75 absolute top-0 left-0 bottom-0 right-0 animate-[fadeIn_2s_ease_1]`}></div>
      <Link to={`/project/${project.fields.projectUrl.toLowerCase()}`} underline={false}>
        <Image
          src={thumb.url}
          alt={project.fields.name}
          width={thumb.width}
          height={thumb.height}
          className="rounded-[1.5vw]"
        />
      </Link>
      {/* <div className="absolute bottom-0 left-0 p-md uppercase">{project.fields.name}</div> */}
    </div>
  );
};

export default ProjectTile;
