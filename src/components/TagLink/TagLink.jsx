import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { cursorEvents } from "../Cursor/Cursor.jsx";
import "./TagLink.css";

const TagLinkAnchor = ({ nav, tag, children }) => {
  if (tag.onClick) {
    return (
      <div style={{ cursor: "pointer" }} onClick={tag.onClick} id={tag.id}>
        {children}
      </div>
    );
  }

  if (nav) {
    // if (tag.id) {
    //   return (
    //     <Link to={tag.href} id={tag.id}>
    //       {children}
    //     </Link>
    //   );
    // }
    return (
      <Link to={tag.href} id={tag.id}>
        {children}
      </Link>
    );
  }

  return (
    <a target="_blank" rel="noopener noreferrer" href={tag.href} id={tag.id}>
      {children}
    </a>
  );
};

const TagLink = ({ nav, tag, underline = true }) => {
  const underlineRef = useRef();

  useEffect(() => {
    if (underlineRef && underlineRef.current) underlineRef.current.classList.remove("hover");
  }, [tag]);

  const mouseEvents = {
    onMouseEnter: () => {
      cursorEvents.onMouseEnter();
      if (underlineRef && underlineRef.current) underlineRef.current.classList.add("hover");
    },
    onMouseLeave: () => {
      cursorEvents.onMouseLeave();
      if (underlineRef && underlineRef.current) underlineRef.current.classList.remove("hover");
    },
  };

  return (
    <div className={nav ? "tag tag-link tag-link-nav" : "tag tag-link"} {...mouseEvents}>
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
