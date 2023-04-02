import TagLink from "../TagLink/TagLink.jsx";
import "./ProjectNav.css";

export default function ProjectNav({ prev, next }) {
  return (
    <div className="project-nav">
      <div className="project-nav__links">
        <div className="project-nav__link prev">
          {prev && <TagLink tag={{ text: "Prev", href: `/${prev.fields.projectUrl}` }} nav />}
        </div>

        <div className="project-nav__link close">
          <TagLink tag={{ text: "Close", href: "/" }} nav />
        </div>

        <div className="project-nav__link next">
          {next && <TagLink tag={{ text: "Next", href: `/${next.fields.projectUrl}` }} nav />}
        </div>
      </div>
    </div>
  );
}
