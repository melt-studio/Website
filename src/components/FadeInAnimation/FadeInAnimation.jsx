import React, { useEffect, useRef } from "react";
import "./FadeInAnimation.css";

const FadeInAnimation = ({ children }) => {
  // const [isVisible, setIsVisible]=useState('fade-in-animation__container')
  const fadeInRef = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setTimeout(() => {
          fadeInRef.current.style.opacity = 1;
          fadeInRef.current.style.transform = "translateY(0)";
        }, 500);
        // console.log("AHHHH")
        // setIsVisible('animation__show')
      } else {
        // fadeOutRef.current.style.opacity = 1;
      }
    });

    observer.observe(fadeInRef.current);
  }, []);

  return (
    <div className="fade-in-animation__container" ref={fadeInRef}>
      {children}
    </div>
  );
};

export default FadeInAnimation;
