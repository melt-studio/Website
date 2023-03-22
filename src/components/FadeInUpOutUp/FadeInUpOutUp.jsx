import React, { useRef, useEffect, useState } from 'react';
import "./FadeInUpOutUp.css"

export default function FadeInUpOutUp({children}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      });
    }, { threshold: [0.4, 0.5] });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.unobserve(ref.current);
    };
  }, [ref]);

  return (
    <div style={{ position: "relative" }}>
      <div
        ref={ref}
        style={{
          position: "absolute",
          bottom: isVisible ? 0 : "-100%",
          opacity: isVisible ? 1 : 0,
          transition: "all 2s"
        }}
      >
        {children}
      </div>
    </div>
  );
};
