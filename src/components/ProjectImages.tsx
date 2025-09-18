// import { useMemo, useRef } from "react";
// import ReactPlayer from "react-player";
// import FadeScroll from "./FadeScroll";
// import "./ProjectImages.css";
import { Media } from "../types";
import FadeScroll from "./FadeScroll";
// import Image from "./Image";
import ProjectImage from "./ProjectImage";
// import Video from "./Video";

// import Pattern from "../../assets/images/MELT__PATTERN.png";

// const ProjectImage = ({ image, project, viewport }) => {
//   // const ref = useRef();
//   // const imgHolder = useRef();

//   // const size = useMemo(() => {
//   //   const size = {};
//   //   if (image.type !== "video/mp4") {
//   //     const { width, height } = image;
//   //     if (width && height) {
//   //       const aspect = height / width;
//   //       size.width = viewport.width;
//   //       size.height = viewport.width * aspect;
//   //     }
//   //   }

//   //   return size;
//   // }, [image, viewport.width]);

//   // const handleLoad = () => {
//   //   if (ref && ref.current) {
//   //     if (image.type !== "video/mp4") {
//   //       ref.current.style.height = "auto";
//   //       ref.current.style.background = "none";
//   //     }

//   //     if (ref.current.wrapper) ref.current.wrapper.classList.remove("loading");
//   //     else ref.current.classList.remove("loading");
//   //     imgHolder.current.classList.remove("loading");
//   //   }
//   // };

//   return (
//     <FadeScroll key={image.id} viewport={{ amount: 0.25 }} className="project-images__image-container">
//       <div
//         ref={imgHolder}
//         className="project-images__image-holder loading"
//         style={{ background: `url(${Pattern}) no-repeat center` }}
//       >
//         {image.type === "video/mp4" ? (
//           <ReactPlayer
//             className="project-images__image video loading"
//             width="100%"
//             height="auto"
//             url={image.url}
//             muted={true}
//             volume={0}
//             playing={true}
//             loop={true}
//             autoPlay={true}
//             ref={ref}
//             onReady={handleLoad}
//             playsinline={true}
//           />
//         ) : (
//           <img
//             ref={ref}
//             className="project-images__image loading"
//             alt={project.name}
//             src={image.url}
//             loading="lazy"
//             onLoad={handleLoad}
//             style={{ height: size.height ? size.height : "auto" }}
//           />
//         )}
//       </div>
//     </FadeScroll>
//   );
// };

const ProjectImages = ({ images }: { images: Media[] }) => {
  if (!images) return null;

  return (
    <div className="px-sm md:px-md flex flex-col gap-10">
      {images.map((image) => (
        <FadeScroll key={image.id}>
          <ProjectImage image={image} />
        </FadeScroll>
      ))}
    </div>
  );
};

export default ProjectImages;
