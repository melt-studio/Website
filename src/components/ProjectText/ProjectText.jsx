import TagBlock from "../TagBlock/TagBlock";
import FadeScroll from "../FadeScroll/FadeScroll";
import Markdown from "../Markdown/Markdown";
import "./ProjectText.css";

const ProjectText = ({ project }) => {
  const { name, description, projectCopy, projectScope, projectCollaborators, colorText } = project.fields;
  const scope = projectScope ? projectScope.map((t) => ({ text: t })) : [];
  const collaborators = projectCollaborators ? projectCollaborators.map((t) => ({ text: t })) : [];

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
              {/* <p>{projectCopy}</p> */}
              <Markdown>{projectCopy}</Markdown>
            </div>
          )}
        </div>
        <div className="col">
          <TagBlock title="Project Scope" tags={scope} underlineColor={colorText} />
          <TagBlock title="Project Collaborators" tags={collaborators} underlineColor={colorText} />
        </div>
      </div>
    </FadeScroll>
  );
};

export default ProjectText;
