import { useRef } from "react";
import { Link } from "react-router-dom";
import { cursorEvents } from "../Cursor/Cursor.jsx";
import "./TagLink.css";

const TagLinkAnchor = ({ nav, tag, underline, children }) => {
  const mouseEvents = {
    onMouseEnter: () => {
      cursorEvents.onMouseEnter();
      if (underline && underline.current) underline.current.classList.add("hover");
    },
    onMouseLeave: () => {
      cursorEvents.onMouseLeave();
      if (underline && underline.current) underline.current.classList.remove("hover");
    },
  };

  if (nav) {
    return (
      <Link to={tag.href} {...mouseEvents}>
        {children}
      </Link>
    );
  }

  return (
    <a target="_blank" rel="noopener noreferrer" href={tag.href} {...mouseEvents}>
      {children}
    </a>
  );
};

const TagLink = ({ nav, tag, underline = true }) => {
  const underlineRef = useRef();
  // const cursor = document.querySelector(".cursor");

  return (
    <div className={nav ? "tag-link tag-link-nav" : "tag-link"}>
      <TagLinkAnchor nav={nav} tag={tag} underline={underlineRef}>
        <h3>{tag.text}</h3>
        {underline && (
          <div ref={underlineRef} className="tag-link-underline">
            <hr />
          </div>
        )}
      </TagLinkAnchor>
    </div>
  );
};

export default TagLink;
