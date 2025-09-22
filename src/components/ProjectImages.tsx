import { Media } from "../types";
import FadeScroll from "./FadeScroll";
import ProjectImage from "./ProjectImage";

const ProjectImages = ({ images }: { images: Media[] }) => {
  if (!images) return null;

  return (
    <div className="px-2.5 flex flex-col gap-10">
      {images.map((image) => (
        <FadeScroll key={image.id}>
          <ProjectImage image={image} />
        </FadeScroll>
      ))}
    </div>
  );
};

export default ProjectImages;
