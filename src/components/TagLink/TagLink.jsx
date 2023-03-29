import { useRef } from "react";
import { Link } from "react-router-dom";
import "./TagLink.css";

const TagLinkAnchor = ({ nav, tag, cursor, underline, children }) => {
  const handleEnter = () => {
    if (cursor) cursor.classList.add("link");
    if (underline.current) underline.current.classList.add("hover");
  };

  const handleLeave = () => {
    if (cursor) cursor.classList.remove("link");
    if (underline.current) underline.current.classList.remove("hover");
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

const TagLink = ({ nav, tag }) => {
  const underline = useRef();
  const cursor = document.querySelector(".cursor");

  return (
    <div className={nav ? "tag-link tag-link-nav" : "tag-link"}>
      <TagLinkAnchor nav={nav} tag={tag} cursor={cursor} underline={underline}>
        <h3>{tag.text}</h3>
        <div ref={underline} className="tag-link-underline">
          <hr />
        </div>
      </TagLinkAnchor>
    </div>
  );
};

export default TagLink;
