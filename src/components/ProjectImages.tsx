import { Media } from "../types";
import Gallery from "./Gallery";
import ProjectImage from "./ProjectImage";

const ProjectImages = ({ images, gallery }: { images?: Media[]; gallery?: Media[] }) => {
  if (!images) return null;

  const galleryImage = images.find((image) => image.filename === "[project_gallery].png");
  const galleryLocation = galleryImage && images.indexOf(galleryImage);
  // console.log(galleryLocation);

  const imagesBefore = images.slice(0, galleryLocation === undefined ? images.length : galleryLocation);
  let imagesAfter = null;
  if (galleryLocation !== undefined && galleryLocation !== images.length - 1) {
    imagesAfter = images.slice(galleryLocation + 1, images.length);
  }

  return (
    <div className="flex flex-col w-full gap-10 max-w-[2560px] mx-auto">
      {imagesBefore && imagesBefore.map((image) => <ProjectImage image={image} key={image.id} />)}
      {gallery && <Gallery images={gallery} />}
      {imagesAfter && imagesAfter.map((image) => <ProjectImage image={image} key={image.id} />)}
    </div>
  );
};

export default ProjectImages;
