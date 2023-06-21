import FadeScroll from "../FadeScroll/FadeScroll";
import Markdown from "../Markdown/Markdown";
import "./ProjectText.css";

const ProjectTextSecondary = ({ project }) => {
  const { secondaryCopy } = project.fields;

  if (!secondaryCopy) return null;

  return (
    <FadeScroll viewport={{ amount: 0.25 }} className="project-text secondary">
      <div className="row">
        <div className="col full">
          <div className="description-text jumbo-text">
            <Markdown>{secondaryCopy}</Markdown>
          </div>
        </div>
      </div>
    </FadeScroll>
  );
};

export default ProjectTextSecondary;
