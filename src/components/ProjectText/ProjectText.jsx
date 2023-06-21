import TagBlock from "../TagBlock/TagBlock";
import FadeScroll from "../FadeScroll/FadeScroll";
import Markdown from "../Markdown/Markdown";
import "./ProjectText.css";

const ProjectText = ({ project, secondary = false }) => {
  const { name, description, projectCopy, projectScope, projectCopy2, colorText } = project.fields;

  const scope = projectScope ? projectScope.map((t) => ({ text: t })) : [];

  if (secondary) {
    if (!projectCopy2) return null;

    return (
      <FadeScroll viewport={{ amount: 0.25 }} className="project-text secondary">
        <div className="row">
          <div className="col full">
            <div className="description-text jumbo-text">
              <Markdown>{projectCopy2}</Markdown>
            </div>
          </div>
        </div>
      </FadeScroll>
    );
  }

  return (
    <FadeScroll viewport={{ amount: 0.25 }} className="project-text">
      <div className="row">
        <div className="col full">
          {name && <h1 className="title-text">{name}</h1>}
          {description && <h3 className="subtitle-text">{description}</h3>}
        </div>
      </div>
      <div className="row">
        <div className="col primary">
          {projectCopy && (
            <div className="description-text jumbo-text">
              <Markdown>{projectCopy}</Markdown>
            </div>
          )}
        </div>
        <div className="col">
          <TagBlock title="Project Scope" tags={scope} underlineColor={colorText} transition={true} />
        </div>
      </div>
    </FadeScroll>
  );
};

export default ProjectText;
