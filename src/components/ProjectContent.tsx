import { ProjectFormatted } from "../types";
import Copy from "./Copy";
import Gallery from "./GallerySticky";
import List from "./List";
import ProjectImage from "./ProjectImage";
import Section from "./Section";

const ProjectContent = ({ project }: { project: ProjectFormatted }) => {
  if (!project) return null;

  const { scope, copy, projectImages, copy2title, copy2, galleryImages } = project.fields;

  const galleryPlaceholderName = "[project_gallery].png";
  const copy2PlaceholderName = "[project_copy2].png";

  const galleryPlaceholder = projectImages && projectImages.find((image) => image.filename === galleryPlaceholderName);
  let galleryLocation = galleryPlaceholder && projectImages.indexOf(galleryPlaceholder);
  if ((projectImages && !galleryLocation) || galleryLocation === -1) galleryLocation = projectImages.length + 1;

  const copy2Placeholder = projectImages && projectImages.find((image) => image.filename === copy2PlaceholderName);
  let copy2Location = copy2Placeholder && projectImages.indexOf(copy2Placeholder);
  if ((projectImages && !copy2Location) || copy2Location === -1) copy2Location = projectImages.length + 1;

  return (
    <div className="content">
      <Section type="column">
        <div className="my-4 md:my-0">{scope && <List items={scope} />}</div>
        {copy ? <Copy copy={copy} /> : <div></div>}
      </Section>

      <div className="flex flex-col w-full gap-10 md:gap-30 max-w-[2560px] mx-auto">
        {projectImages &&
          projectImages.map((image, i) => {
            if (image.filename === galleryPlaceholderName || image.filename === copy2PlaceholderName) return null;

            return <ProjectImage image={image} key={image.id} style={{ order: i + 1 }} />;
          })}

        {galleryImages && <Gallery images={galleryImages} style={{ order: galleryLocation }} />}

        {copy2 && (
          <Section type="column" title={copy2title} style={{ order: copy2Location }}>
            {!copy2title && <div></div>}
            <Copy copy={copy2} />
          </Section>
        )}
      </div>
    </div>
  );
};

export default ProjectContent;
