import { ImageAirtable, Media } from "../types";
import Image from "./Image";
import Video from "./Video";

const ProjectImage = ({ image }: { image: Media }) => {
  if (image.type.includes("video/")) {
    return <Video src={image.url} />;
  }

  if (image.type.includes("image/")) {
    const { width, height } = image as ImageAirtable;
    return <Image src={image.url} width={width} height={height} />;
  }

  return null;
};

export default ProjectImage;
