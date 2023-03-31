import React, { useRef, useEffect } from "react";
import "./FadeInOutAnimation.css";

const FadeInOut = (props) => {
  const ref = useRef(null);
  const observer = useRef(null);

  useEffect(() => {
    if (!observer.current) {
      observer.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("fade-in");
              entry.target.classList.remove("fade-out");
            } else {
              entry.target.classList.add("fade-out");
              entry.target.classList.remove("fade-in");
            }
          });
          // }, { threshold: [0.4, 0.5] });
        },
        { threshold: [0.4, 0.6] }
      );
    }
    if (ref.current) {
      observer.current.observe(ref.current);
    }
    return () => {
      if (ref.current) {
        // eslint-disable-next-line
        observer.current.unobserve(ref.current);
      }
    };
  }, [ref]);

  return (
    <div ref={ref} className="fade-out">
      {props.children}
    </div>
  );
};
export default FadeInOut;
