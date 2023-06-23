import TagLink from "../TagLink/TagLink.jsx";
import FadeScroll from "../FadeScroll/FadeScroll.jsx";
import "./ProjectNav.css";

export default function ProjectNav({ prev, next }) {
  return (
    <FadeScroll viewport={{ amount: 0 }} className="project-nav">
      <div className="project-nav__links">
        <div className="project-nav__link prev">
          {prev && <TagLink tag={{ text: "Prev", href: `/project/${prev.fields.projectUrl}` }} nav />}
        </div>

        <div className="project-nav__link close">
          <TagLink tag={{ text: "Close", href: "/" }} nav />
        </div>

        <div className="project-nav__link next">
          {next && <TagLink tag={{ text: "Next", href: `/project/${next.fields.projectUrl}` }} nav />}
        </div>
      </div>
    </FadeScroll>
  );
}
