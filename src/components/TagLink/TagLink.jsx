import { useRef } from "react";
import { Link } from "react-router-dom";
import { cursorEvents } from "../Cursor/Cursor.jsx";
import "./TagLink.css";

const TagLinkAnchor = ({ nav, tag, underline, children }) => {
  const handleEnter = () => {
    cursorEvents.onMouseEnter();
    // if (cursor) cursor.classList.add("link");
    if (underline && underline.current) underline.current.classList.add("hover");
  };

  const handleLeave = () => {
    cursorEvents.onMouseLeave();
    // if (cursor) cursor.classList.remove("link");
    if (underline && underline.current) underline.current.classList.remove("hover");
  };

  if (nav) {
    return (
      <Link to={tag.href} onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
        {children}
      </Link>
    );
  }

  return (
    <a target="_blank" rel="noopener noreferrer" href={tag.href} onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
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
