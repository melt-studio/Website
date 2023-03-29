import React, { useEffect } from "react";
import "./ProjectTitleTransition.css";
import { Fade } from "react-awesome-reveal";
import { keyframes } from "@emotion/react";

export default function ProjectTitleTransition(props) {
  const customAnimation = keyframes`
    from {
      opacity: 0;
      transform: translate3d(0, 50px, 0);
    }
    to {
      opacity: 1;
      transform: translate3d(0, 0, 0);
    }
  `;

  useEffect(() => {
    // document.getElementById("proj-transation__container").style.cursor = "none";
    // document.body.style.cursor = "none"
  }, [props]);

  return (
    <div
      id="proj-transation__container"
      style={{
        WebkitTextStrokeColor: props.colorText,
        backgroundColor: props.colorTheme,
        color: props.colorText,
        zIndex: "998",
      }}
      className="proj-title-transition__container"
    >
      <div className="transition-text__holder">
        <Fade
          // direction="down"
          delay={1000}
          duration={2000}
          keyframes={customAnimation}
          // isVisible={props.visibleText}
        >
          <h4 className="transition-title">{props.title}</h4>
        </Fade>
      </div>
    </div>
  );
}
// <Fade
// delay={1300}
// duration={2000}
// keyframes={customAnimation}
// // isVisible={props.visibleText}
// className='transition-description'
// // animationInDelay={500}
// >
//     <h3
//       // style={{ fontWeight: '700' }}
//       className='transition-description'>{props.subtitle}</h3>
// </Fade>
