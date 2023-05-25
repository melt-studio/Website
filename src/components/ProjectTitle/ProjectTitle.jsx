import { useEffect, useState } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";
import FadeInOut from "../FadeInOut/FadeInOut.jsx";
import "./ProjectTitle.css";

const keyframes = {
  enter: {
    opacity: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
    y: "100%",
  },
};

const ProjectTitle = ({ project, mobile, viewport }) => {
  const { name, description } = project.fields;
  const [isVisible, setIsVisible] = useState(false);
  const { scrollY } = useScroll();
  const scrollCutOff = 0.25 * viewport.height;

  useEffect(() => {
    if (mobile) {
      setIsVisible(false);
    } else {
      if (window.scrollY >= scrollCutOff) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    }
  }, [mobile, scrollCutOff]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (mobile) return;

    const sMax = document.body.offsetHeight - viewport.height;
    const s = scrollCutOff > sMax ? sMax / 2 : scrollCutOff;
    const s2 = sMax;

    if (!isVisible && latest >= s && latest < s2) {
      if (!isVisible) setIsVisible(true);
    } else if (isVisible && (latest < s || latest >= s2)) {
      if (isVisible) setIsVisible(false);
    }
  });

  return (
    <FadeInOut
      isVisible={isVisible}
      transition={{ duration: 0.5, delay: 0, ease: "easeInOut" }}
      keyframes={keyframes}
      className="project-title"
    >
      <div className="project-title__items">
        <div className="project-title__item">
          <p>{name}</p>
        </div>

        <div className="project-title__item">
          <p>{description}</p>
        </div>
      </div>
    </FadeInOut>
  );
};

export default ProjectTitle;
